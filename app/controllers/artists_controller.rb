class ArtistsController < ApplicationController

	#GET /artists/search?q=”...”&order=”...”&lim=”...”&offset=”...”
	def search
		results = Array.new()
	    lim = 10
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
			@artists = Artist.where("name LIKE ?", "%#{params[:q]}%")

			@artists.each do |a|
				result = {:artist_id => a.id, :artist_name => a.name, :artist_img_url => nil}
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

	#{artist_name, artist_image, artist_info, artist_year, artist_albums: [album_id, album_title, album_cover]* }
	#GET /albums/{id}
	def get
		result = Array.new()
		albums = Array.new()

		if !Artist.exists?(params[:id])
			status = 404
		else
			status = 200
	    	@artist = Artist.find(params[:id]);
	    	@artist.album.each do |a|
	    		album = {:album_id => a.id, :album_title => a.title, :album_cover => a.cover}
	    		albums.push(album)
	    	end
	    	result = {:artist_name => @artist.name, :artist_image => nil, :artist_info => nil, :artist_year => nil, :artist_albums => albums}
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