class User < ApplicationRecord
  #changed ApplicationRecord to ActiveRecord:Base
  # brcypt method
  has_secure_password

  has_many :accounts

  validates_presence_of :email

  validates_uniqueness_of :email, case_sensitive: false

  before_save :downcase_email

  def downcase_email
    self.email = self.email.delete(' ').downcase
  end


  #need after_create to create account for new user and give 10000 for starting

  after_create do
    puts "****after create. ** self: #{self} ** self.id: #{self.id}****"
    #check if the account is in the seeds or not, if not in seeds create a new account

    # self.accounts.create!({
    #   :cash_balance => 10000,
    #   :stock_balance => 0,
    #   :total_balance => 10000,
    #   :referral_bonus => 0,
    #   :signup_bonus => false
    # })


      # if self.referral_code != nil
      #   puts "*****YES signed up with a referral code*****"
      #   self.accounts.create!({
      #     :cash_balance => 10000,
      #     :stock_balance => 0,
      #     :signup_bonus => true,
      #     :referral_bonus => 0,
      #     :total_balance => 10250,
      #     # :user_id => self.id
      #   })
      # else
      #   puts "*****NO no code, no extra money**"
      #   self.accounts.create!({
      #     :cash_balance => 10000,
      #     :stock_balance => 0,
      #     :signup_bonus => false,
      #     :referral_bonus => 0,
      #     :total_balance => 10000,
      #     # :user_id => self.id
      #   })
      # end
  end

end
