class AlbumsController < ApplicationController

	 #GET /albums/search?q=”...”&order=”...”&lim=”...”&offset=”...”
	def search
		results = Array.new()
	    lim = 5
	    offset = 0
	    order = "ASC"

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
	    #comprovem order
	    if params[:order] 
	      if params[:order] != "ASC" && params[:order] != "DESC"
	        status = 400
	      else 
	        order = params[:order]
	      end
	    end  

	    #Si els params son correctes fem la cerca:
	    unless status == 400
	      status = 200
			@albums = Album.where("title LIKE ?", "%#{params[:q]}%")

			@albums.each do |a|
				result = {:album_id => a.id, :album_title => a.title, :artist_id => a.artist.id, :artist_name => a.artist.name, :cover_url => a.cover}
				results.push(result)
			end

			if order == "DESC" 
		    	results.sort! {|x,y| y[:album_title].downcase <=> x[:album_title].downcase}
		  	else
		    	results.sort! {|x,y| x[:album_title].downcase <=> y[:album_title].downcase}
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

	#{album_title, cover_url, artist_id, artist_name, album_genre, album_year, album_songs: [song_id, song_track, song_title, audio_url]* }
	#GET /albums/{id}
	def get
		result = Array.new()
		songs = Array.new()

		if !Album.exists?(params[:id])
			status = 404
		else
	    	status = 200
	    	@album = Album.find(params[:id]);
	    	@album.song.each do |s|
	    		song = {:song_id => s.id, :song_track => s.track, :song_title => s.title, :audio_url => s.url}
	    		songs.push(song)
	    	end
	    	result = {:album_title => @album.title, :cover_url => @album.cover, :artist_id => @album.artist.id, :artist_name => @album.artist.name, 
	    		:album_genre => @album.genre, :album_year => @album.year, :album_songs => songs}
		end

	    respond_to do |format|
	  		unless format.json 
		        {:status => 406} #Nomes retorna Json
		    end
		    format.json { render json: result, :status => status }
		end
	end
end

# Crida per comprovar si un string representa un enter:
class String
    def is_i?
       !!(self =~ /^[-+]?[0-9]+$/)
    end
end