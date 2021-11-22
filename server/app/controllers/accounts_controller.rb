class AccountsController < ApplicationController
  before_action :set_account, only: [:show, :update, :destroy]

  # GET /accounts
  def index
    # admin_account = {
    #   :cash_balance => 2000,
    #   :stock_balance => 10000,
    #   :user_id => 1
    # }

    # render json: admin_account
    @accounts = Account.all
    @users = User.all
    render json: {accounts: @accounts, users: @users}
  end

  # GET /accounts/1
  #also show all the transactions and portforlio for account 1
  #add auth process later verify jwt
  def show
 
    @account_portfolios = Portfolio.all.where("account_id = #{params[:id]}" )
    @account_transactions = Transaction.all.where("account_id = #{params[:id]}")
    render json: {account: @account, portfolio: @account_portfolios, transactions: @account_transactions}
  end

  # POST /accounts
  def create
    @account = Account.new(account_params)

    if @account.save
      render json: @account, status: :created, location: @account
    else
      render json: @account.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /accounts/1
  def update
    if @account.update(account_params)
      render json: @account
    else
      render json: @account.errors, status: :unprocessable_entity
    end
  end

  # DELETE /accounts/1
  def destroy
    @account.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_account
      @account = Account.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def account_params
      params.require(:account).permit(:cash_balance, :stock_balance, :total_balance)
    end
end
