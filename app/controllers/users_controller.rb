class UsersController < ApplicationController
	#PUT /users/{id}
	# email:String, password:String
	# curl -XPUT -H "Content-type: application/json" -d '{"email":"test22@example.com"}' localhost:3000/users/2.json
	def modify
    status = 205
    
    if !User.exists?(params[:id])
      status = 404
    elsif current_user.id != Integer(params[:id])
      status = 403
    end

    if status == 205
  		user = User.find(params[:id])
      if params[:email]
        user.update_attribute :email, params[:email]
      end
      if params[:username]
        user.update_attribute :username, params[:username]
      end
      if params[:status]
        user.update_attribute :status, params[:status]
      end
      if params[:avatar]
        user.update_attribute :avatar, params[:avatar]
      end
  		#user.update_attributes :email => params[:email], :avatar => params[:avatar], :username => params[:username], :status => params[:status]
    end

    respond_to do |format|
      unless format.json 
        {:status => 406} #Nomes retorna Json
      end
      format.json { render json: user, :status => status }
    end
  end

  # GET /users/search?q='..'
  def search
    results = Array.new()
    lim = 30
    offset = 0
    status = 200

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
      users = User.where("username LIKE ?", "%#{params[:q]}%")

      users.each do |u|
        result = {:user_id => u.id, :user_username => u.username}
        results.push(result)
      end
    end

    respond_to do |format|
      unless format.json 
        {:status => 406} #Nomes retorna Json
      end
      format.json { render json: results, :status => status }
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
