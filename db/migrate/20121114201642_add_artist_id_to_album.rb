class AddArtistIdToAlbum < ActiveRecord::Migration
  def change
    add_column :albums, :artist_id, :Integer
  end
end
