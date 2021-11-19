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
  :email => 'admon@wealthify.com',
  :password_digest => 'Super12345'
})


account1 = user1.accounts.create!({
  :cash_balance => 2000,
  :stock_balance => 9566,
  :total_balance => 12000  
})

account1.portfolios.create!({
  :ticker => 'AAPL',
  :quantity => 20,
  :current_spot_price => 158,
})

account1.portfolios.create!({
  :ticker => 'ETH-USD',
  :quantity => 1.5,
  :current_spot_price => 4271,
 
})

account1.transactions.create!({
  :ticker => 'AAPL',
  :trade => 1,
  :quantity => 20,
  :settled_price => 158
})

account1.transactions.create!({
  :ticker => 'ETH-USD',
  :trade => 1,
  :quantity => 1.5,
  :settled_price => 4271
})

#seed for Adriana

user2 = User.create!({
  :first_name => 'Adriana',
  :last_name => 'Calvo-Matos',
  :email => 'adriana@wealthify.com',
  :password_digest => 'adriana'
})

account2 = user2.accounts.create!({
  :cash_balance => 150,
  :stock_balance => 9850,
  :total_balance => 10000
})

account2.portfolios.create!({
  :ticker => 'SHOP',
  :quantity => 3,
  :current_spot_price => 2140,
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
  :settled_price => 2140
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
  :password_digest => '123456'
})

account3 = user3.accounts.create!({
  :cash_balance => 4515,
  :stock_balance => 5485,
  :total_balance => 10000
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
  :ticker => 'APPL',
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
  :password_digest => 'Super12345'
})


account4 = user4.accounts.create!({
  :cash_balance => 5.5,
  :stock_balance => 9994.5,
  :total_balance => 10000 
})

account4.portfolios.create!({
  :ticker => 'ETH-USD',
  :quantity => 0.5,
  :current_spot_price => 3999,
})

account4.portfolios.create!({
  :ticker => 'BTC-USD',
  :quantity => 0.01,
  :current_spot_price => 57500,
 
})

account4.portfolios.create!({
  :ticker => 'DOT1-USD',
  :quantity => 100,
  :current_spot_price => 38.5,
 
})

account4.portfolios.create!({
  :ticker => 'TLRY',
  :quantity => 300,
  :current_spot_price => 10.7,
 
})


account4.portfolios.create!({
  :ticker => 'CGC',
  :quantity => 30,
  :current_spot_price => 12,
 
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
  :quantity => 0.01,
  :settled_price => 57500
})

account4.transactions.create!({
  :ticker => 'DOT1-USD',
  :trade => 1,
  :quantity => 100,
  :settled_price => 38.5
})

account4.transactions.create!({
  :ticker => 'TLRY',
  :trade => 1,
  :quantity => 300,
  :settled_price => 10.7
})

account4.transactions.create!({
  :ticker => 'CGC',
  :trade => 1,
  :quantity => 30,
  :settled_price => 12
})



puts "DONE!"