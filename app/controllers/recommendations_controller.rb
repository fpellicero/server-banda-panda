class RecommendationsController < ApplicationController

	#POST /users/{id}/recommendations
	def create
		status = 201

		if !User.exists?(params[:id]) || !User.exists?(params[:target_id])
		  status = 404
		end

		if params[:type] == "song"
			if !Song.exists?(params[:resource_id])
				status = 404
			end
		elsif params[:type] == "album"
			if !Album.exists?(params[:resource_id])
				status = 404
			end
		elsif params[:type] == "artist"
			if !Artist.exists?(params[:resource_id])
				status = 404
			end
		elsif params[:type] == "playlist"
			if !Playlist.exists?(params[:resource_id])
				status = 404
			end
		else
			status = 400
		end
			
			

		if status == 201
			recommendation = Recommendation.create({:source_id => params[:id], :target_id => params[:target_id], :type => params[:type], :resource_id => params[:resource_id], :read => 0})
			#require 'pusher'

			Pusher.app_id = '32879'
			Pusher.key = '37cc28f59fd3d3e4f801'
			Pusher.secret = 'e27edba348e362857de9'
	    	Pusher.trigger('notification_'+params[:target_id], params[:type]+'_recommendation', {:resource_id => params[:resource_id], :source_id => params[:id] })
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
		status = 200
		recommendations = Recommendation.where("target_id = ?", "#{params[:id]}")

		recommendations.each do |r|
			result = {:source_id => r.source_id, :type => r.type, :resource_id => r.resource_id, :date => r.created_at, :read => r.read}
			# si encara no ha estat llegida, la marquem com a llegida.
			if r.read == 0
				r.update_attribute :read, 1
			end
			results.push(result)
		end

		respond_to do |format|
	  		unless format.json 
		        {:status => 406} #Nomes retorna Json
		    end
		    format.json { render json: results, :status => status }
		end
	end
end