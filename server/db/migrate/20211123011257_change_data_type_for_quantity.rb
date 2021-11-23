class ChangeDataTypeForQuantity < ActiveRecord::Migration[6.1]
  change_table(:portfolios) do |t|
    t.change :quantity, :float
  end
  change_table(:transactions) do |t|
    t.change :quantity, :float
  end

end
