class AddReferralCountsToAccounts < ActiveRecord::Migration[6.1]
  def change
    add_column :accounts, :referral_bonus, :integer
    add_column :accounts, :signup_bonus, :boolean
  end
end
