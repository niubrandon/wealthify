class CreateAccounts < ActiveRecord::Migration[6.1]
  def change
    create_table :accounts do |t|
      t.integer :cash_balance
      t.integer :stock_balance
      t.integer :total_balance

      t.timestamps
    end
  end
end
