class UsersController < ApplicationController
  require 'securerandom'  

  #jwt implementation, except crete or login
  before_action :authenticate_request!, except: [:create, :login] 

  before_action :set_user, only: [:show, :update, :destroy]


  # add a login
  def login
    user = User.find_by(email: user_params[:email].to_s.downcase)
    #authenticate method from has_secure_password helper
    if user&.authenticate(user_params[:password])
      auth_token = JsonWebToken.encode(user_id: user.id)
      ########################## get referral code
      render json: { auth_token: auth_token, user_id: user.id, user_email: user.email, referral_code: user.referral_code }, status: :ok
    else
      render json: { error: 'Invalid username/password' }, status: :unauthorized
    end
  end

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # for user signup form
  def new
  end
  
  # POST /users
  def create

    signup_referral_code = user_params[:referral_code].strip
    puts "***SIGNUP REFFERAL CODE :::: #{signup_referral_code}****"

    if signup_referral_code == ''
      @user = User.new(user_params)
      @user.save
      puts "*****NO no code, no extra money**"
      @user.accounts.create!({
        :cash_balance => 10000,
        :stock_balance => 0,
        :signup_bonus => false,
        :referral_bonus => 0,
        :total_balance => 10000,
      })
    elsif signup_referral_code != '' && User.find_by(referral_code: signup_referral_code)
      @user = User.new(user_params)
      @user.save
      puts "*****YES signed up with a referral code*****"
      @user.accounts.create!({
        :cash_balance => 10250,
        :stock_balance => 0,
        :signup_bonus => true,
        :referral_bonus => 0,
        :total_balance => 10250,
      })

      # give code owner money, too
      owner = User.find_by(referral_code: @user.referral_code)
      owner_account = Account.find_by(user_id: owner.id)
      new_referral_count = owner_account.referral_bonus + 1
      new_cash_balance = owner_account.cash_balance + 250
      new_total_balance = owner_account.total_balance + 250

      owner_account.update(:referral_bonus => new_referral_count, :cash_balance => new_cash_balance, :total_balance => new_total_balance)

      # create referral table for this relationship
      Referral.create({:recipient_id => @user.id, :user_id => owner.id})
    else
      puts "*****INVALID CODE****"
    end
      
    # create referral code - replace used code with new user code to store in db
    user_referral_code = SecureRandom.alphanumeric(6)
    @user.update(referral_code: user_referral_code)
   
    if @user.save
      auth_token = JsonWebToken.encode(user_id: @user.id)
      render json: { auth_token: auth_token, user_id: @user.id, user_email: @user.email, referral_code: @user.referral_code }, status: :created
    else
      puts @user.errors.inspect
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through. updated paramas to follow bcrypt style
    def user_params
   
      params.require(:user).permit(:first_name, :last_name, :email, :password, :referral_code)
    end
end
