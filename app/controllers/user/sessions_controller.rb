class User::SessionsController < Devise::SessionsController
	append_view_path 'app/views/devise'
    def create
      respond_to do |format|
        format.html { super }
        format.json {
          warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#new")
          current_user.ensure_authentication_token!
          render :json => {:user_id => current_user.id, :auth_token => current_user.authentication_token}.to_json, :status => :ok
        }
      end
    end
end
