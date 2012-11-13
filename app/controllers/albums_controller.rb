class AlbumsController < ApplicationController
  # GET /albums
  # GET /albums.json
  def index
    @albums = Albums.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @albums }
    end
  end