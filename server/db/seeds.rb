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




puts "DONE!"