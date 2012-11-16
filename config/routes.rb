ServerBandaPanda::Application.routes.draw do

  match 'songs/search' => 'songs#search'

  devise_for :users, :controllers => { :sessions => "user/sessions"}

  root :to => "home#index"
  
end
