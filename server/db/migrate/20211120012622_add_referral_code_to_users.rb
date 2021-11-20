class AddReferralCodeToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :referral_code, :string
  end
end
