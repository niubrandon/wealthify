class Transaction < ApplicationRecord

  belongs_to :account, foreign_key: :account_id

  after_create do
     
    puts "****after_create post creation of transaction***"
    # get all the data we need from this transacation
    account_id = self.account_id
    trade_type = self.trade
    settled_price = self.settled_price
    quantity = self.quantity

    # get the account 
    account_to_modify = Account.find_by(id: account_id)

    # modify stock and cash balance based on transaction type
    new_cash_balance = account_to_modify.cash_balance - settled_price * quantity * trade_type
    new_stock_balance = account_to_modify.stock_balance + settled_price * quantity * trade_type

    # modify account
    account_to_modify.update({:cash_balance => new_cash_balance, :stock_balance => new_stock_balance })

  end
end
