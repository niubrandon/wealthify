class ConverDatatypeFloat < ActiveRecord::Migration[6.1]
  change_table(:portfolios) do |t|
    t.change :current_spot_price, :float
  end
  change_table(:transactions) do |t|
    t.change :settled_price, :float
  end
  change_table(:accounts) do |t|
    t.change :cash_balance, :float
    t.change :stock_balance, :float
    t.change :total_balance, :float
  end
end
