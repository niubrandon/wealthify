class AddUserRefToReferrals < ActiveRecord::Migration[6.1]
  def change
    add_reference :referrals, :user, null: false, foreign_key: true
  end
end
