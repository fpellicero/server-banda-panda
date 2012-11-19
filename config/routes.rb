ServerBandaPanda::Application.routes.draw do

  get 'songs/search' => 'songs#search'

  put 'users/:id' => 'users#modify'

  devise_for :users, :controllers => { :sessions => "user/sessions"}

  root :to => "home#index"
  
end
