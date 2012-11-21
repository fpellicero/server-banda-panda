class SongsController < ApplicationController
  # GET /songs
  # GET /songs.json
  def index
    @songs = Song.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @songs }
    end
  end

  # GET /songs/1/edit
  def edit
    @song = Song.find(params[:id])
  end

  # GET /songs/new
  # GET /songs/new.json
  def new
    @song = Song.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @song }
    end
  end

  # POST /songs
  # POST /songs.json
  def create
    @song = Song.new(params[:song])

    respond_to do |format|
      if @song.save
        format.html { redirect_to @song, notice: 'Song was successfully created.' }
        format.json { render json: @song, status: :created, location: @song }
      else
        format.html { render action: "new" }
        format.json { render json: @song.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /songs/1
  # PUT /songs/1.json
  def update
    @song = Song.find(params[:id])

    respond_to do |format|
      if @song.update_attributes(params[:song])
        format.html { redirect_to @song, notice: 'Song was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @song.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /songs/1
  # DELETE /songs/1.json
  def destroy
    @song = Song.find(params[:id])
    @song.destroy

    respond_to do |format|
      format.html { redirect_to songs_url }
      format.json { head :no_content }
    end
  end

  #GET /songs/search?q=”...”&order=”...”&lim=”...”&offset=”...”
  def search
    results = Array.new()
    lim = 15
    offset = 0
    order = "ASC"

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
    #comprovem order
    if params[:order] 
      if params[:order] != "ASC" && params[:order] != "DESC"
        status = 400
      else 
        order = params[:order]
      end
    end  

    #Si els params son correctes fem la cerca:
    unless status == 400
      status = 200
      @songs = Song.where("title LIKE ?", "%#{params[:q]}%")
      @albums = Album.where("title LIKE ?", "%#{params[:q]}%")
      @artists = Artist.where("name LIKE ?", "%#{params[:q]}%")

      @songs.each do |s| # Afegim cancons que tenen la query al titol
        result = {:song_id => s.id, :song_title => s.title, :album_id => s.album_id, :album_title => s.album.title,
                     :artist_id => s.album.artist_id, :artist_name => s.album.artist.name, :audio_url => s.url, :cover_url => s.album.cover}
        results.push(result)
      end

      Song.find_each do |s| # Afegim cancons que tenen query a l'album
        @albums.each do |a|
          if s.album.title == a.title
            result = {:song_id => s.id, :song_title => s.title, :album_id => s.album_id, :album_title => s.album.title,
                     :artist_id => s.album.artist_id, :artist_name => s.album.artist.name, :audio_url => s.url, :cover_url => s.album.cover}
            unless results.include?(result)
              results.push(result)
            end
          end
        end

        @artists.each do |a| # Afegim cancon que tenen la query a l'artist
          if s.album.artist.name == a.name
            result = {:song_id => s.id, :song_title => s.title, :album_id => s.album_id, :album_title => s.album.title,
                     :artist_id => s.album.artist_id, :artist_name => s.album.artist.name, :audio_url => s.url, :cover_url => s.album.cover}
            unless results.include?(result)
              results.push(result)
            end
          end
        end
      end
      #Ordenem els resultats:
      if order == "DESC" 
        results.sort! {|x,y| y[:song_title].downcase <=> x[:song_title].downcase}
      else
        results.sort! {|x,y| x[:song_title].downcase <=> y[:song_title].downcase}
      end

      filtered_results = results[Integer(offset)..(Integer(offset)+Integer(lim)-1)] #Apliquem offsets i limits
      if Integer(offset) >= results.size() && Integer(offset) != 0
        status = 416 #Offset fora de arxiu
      elsif results[Integer(offset)+Integer(lim)]
        status = 206 #Partial Content
      end
    end

    respond_to do |format|
      if not format.json 
        {:status => 406} #Nomes retorna Json
      end
      format.json { render json: filtered_results, :status => status }
    end
  end
end

# Crida per comprovar si un string representa un enter:
class String
    def is_i?
       !!(self =~ /^[-+]?[0-9]+$/)
    end
end