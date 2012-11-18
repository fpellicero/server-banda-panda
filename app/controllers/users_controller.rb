class UsersController < ApplicationController
	#PUT /users/{id}
	# email:String, password:String
	# curl -XPUT -H "Content-type: application/json" -d '{"email":"test22@example.com"}' localhost:3000/users/2.json
	def modify
		@user = User.find(params[:id])
		@user.update_attribute(:email, params[:email])
		respond_to do |format|
      		format.json { render json: @user }
      	end
    end
end
