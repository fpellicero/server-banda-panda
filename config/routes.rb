ServerBandaPanda::Application.routes.draw do

  get '/api/songs/search' => 'songs#search'
  get '/api/albums/search' => 'albums#search'
  get '/api/artists/search' => 'artists#search'
  get '/api/users/search' => 'users#search'

  get '/api/songs/:id' => 'songs#get'
  get '/api/albums/:id' => 'albums#get'
  get '/api/artists/:id' => 'artists#get'
  get '/api/users/:id/playlists' => 'playlists#usr_get'
  get '/api/playlists/:id' => 'playlists#get'
  get '/api/users/:id/recommendations' => 'recommendations#get'
  get '/api/users/:id' => 'users#get'

  post '/api/users/:id/recommendations' => 'recommendations#create'
  post '/api/users/:id/playlists' => 'playlists#create'
  post '/api/playlists/:id' => 'playlists#add'

  put '/api/users/:id' => 'users#modify'
  put '/api/playlists/:id' => 'playlists#modify'

  delete '/api/playlists/:id' => 'playlists#delete'
  delete '/api/playlists/:id_playlist/:id_song' => 'playlists#delete_song'

  devise_for :users, :controllers => { :sessions => "user/sessions"}

  root :to => "home#index"
  
end
