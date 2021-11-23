class TransactionsController < ApplicationController
  before_action :set_transaction, only: [:show, :update, :destroy]

  # GET /transactions
  def index
    @transactions = Transaction.all

    render json: @transactions
  end

  # GET /transactions/1
  def show
    render json: @transaction
  end

  # POST /transactions
  def create
    puts "%%%receving post request from front end%%%%"

    trade_type = transaction_params[:trade]
    settled_price = transaction_params[:settled_price]
    quantity = transaction_params[:quantity]
    ticker = transaction_params[:ticker]
    account_id = transaction_params[:account_id]

    account_to_modify = Account.find_by(id: account_id)

    # calculate qty of ticker
    buys = Transaction.where(account_id: account_id, ticker: ticker, trade: "1")
    sells = Transaction.where(account_id: account_id, ticker: ticker, trade: "-1")

    total_buys = buys.sum do |item|
      item.quantity * item.trade
    end

    total_sells = sells.sum do |item|
      item.quantity * item.trade
    end

    ####################################
    total_quantity = total_buys + total_sells

    # buy: check if there is enough cash balance
    if trade_type == 1 && (account_to_modify.cash_balance < settled_price * quantity)
      puts "***BUY trade*** BUT not enough cash. Transaction failed"
      render json: @transaction.errors, status: :unprocessable_entity
    end

    # trade: check if there is enough qty
    if trade_type == -1 && (quantity > total_quantity)
      puts "*** SELL trade **** BUT not enough qty. Transaction failed"
      render json: @transaction.errors, status: :unprocessable_entity
    end

    @transaction = Transaction.new(transaction_params)

    if @transaction.save
      render json: @transaction, status: :created, location: @transaction
    else
      render json: @transaction.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /transactions/1
  def update
    if @transaction.update(transaction_params)
      render json: @transaction
    else
      render json: @transaction.errors, status: :unprocessable_entity
    end
  end

  # DELETE /transactions/1
  def destroy
    @transaction.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_transaction
      @transaction = Transaction.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def transaction_params
      params.require(:transaction).permit(:ticker, :trade, :quantity, :settled_price, :account_id)
    end
end
