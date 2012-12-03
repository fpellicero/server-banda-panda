class UsersController < ApplicationController
	#PUT /users/{id}
	# email:String, password:String
	# curl -XPUT -H "Content-type: application/json" -d '{"email":"test22@example.com"}' localhost:3000/users/2.json
	def modify
    status = 205
    
    if !User.exists?(params[:id])
      status = 404
    end
    
    if status == 205
  		@user = User.find(params[:id])
  		@user.update_attributes :email => params[:email], :avatar => params[:avatar], :username => params[:username], :status => params[:status]
    end

    respond_to do |format|
      unless format.json 
        {:status => 406} #Nomes retorna Json
      end
      format.json { render json: @user, :status => status }
    end
  end

    # GET  /users/{id}
    def get
    status = 200
    
    if !User.exists?(params[:id])
      status = 404
    end

    if status == 200
    	@user = User.find(params[:id])
    	result = {:username => @user.username, :email => @user.email, :avatar => @user.avatar, :status => @user.status}
    end
    
		respond_to do |format|
      unless format.json 
        {:status => 406} #Nomes retorna Json
      end
    		format.json { render json: result, :status => status }
    	end
    end
end
