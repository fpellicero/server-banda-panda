class ApplicationController < ActionController::Base
  prepend_before_filter :get_auth_token
  before_filter :authenticate_user!
  
  protect_from_forgery

  private
  def get_auth_token
  	if auth_token = params[:auth_token].blank? && request.headers["X-AUTH-TOKEN"]
  		params[:auth_token] = auth_token
  	end
  end
end
