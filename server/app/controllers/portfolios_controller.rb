#require 'rubygems'
require 'excon'
require 'json'
class PortfoliosController < ApplicationController
  before_action :authenticate_request!, except: [:index]
  before_action :set_portfolio, only: [:show, :update, :destroy]


  # GET /portfolios
  def index
    adjust_portfolios_spot_price

    @portfolios = Portfolio.all
   
    render json: @portfolios
  end

  # GET portfolio from account 1
  def show
    
    render json: @portfolio

  end


  # POST /portfolios
  def create
    @portfolio = Portfolio.new(portfolio_params)

    if @portfolio.save
      render json: @portfolio, status: :created, location: @portfolio
    else
      render json: @portfolio.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /portfolios/1
  def update
    if @portfolio.update(portfolio_params)
      render json: @portfolio
    else
      render json: @portfolio.errors, status: :unprocessable_entity
    end
  end

  # DELETE /portfolios/1
  def destroy
    @portfolio.destroy
  end


  def adjust_portfolios_spot_price
    @live_price = get_live_price
    @portfolios = Portfolio.all
    @portfolios.each do |portfolio|
      if !@live_price[portfolio.ticker].nil?
        portfolio.current_spot_price = @live_price[portfolio.ticker]
        portfolio.save
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_portfolio
      @portfolio = Portfolio.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def portfolio_params
      params.require(:portfolio).permit(:ticker, :quantity, :current_spot_price, :account_id)
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
          "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
		      "x-rapidapi-key": ENV["STOCK_API_KEY"]
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
        #serialized_string = stocks_string[0,stocks_string.length - 3]
        end
      end
      serialized_string = stocks_string[0,stocks_string.length - 3]
      return serialized_string
    end
end
