class PlaylistsController < ApplicationController

	#POST /users/:id/playlists
	def create
		@playlist = Playlist.new({:name => params[:name], :user_id => params[:id]})
		status = 200

		respond_to do |format|
	  		unless format.json 
		        {:status => 406} #Nomes retorna Json
		    end
		    format.json { render json: @playlist, :status => status }
		end
	end

	#GET /users/{id}/playlists?lim=”...”&offset=”...”
	def get
		results = Array.new()
		lim = 5
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
			@playlists = Playlist.where("user_id ?", params[:id])

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
end

# Crida per comprovar si un string representa un enter:
class String
    def is_i?
       !!(self =~ /^[-+]?[0-9]+$/)
    end
end