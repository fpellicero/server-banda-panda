class UsersController < ApplicationController
	#PUT /users/{id}
	# email:String, password:String
	# curl -XPUT -H "Content-type: application/json" -d '{"email":"test22@example.com"}' localhost:3000/users/2.json
	def modify
		status = 200
		@user = User.find(params[:id])
		@user.update_attributes :email => params[:email], :avatar => params[:avatar], :username => params[:username], :status => params[:status]
		respond_to do |format|
      		format.json { render json: @user, :status => status }
      	end
    end
end
