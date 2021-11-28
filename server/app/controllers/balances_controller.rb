require 'excon'
require 'json'
require 'date'

class BalancesController < AccountsController
  before_action :authenticate_request!
  #GET /accounts/balances/:id
  def show
    @id = params[:id]
    puts "####debug after selling all holding####"
    @history_prices = get_history_price
    puts @history_prices
    
    @transactions = Transaction.all.where(account_id: @id)
    puts @transactions
    render json: {history_prices: @history_prices, transactions: @transactions}
  end

  def find_transactions_before_specific_time
    #@transactions = Transaction.all.where(account_id: params[:id])
    @portfolios = Portfolio.all.where(account_id: params[:id])
    #puts @transactions.inspect
    puts @portfolios.inspect
  end

  def last_five_day_investment_balance
    @portfolios = Portfolio.all.where(account_id: params[:id])
    investment_balance_data = {}
    @stock_history_data = get_history_price 
    @stock_history_data.each do |day|
    investment_balance_data[]
    end
    @portfolios.each do |portfolio|

    end
  end

  private
     # Use to fetch the latest stock price
     def get_history_price
      serialized_string = get_all_stocks
      current_market_price = {}
      url = "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v8/finance/spark?symbols=#{serialized_string}&range=5d&interval=1d"
      response = Excon.get(
        url,
        headers: {
          "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
		      "x-rapidapi-key": ENV["STOCK_API_KEY"]
        }
      )
      data = JSON.parse(response.body)
      return data

    end

    def get_all_stocks
      stocks_list = []
      stocks_string = ""
      serialized_string = ""
      # find distinct stocks from transactions

      #@distinct_stocks = Transaction.select(:ticker).distinct
      @distinct_stocks = Transaction.where(account_id: params[:id])
      #@distinct_stocks_from_user = @distict_stocks.where("account_id=#{params[:id]}")
      # create a list of all the distinct stocks
      @distinct_stocks.each_with_index do |val, index|
        #only take top 10 distinct stocks 
        if stocks_list.size <= 10
          puts stocks_list.size
          if !stocks_list.include?(val.ticker)
            puts "#########"
            puts val.inspect
          stocks_list.push(val.ticker)
          stocks_string = stocks_string + val.ticker.to_s
          stocks_string = stocks_string + "%2C"
          end
        end
        serialized_string = stocks_string[0,stocks_string.length - 3]
      end
      puts serialized_string
      return serialized_string
    end

end