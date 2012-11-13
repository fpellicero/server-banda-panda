class ArtistsController < ApplicationController
  # GET /artists
  # GET /artists.json
  def index
    @artists = Artists.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @artists }
    end
  end