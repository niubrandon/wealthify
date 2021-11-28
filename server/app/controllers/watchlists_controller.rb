require 'excon'
require 'json'
class WatchlistsController < ApplicationController
  before_action :authenticate_request!
  before_action :set_watchlist, only: [:show, :update, :destroy]

  # GET /watchlists
  def index
    @prices = get_live_price
    @watchlists = Watchlist.all

    render json: {watchlists: @watchlists, prices: @prices }

  end

  # GET /watchlists/1
  def show
    render json: @watchlist
    
  end

  # POST /watchlists
  def create

    #@watchlist = Watchlist.new(watchlist_params)
    @watchlist = Watchlist.find_or_create_by!(watchlist_params)
    # is_present = Watchlist.where(ticker: params[:ticker], user_id: params[:user_id]).exists?
    if @watchlist.save
      render json: @watchlist, status: :created, location: @watchlist
    else
      render json: @watchlist.errors, status: :unprocessable_entity
    end
    
  end

  # PATCH/PUT /watchlists/1
  def update
    if @watchlist.update(watchlist_params)
      render json: @watchlist
    else
      render json: @watchlist.errors, status: :unprocessable_entity
    end
  end

  # DELETE /watchlists/1
  def destroy
    @watchlist.destroy
    @prices = get_live_price
    @watchlists = Watchlist.all
    render json: {watchlists: @watchlists, prices: @prices }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_watchlist
      @watchlist = Watchlist.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def watchlist_params
      params.require(:watchlist).permit(:ticker, :user_id)
    end


     # Use to fetch the latest stock price
     def get_live_price
      serialized_string = get_all_stocks_from_watchlist
      current_market_price = {}
      url = "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/quote?symbols=#{serialized_string}"
      #url = "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/quote?symbols=BTC-USD"
      response = Excon.get(
        url,
        headers: {
          #'X-RapidAPI-Host' => URI.parse(url).host,
          #'X-RapidAPI-Key' => ENV.fetch('RAPIDAPI_API_KEY')
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

    def get_all_stocks_from_watchlist
      stocks_list = []
      stocks_string = ""
      serialized_string = ""
      # find distinct stocks from portfolio
      @distinct_stocks = Watchlist.select(:ticker).distinct
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
