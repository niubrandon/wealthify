class Transaction < ApplicationRecord

  belongs_to :account, foreign_key: :account_id

  # after_create do
     
  #   puts "****after_create post creation of transaction***"
  #   puts self
  #   # dont care about if portfolio has this tikcer for this user
  #   # create a transaction in portfolio
  #   account_id = self.account_id
  #   account_modify = Account.all.where("id = #{account_id}")
  #   puts account_modify.inspect
  #   puts account_modify[:cash_balance]
  #   puts account_modify.stock_balance
  #   puts account_modify.total_balance
    
  #   current_balance_from_account = account_modify.cash_balance - 500
  #   stock_balance_from_account = account_modify.stock_balance + 500 
  #   total_balance_from_account = account_modify.total_balance + 500
  #   #current_balance_from_account = account_modify.cash_balance - self.quantity * self.settled_price
  #   #stock_balance_from_account = account_modify.stock_balance+ self.quantity * self.settled_price
  #   #total_balance_from_account = account_modify.total_balance + self.quantity * self.settled_price
  #   account_modify.update({:cash_balance => current_balance_from_account, :stock_balance => stock_balance_from_account, :total_balance => total_balance_from_account })

  # end
end
