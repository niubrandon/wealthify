# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding data..."

user1 = User.create!({
  :first_name => 'wealthify',
  :last_name => 'wealthify',
  :email => 'admin@wealthify.com',
  :password_digest => '$2a$12$8YSWbJd/Yy5ykN.9t/Q90.SrtHX10q1j.2ougPE/x6adjrqVCDzJS',
  :referral_code => 'aX6b7e'
})


account1 = user1.accounts.create!({
  :cash_balance => 4365,
  :stock_balance => 5635,
  :total_balance => 10000,
  :referral_bonus => false,
  :signup_bonus => 0  
})


account1.portfolios.create!({
  :ticker => 'AAPL',
  :quantity => 20,
  :current_spot_price => 158,
})

account1.portfolios.create!({
  :ticker => 'SHOP',
  :quantity => 1.5,
  :current_spot_price => 1650,
})




account1.transactions.create!({
  :ticker => 'AAPL',
  :trade => 1,
  :quantity => 20,
  :settled_price => 158
})

account1.transactions.create!({
  :ticker => 'SHOP',
  :trade => 1,
  :quantity => 1.5,
  :settled_price => 1650
})



#seed for Adriana

user2 = User.create!({
  :first_name => 'Adriana',
  :last_name => 'Calvo-Matos',
  :email => 'adriana@wealthify.com',
  :password_digest => '$2a$12$8YSWbJd/Yy5ykN.9t/Q90.SrtHX10q1j.2ougPE/x6adjrqVCDzJS',
  :referral_code => 'ac6b9h'
})

account2 = user2.accounts.create!({
  :cash_balance => 1770,
  :stock_balance => 8230,
  :total_balance => 10000,
  :referral_bonus => false,
  :signup_bonus => 0
})

account2.portfolios.create!({
  :ticker => 'SHOP',
  :quantity => 3,
  :current_spot_price => 1600,
})

account2.portfolios.create!({
  :ticker => 'MSFT',
  :quantity => 10,
  :current_spot_price => 343,
})

account2.transactions.create!({
  :ticker => 'SHOP',
  :trade => 1,
  :quantity => 3,
  :settled_price => 1600
})
account2.transactions.create!({
  :ticker => 'MSFT',
  :trade => 1,
  :quantity => 10,
  :settled_price => 343
})

#seed for Aaron
user3 = User.create!({
  :first_name => 'Aaron',
  :last_name => 'Tenn',
  :email => 'aaron@gmail.com',
  :password_digest => '$2a$12$8YSWbJd/Yy5ykN.9t/Q90.SrtHX10q1j.2ougPE/x6adjrqVCDzJS',
  :referral_code => 'hz6b9e'
})

account3 = user3.accounts.create!({
  :cash_balance => 4515,
  :stock_balance => 5485,
  :total_balance => 10000,
  :referral_bonus => false,
  :signup_bonus => 0
})

account3.portfolios.create!({
  :ticker => 'WISH',
  :quantity => 50,
  :current_spot_price => 4,
})

account3.portfolios.create!({
  :ticker => 'AMSC',
  :quantity => 5,
  :current_spot_price => 15,
})

account3.portfolios.create!({
  :ticker => 'AAPL',
  :quantity => 20,
  :current_spot_price => 158,
})

account3.portfolios.create!({
  :ticker => 'AMC',
  :quantity => 50,
  :current_spot_price => 41,
})

account3.transactions.create!({
  :ticker => 'WISH',
  :trade => 1,
  :quantity => 50,
  :settled_price => 4
})

account3.transactions.create!({
  :ticker => 'AMSC',
  :trade => 1,
  :quantity => 5,
  :settled_price => 15
})

account3.transactions.create!({
  :ticker => 'AAPL',
  :trade => 1,
  :quantity => 20,
  :settled_price => 158
})

account3.transactions.create!({
  :ticker => 'AMC',
  :trade => 1,
  :quantity => 50,
  :settled_price => 41
})

#seed for Brandon
user4 = User.create!({
  :first_name => 'Brandon',
  :last_name => 'Niu',
  :email => 'niubrandon@gmail.com',
  :password_digest => '$2a$12$8YSWbJd/Yy5ykN.9t/Q90.SrtHX10q1j.2ougPE/x6adjrqVCDzJS',
  :referral_code => 'z16b7z'
})


account4 = user4.accounts.create!({
  :cash_balance => 1275.5,
  :stock_balance => 8724.5,
  :total_balance => 10000,
  :referral_bonus => false,
  :signup_bonus => 0
})

account4.portfolios.create!({
  :ticker => 'ETH-USD',
  :quantity => 0.5,
  :current_spot_price => 3999,
})

account4.portfolios.create!({
  :ticker => 'BTC-USD',
  :quantity => 0.05,
  :current_spot_price => 57500,
 
})

account4.portfolios.create!({
  :ticker => 'DOT1-USD',
  :quantity => 100,
  :current_spot_price => 38.5,
 
})


account4.transactions.create!({
  :ticker => 'ETH-USD',
  :trade => 1,
  :quantity => 0.5,
  :settled_price => 3999
})

account4.transactions.create!({
  :ticker => 'BTC-USD',
  :trade => 1,
  :quantity => 0.05,
  :settled_price => 57500
})

account4.transactions.create!({
  :ticker => 'DOT1-USD',
  :trade => 1,
  :quantity => 100,
  :settled_price => 38.5
})


watchlist1 = user1.watchlists.create!({
  :ticker => 'CGC'
})

watchlist2 = user1.watchlists.create!({
  :ticker => 'AAPL'
})

watchlist3 = user1.watchlists.create!({
  :ticker => 'TLRY'
})



watchlist4 = user2.watchlists.create!({
  :ticker => 'SHOP'
})

watchlist5 = user2.watchlists.create!({
  :ticker => 'MSFT'
})

watchlist6 = user2.watchlists.create!({
  :ticker => 'TLRY'
})


watchlist7 = user3.watchlists.create!({
  :ticker => 'CGC'
})

watchlist8 = user3.watchlists.create!({
  :ticker => 'AAPL'
})

watchlist9 = user3.watchlists.create!({
  :ticker => 'TLRY'
})

watchlist10 = user4.watchlists.create!({
  :ticker => 'CGC'
})

watchlist11 = user4.watchlists.create!({
  :ticker => 'AAPL'
})

watchlist12 = user4.watchlists.create!({
  :ticker => 'TLRY'
})





Transaction.update_all "created_at = '2021-11-17 17:17:17.7777'"

puts "DONE!"


