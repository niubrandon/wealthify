class Watchlist < ApplicationRecord
  belongs_to :user, foreign_key: :user_id

  validates_presence_of :ticker, case_sensitive: false
end
