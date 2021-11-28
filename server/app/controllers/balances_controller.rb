require 'excon'
require 'json'
require 'date'

class BalancesController < AccountsController
  #GET /accounts/balances/:id
  def show
    @id = params[:id]
    @history_prices = get_history_price
    @transactions = Transaction.all.where(account_id: @id)
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
          #'X-RapidAPI-Host' => URI.parse(url).host,
          #'X-RapidAPI-Key' => ENV.fetch('RAPIDAPI_API_KEY')
          "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
		      "x-rapidapi-key" => "e670bfeee5msh2c4237e9a815b1dp1134f5jsn284ac3e82968"
        }
      )
      data = JSON.parse(response.body)
      return data

    end

    def get_all_stocks
      stocks_list = []
      stocks_string = ""
      serialized_string = ""
      # find distinct stocks from portfolio
      #@distinct_stocks = Portfolio.select(:ticker).distinct
      ###only get the users stocks
      @distinct_stocks = Portfolio.where("account_id=#{params[:id]}")
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
      puts serialized_string
      return serialized_string
    end

end