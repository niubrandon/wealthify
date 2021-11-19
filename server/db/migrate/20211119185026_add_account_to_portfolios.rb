class AddAccountToPortfolios < ActiveRecord::Migration[6.1]
  def change
    add_reference :portfolios, :account, null: false, foreign_key: true
  end
end
