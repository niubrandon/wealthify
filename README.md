# Wealthify

## We are team Wealthify! We created a trading simulation application which allows users to buy and sell stocks/crypto to build their own portfolio.

Each user starts off with $10,000. You can browse through live financial data, store your favourite stocks on your watchlist, see which user has the top performing portfolio on the leaderboard, and invite friends to join to receive a $250 cash bonus!

## Team members:

- Adriana https://github.com/wavyadri
- Aaron https://github.com/tennaaro
- Brandon https://github.com/niubrandon

## Tech stacks:

- React
- Ruby on Rails
- PostgreSQL
- SCSS

## Project features:

- Autocomplete search
- Dynamic portfolio charts
- Transaction history
- Referral code bonus
- Save favourites to watchlist
- Live financial data and graphs
- Fractional buy and sell
- Portfolio leaderboard
- Trending stocks with live 5 second update

## Live demonstration:

![image](https://github.com/niubrandon/wealthify/blob/main/public/demo.gif?raw=true)

## Cypress End-to-End testings:
![image](https://github.com/niubrandon/wealthify/blob/main/public/cypresse2e.gif?raw=true)


## API Endpoints (REST):

<table>
 <thead>
    <tr>
        <th>Route</th>
        <th>Method</th>
        <th>Controller#Action</th>
    </tr>
   </thead>
   <tbody>
        <tr>
          <td>/users</td>
          <td>POST</td>
          <td>users#create</td>
        </tr>
        <tr>
          <td>/users/:id</td>
          <td>GET</td>
          <td>users#show</td>
        </tr>
        <tr>
          <td>/users/login</td>
          <td>POST</td>
          <td>users#login</td>
        </tr>
        <tr>
          <td>/api/accounts</td>
          <td>GET</td>
          <td>accounts#index</td>
        </tr>
        <tr>
          <td>/api/accounts/:id</td>
          <td>GET</td>
          <td>accounts#show</td>
        </tr>
        <tr>
          <td>/api/accounts/leaderboard</td>
          <td>GET</td>
          <td>accounts#leaderboard</td>
        </tr>
        <tr>
          <td>/api/transactions</td>
          <td>POST</td>
          <td>transactions#create</td>
        </tr>
        <tr>
          <td>/api/transactions</td>
          <td>GET</td>
          <td>transactions#index</td>
        </tr>
        <tr>
          <td>/api/portfolios</td>
          <td>GET</td>
          <td>portfolios#index</td>
        </tr>
        <tr>
          <td>/api/portfolios/:id</td>
          <td>GET</td>
          <td>portfolios#show</td>
        </tr>
        <tr>
          <td>/api/portfolios</td>
          <td>POST</td>
          <td>portfolios#create</td>
        </tr>
        <tr>
          <td>/api/watchlists</td>
          <td>GET</td>
          <td>watchlists#index</td>
        </tr>
        <tr>
          <td>/api/watchlists</td>
          <td>DELETE</td>
          <td>watchlists#destroy</td>
        </tr>
          <tr>
          <td>/referrals</td>
          <td>POST</td>
          <td>referrals#create</td>
        </tr>
          <tr>
          <td>/referrals</td>
          <td>GET</td>
          <td>referrals#index</td>
        </tr>
          <tr>
          <td>/referrals/:id</td>
          <td>GET</td>
          <td>referrals#show</td>
        </tr>

   </tbody>
</table>

## Dependencies:

### Client

- axios
- bootstrap
- chart.js
- react-bootstrap
- node-sass
- react-icons
- jest
- storybook
- cypress
- @testing-library/react

### Server

- excon
- dotenv-rails
- bcrypt
- jwt
- rack-cors

## Getting Started:

- clone this repo: git@github.com:niubrandon/wealthify.git
```
git clone https://github.com/niubrandon/wealthify.git
```
- go to client folder install npm packages, => npm install => npm start
```
npm install
```
then run with
```
npm start
```
- go to server folder install gems, => bundle install => rake db:reset => rails server
