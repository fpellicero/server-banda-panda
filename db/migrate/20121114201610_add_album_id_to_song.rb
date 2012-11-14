class AddAlbumIdToSong < ActiveRecord::Migration
  def change
    add_column :songs, :album_id, :Integer
  end
end
