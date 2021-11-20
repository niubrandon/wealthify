Rails.application.routes.draw do
  
  resources :referrals
  scope '/api' do
  resources :portfolios
  resources :transactions
  resources :accounts
  resources :users
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
