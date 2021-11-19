class CreatePortfolios < ActiveRecord::Migration[6.1]
  def change
    create_table :portfolios do |t|
      t.string :ticker
      t.integer :quantity
      t.integer :current_spot_price

      t.timestamps
    end
  end
end
