class ApplicationController < ActionController::Base

  # Abans d'autenticar, ens assegurem de que el token estigui on volem
  prepend_before_filter :get_auth_token
  # Abans d'executar res, autentiquem l'usuari

  before_filter :authenticate_user!
  
  protect_from_forgery


  # En cas de que no passem un auth_token com a parametre però si com a Header, copiem el token a l'array de params perque aixi ho demana devise.
  private
  def get_auth_token
  	if auth_token = params[:auth_token].blank? && request.headers["X-AUTH-TOKEN"]
  		params[:auth_token] = auth_token
  	end
  end
end
