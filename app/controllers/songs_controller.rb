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

    if params[:lim] 
      lim = params[:lim]
    end

    if params[:order] && params[:order] != "ASC" && params[:order] != "DESC"
      status = 400;

    else
      status = 200;
      @songs = Song.where("title LIKE ?", "%#{params[:q]}%").limit(lim).offset(params[:offset]).order("title #{params[:order]}")
      @albums = Album.where("title LIKE ?", "%#{params[:q]}%")
      @artists = Artist.where("name LIKE ?", "%#{params[:q]}%")

      @songs.each do |s|
        result = {:song_id => s.id, :song_title => s.title, :album_id => s.album_id, :album_title => s.album.title,
                     :artist_id => s.album.artist_id, :artist_name => s.album.artist.name, :audio_url => s.url, :cover_url => s.album.cover}
        results.push(result)
      end

      Song.find_each do |s|
        @albums.each do |a|
          if s.album.title == a.title
            result = {:song_id => s.id, :song_title => s.title, :album_id => s.album_id, :album_title => s.album.title,
                     :artist_id => s.album.artist_id, :artist_name => s.album.artist.name, :audio_url => s.url, :cover_url => s.album.cover}
            unless results.include?(result)
              results.push(result)
            end
          end
        end
        @artists.each do |a|
          if s.album.artist.name == a.name
            result = {:song_id => s.id, :song_title => s.title, :album_id => s.album_id, :album_title => s.album.title,
                     :artist_id => s.album.artist_id, :artist_name => s.album.artist.name, :audio_url => s.url, :cover_url => s.album.cover}
            unless results.include?(result)
              results.push(result)
            end
          end
        end
      end
    end

    respond_to do |format|
      if not format.json 
        {:status => 406}
      end
      format.json { render json: results, :status => status }
    end
  end
end