class CreateWatchlists < ActiveRecord::Migration[6.1]
  def change
    create_table :watchlists do |t|
      t.string :ticker

      t.timestamps
    end
    add_reference :watchlists, :user, null: false, foreign_key: true
  end
end
