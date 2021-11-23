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
    #check if the account is in the seeds or not, if not in seeds create a new account
    if !self.accounts
    self.accounts.create!({
      :cash_balance => 10000,
      :stock_balance => 0,
      :total_balance => 10000 
    })
  end

  end

end
