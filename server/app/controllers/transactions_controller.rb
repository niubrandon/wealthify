class TransactionsController < ApplicationController
  before_action :authenticate_request!, except: [:index, :create]
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

    total_quantity = total_buys + total_sells
   
    # buy: check if there is enough cash balance
    if trade_type == 1 && (account_to_modify.cash_balance < settled_price * quantity)
      render json: @transaction.errors, status: :unprocessable_entity
    end

    # sell: check if there is enough qty
    if trade_type == -1 && (quantity > total_quantity)
      render json: @transaction.errors, status: :unprocessable_entity
    end

    @transaction = Transaction.new(transaction_params)

    # modify stock and cash balance based on transaction type
    new_cash_balance = account_to_modify.cash_balance - settled_price * quantity * trade_type
    new_stock_balance = account_to_modify.stock_balance + settled_price * quantity * trade_type

    # modify account
    account_to_modify.update({:cash_balance => new_cash_balance, :stock_balance => new_stock_balance })


    # check if portfolio exists
    if Portfolio.find_by(account_id: account_id, ticker: ticker)
      account_portfolio = Portfolio.find_by(account_id: account_id, ticker: ticker)

      new_quantity = account_portfolio.quantity + quantity * trade_type

      # update inc/dec qty
      account_portfolio.update(quantity: new_quantity)

      # destroy if 0 qty
      if new_quantity == 0
        account_portfolio.destroy
      end
    else 

      # create
      Portfolio.create({ticker: ticker, quantity: quantity, current_spot_price: settled_price, account_id: account_id})
    end

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
