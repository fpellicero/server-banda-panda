class PlaylistsController < ApplicationController

	#POST /users/:id/playlists
	# {playlist_name: String, songs: [song_id]*}
	def create
		@playlist = Playlist.create({:name => params[:name], :user_id => params[:id]})
		status = 200

		params[:songs].each do |s|
			song = Song.find(s.values)
			@playlist.song << song
		end

		result = {:id => @playlist.id}

		respond_to do |format|
	  		unless format.json 
		        {:status => 406} #Nomes retorna Json
		    end
		    format.json { render json: result, :status => status }
		end
	end

	#GET /users/{id}/playlists?lim=”...”&offset=”...”
	def usr_get
		results = Array.new()
		lim = 10
		offset = 0

		#Comprovem els params:
	    #comprovem limit
	    if params[:lim] 
	      if !params[:lim].is_i? || !(Integer(params[:lim]) > 0) 
	        status = 400
	      else
	        lim = params[:lim]
	      end
	    end
	    #comprovem offset
	    if params[:offset] 
	      if !params[:offset].is_i? || !(Integer(params[:offset]) >= 0) 
	        status = 400
	      else
	        offset = params[:offset]
	      end
	    end

	    unless status == 400
	        status = 200
			@playlists = Playlist.where("user_id = ?", params[:id])

			@playlists.each do |p|
				result = {:playlist_id => p.id, :playlist_name => p.name}
				results.push(result)
			end

		  	filtered_results = results[Integer(offset)..(Integer(offset)+Integer(lim)-1)] #Apliquem offsets i limits
		  	if Integer(offset) >= results.size() && Integer(offset) != 0
		    	status = 416 #Offset fora de arxiu
		  	elsif results[Integer(offset)+Integer(lim)]
		    	status = 206 #Partial Content
		  	end
	    end

	    respond_to do |format|
	  		unless format.json 
		        {:status => 406} #Nomes retorna Json
		    end
		    format.json { render json: filtered_results, :status => status }
		end
	end

	# GET /playlists/{id}
	# {playlist_name, songs:[{song_id, song_title, album_id, album_title, artist_id, artist_name, audio_url, cover_url}]*}
	def get
		lim = 15
		offset = 0
		songs = Array.new()
		result = Array.new()

		#Comprovem els params:
	    #comprovem limit
	    if params[:lim] 
	      if !params[:lim].is_i? || !(Integer(params[:lim]) > 0) 
	        status = 400
	      else
	        lim = params[:lim]
	      end
	    end
	    #comprovem offset
	    if params[:offset] 
	      if !params[:offset].is_i? || !(Integer(params[:offset]) >= 0) 
	        status = 400
	      else
	        offset = params[:offset]
	      end
	    end

	    unless status == 400
	        status = 200
			@playlist = Playlist.find(params[:id])

			@playlist.song.each do |s|
				song = {:song_id => s.id, :song_title => s.title, :album_id => s.album_id, :album_title => s.album.title,
                     :artist_id => s.album.artist_id, :artist_name => s.album.artist.name, :audio_url => s.url, :cover_url => s.album.cover}
                songs.push(song)
			end

			filtered_songs = songs[Integer(offset)..(Integer(offset)+Integer(lim)-1)] #Apliquem offsets i limits
	      	if Integer(offset) >= songs.size() && Integer(offset) != 0
	       	 	status = 416 #Offset fora de arxiu
	      	elsif songs[Integer(offset)+Integer(lim)]
	       	 	status = 206 #Partial Content
	      	end

			result = {:playlist_name => @playlist.name, :songs => filtered_songs}
		end

	    respond_to do |format|
	  		unless format.json 
		        {:status => 406} #Nomes retorna Json
		    end
		    format.json { render json: result, :status => status }
		end
	end

	# POST /playlists/{id}
	def add
		@playlist = Playlist.find(params[:id])
		song = Song.find(params[:song_id])
		@playlist.song << song
		status = 200

		respond_to do |format|
	  		unless format.json 
		        {:status => 406} #Nomes retorna Json
		    end
		    format.json { render json: @playlist, :status => status }
		end
	end

	# PUT /playlists/{id}
	def modify
		@playlist = Playlist.find(params[:id])
		@playlist.update_attribute(:name, params[:playlist_name])

		respond_to do |format|
      		format.json { render json: @playlist }
      	end
	end
end

# Crida per comprovar si un string representa un enter:
class String
    def is_i?
       !!(self =~ /^[-+]?[0-9]+$/)
    end
end