class Transaction < ApplicationRecord

  belongs_to :account, foreign_key: :account_id

  after_create do
     
    if !self.account_id

      puts "****after_create post creation of transaction***"
      # get all the data we need from this transacation
      account_id = self.account_id
      trade_type = self.trade
      settled_price = self.settled_price
      quantity = self.quantity
      ticker = self.ticker
      
      # get the account 
      account_to_modify = Account.find_by(id: account_id)

      # modify stock and cash balance based on transaction type
      new_cash_balance = account_to_modify.cash_balance - settled_price * quantity * trade_type
      new_stock_balance = account_to_modify.stock_balance + settled_price * quantity * trade_type

      # modify account
      account_to_modify.update({:cash_balance => new_cash_balance, :stock_balance => new_stock_balance })

      # check if portfolio exists
      if Portfolio.find_by(account_id: account_id, ticker: ticker)
        puts "****** portfolio exists. Update or destroy ******"
        account_portfolio = Portfolio.find_by(account_id: account_id, ticker: ticker)

        new_quantity = account_portfolio.quantity + quantity * trade_type

        # update inc/dec qty
        account_portfolio.update(quantity: new_quantity)

        # destroy if 0 qty
        if new_quantity == 0
          account_portfolio.destroy
        end
      else 
        puts "****** No portfolio. Create new****"
        # create
        Portfolio.create({ticker: ticker, quantity: quantity, current_spot_price: settled_price, account_id: account_id})
      end
    end

  end
end
