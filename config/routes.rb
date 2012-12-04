ServerBandaPanda::Application.routes.draw do

  get 'songs/search' => 'songs#search'
  get 'albums/search' => 'albums#search'
  get 'artists/search' => 'artists#search'

  get 'songs/:id' => 'songs#get'
  get 'albums/:id' => 'albums#get'
  get 'artists/:id' => 'artists#get'
  get 'users/:id/playlists' => 'playlists#usr_get'
  get 'playlists/:id' => 'playlists#get'
  #get 'users/:id' => 'users#get'

  post 'users/:id/playlists' => 'playlists#create'
  post 'playlists/:id' => 'playlists#add'

  put 'users/:id' => 'users#modify'
  put 'playlists/:id' => 'playlists#modify'

  devise_for :users, :controllers => { :sessions => "user/sessions"}

  root :to => "home#index"
  
end
