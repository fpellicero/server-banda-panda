class RecommendationsController < ApplicationController

	#POST /users/{id}/recommendations
	def create
		status = 201

		if !User.exists?(params[:id])
		  	status = 404
		end
		
    	if status == 201
			if params[:type] == "song"
				if !Song.exists?(params[:resource_id])
					status = 404
				else
					resource_name = Song.find(params[:resource_id]).title
				end
			elsif params[:type] == "album"
				if !Album.exists?(params[:resource_id])
					status = 404
				else
					resource_name = Album.find(params[:resource_id]).title
				end
			elsif params[:type] == "artist"
				if !Artist.exists?(params[:resource_id])
					status = 404
				else
					resource_name = Artist.find(params[:resource_id]).name
				end
			elsif params[:type] == "playlist"
				if !Playlist.exists?(params[:resource_id])
					status = 404
				else
					resource_name = Playlist.find(params[:resource_id]).name
				end
			else
				status = 400
			end
		end

		if status == 201
			recommendation = Recommendation.create({:source_id => current_user.id, :target_id => params[:id], :type => params[:type], :resource_id => params[:resource_id], :read => 0})
	    	Pusher.trigger('notifications_'+params[:id], params[:type]+'_recommendation', {:resource_id => params[:resource_id], :resource_name => resource_name, :source_id => current_user.id, :source_username => current_user.username })
    	end

		respond_to do |format|
	  		unless format.json 
		        {:status => 406} #Nomes retorna Json
		    end
		    format.json { render json: recommendation, :status => status }
		end
	end

	#GET /users/{id}/recommendations
	def get
		results = Array.new()
		lim = 30
   		offset = 0
		status = 200

		#comprovem lim
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

	   	if !User.exists?(params[:id])
		  status = 404
	    elsif current_user.id != Integer(params[:id])
      		status = 403
    	end

		if status == 200
			recommendations = Recommendation.where("target_id = ?", "#{params[:id]}").order("created_at DESC")

			recommendations.each do |r|
				username = User.find(r.source_id).username
				if r.type == "song" 
					resource_name = Song.find(r.resource_id).title
				elsif r.type == "album"
					resource_name = Album.find(r.resource_id).title
				elsif r.type == "artist"
					resource_name = Artist.find(r.resource_id).name
				else
					resource_name = Playlist.find(r.resource_id).name
				end 
						
					
				result = {:source_id => r.source_id, :source_username => username, :type => r.type, :resource_id => r.resource_id, :resource_name => resource_name, :date => r.created_at, :read => r.read}
				# si encara no ha estat llegida, la marquem com a llegida.
				if r.read == 0
					r.update_attribute :read, 1
				end
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

class String
    def is_i?
       !!(self =~ /^[-+]?[0-9]+$/)
    end
end