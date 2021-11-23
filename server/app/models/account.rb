class Account < ApplicationRecord

  belongs_to :user, foreign_key: :user_id
  has_many :portfolios
  has_many :transactions

end
