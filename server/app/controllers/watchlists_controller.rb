class WatchlistsController < ApplicationController
  before_action :set_watchlist, only: [:show, :update, :destroy]

  # GET /watchlists
  def index
    @watchlists = Watchlist.all

    render json: @watchlists

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
    @watchlists = Watchlist.all
    render json: @watchlists
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
end
