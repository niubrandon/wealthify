class ReferralsController < ApplicationController
  before_action :authenticate_request!, except: [:index]
  before_action :set_referral, only: [:show, :update, :destroy]

  # GET /referrals
  def index
    @referrals = Referral.all

    render json: @referrals
  end

  # GET /referrals/1
  def show
    render json: @referral
  end

  # POST /referrals
  def create
    @referral = Referral.new(referral_params)

    if @referral.save
      render json: @referral, status: :created, location: @referral
    else
      render json: @referral.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /referrals/1
  def update
    if @referral.update(referral_params)
      render json: @referral
    else
      render json: @referral.errors, status: :unprocessable_entity
    end
  end

  # DELETE /referrals/1
  def destroy
    @referral.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_referral
      @referral = Referral.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def referral_params
      params.require(:referral).permit(:recipient_id)
    end
    
end
