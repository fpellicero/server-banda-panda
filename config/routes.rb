ServerBandaPanda::Application.routes.draw do

  get 'songs/search' => 'songs#search'
  get 'albums/search' => 'albums#search'
  get 'artists/search' => 'artists#search'

  get 'albums/:id' => 'albums#get'
  get 'artists/:id' => 'artists#get'
  get 'users/:id/playlists/' => 'playlists#get'

  post 'users/:id/playlists/' => 'playlists#create'

  put 'users/:id' => 'users#modify'

  devise_for :users, :controllers => { :sessions => "user/sessions"}

  root :to => "home#index"
  
end
