class AccountsController < ApplicationController
  before_action :set_account, only: [:show, :update, :destroy]


  def leaderboard
    
    @users = User.all;
    @accounts = Account.all;
    @portfolios = Portfolio.all;
    
    leaderboard_data = {}

    @accounts.each do |account|
    
      email = @users.find_by(id: account.user_id)
      stockListArray = ["cash balance"]
      stockMarketValueArray = [account.cash_balance]
      account_portfolios = @portfolios.where(account_id: account.id)

      account_portfolios.each do |portfolio|
        stockListArray.push(portfolio.ticker)
        stockMarketValueArray.push(portfolio.quantity * portfolio.current_spot_price)
      end

      leaderboard_data[account.id] = {
        :email => email.email,
        :account_id => account.id, 
        :total_balance => account.total_balance,
        :stock_list => stockListArray,
        :market_value => stockMarketValueArray}
    end

    render json: {leaderboard: leaderboard_data}
  end


  # GET /accounts
  def index
    adjust_accounts_balance_from_updated_portfolios

    @accounts = Account.all
    @users = User.all
    @portfolios = Portfolio.all
    render json: {accounts: @accounts, users: @users, portfolios: @portfiolios}
  end

  def leaderboard
    
    @users = User.all;
    @accounts = Account.all;
    @portfolios = Portfolio.all;
    
    leaderboard_data = []

    @accounts.each do |account|
    
      email = @users.find_by(id: account.user_id)
      stockListArray = ["cash balance"]
      stockMarketValueArray = [account.cash_balance]
      account_portfolios = @portfolios.where(account_id: account.id)

      puts account_portfolios.inspect

      account_portfolios.each do |portfolio|
        stockListArray.push(portfolio.ticker)
        stockMarketValueArray.push(portfolio.quantity * portfolio.current_spot_price)
      end

      leaderboard_data << {
        :email => email.email,
        :account_id => account.id, 
        :total_balance => account.total_balance,
        :stock_list => stockListArray,
        :market_value => stockMarketValueArray}
    end

    render json: {leaderboard: leaderboard_data}
  end

  
  # GET /accounts/1
  #also show all the transactions and portforlio for account 1
  #add auth process later verify jwt
  def show

    #update the portfolio spot price
    adjust_accounts_balance_from_updated_portfolios

    #update the account balance based on new spot price
 
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


  def adjust_portfolio_spot_price
    

    @live_price = get_live_price
    @portfolios = Portfolio.all
    @portfolios.each do |portfolio|
      if !@live_price[portfolio.ticker].nil?
        portfolio.current_spot_price = @live_price[portfolio.ticker]
        portfolio.save
      end
    end
  end

  def adjust_accounts_balance_from_updated_portfolios

    adjust_portfolio_spot_price
    
    @accounts = Account.all

    @accounts.each do |account|
      #calculate the total portfolio market value and update price
      portfolio_belongs_to_account = Portfolio.where(account_id: account.id)
      current_market_value = 0;
      portfolio_belongs_to_account.each do |portfolio|
        current_market_value = current_market_value + portfolio.current_spot_price * portfolio.quantity
      end
      account.stock_balance = current_market_value
      account.total_balance = account.stock_balance + account.cash_balance
      account.save
  
    end

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

     # Use to fetch the latest stock price
     def get_live_price
      serialized_string = get_all_stocks
      current_market_price = {}
      url = "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/quote?symbols=#{serialized_string}"
      #url = "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/quote?symbols=BTC-USD"
      response = Excon.get(
        url,
        headers: {
          #'X-RapidAPI-Host' => URI.parse(url).host,
          #'X-RapidAPI-Key' => ENV.fetch('RAPIDAPI_API_KEY')
          "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
		      "x-rapidapi-key": "50021f6fa7msh7c5aa3a1b99700dp1fad37jsn02095460d420"
        }
      )
      data = JSON.parse(response.body)
      data["quoteResponse"]["result"].each do |item|
      current_market_price[item["symbol"]] = item["regularMarketPrice"]
     
    end
    current_market_price 
    

    end

    def get_all_stocks
      stocks_list = []
      stocks_string = ""
      serialized_string = ""
      # find distinct stocks from portfolio
      @distinct_stocks = Portfolio.select(:ticker).distinct
      # create a list of all the distinct stocks
      @distinct_stocks.each_with_index do |val, index|
        #only take top 10 distinct stocks 
        if index < 10
        stocks_list.push(val.ticker)
        stocks_string = stocks_string + val.ticker.to_s
        stocks_string = stocks_string + "%2C"
        serialized_string = stocks_string[0,stocks_string.length - 3]
        end

      end
      return serialized_string
    end
end
