class CreateReferrals < ActiveRecord::Migration[6.1]
  def change
    create_table :referrals do |t|
      t.string :recipient_id

      t.timestamps
    end
  end
end
