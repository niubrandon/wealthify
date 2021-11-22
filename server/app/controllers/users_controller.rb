class UsersController < ApplicationController
  

  #jwt implementation, except crete or login
  # before_action :authenticate_request!, except: [:create, :login]

  before_action :set_user, only: [:show, :update, :destroy]


  # add a login
  def login
    user = User.find_by(email: user_params[:email].to_s.downcase)
    #authenticate method from has_secure_password helper
    if user&.authenticate(user_params[:password])
      auth_token = JsonWebToken.encode(user_id: user.id)
      render json: { auth_token: auth_token, user_id: user.id, user_email: user.email }, status: :ok
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

    @user = User.new(user_params)
    puts user_params
   
    if @user.save
      auth_token = JsonWebToken.encode(user_id: @user.id)
      render json: { auth_token: auth_token, user_id: @user.id, user_email: @user.email }, status: :created
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
   
      params.require(:user).permit(:first_name, :last_name, :email, :password)
    end
end
