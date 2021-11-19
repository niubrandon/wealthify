class CreateTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :transactions do |t|
      t.string :ticker
      t.integer :trade
      t.integer :quantity
      t.integer :settled_price

      t.timestamps
    end
  end
end
