class AddUserIdToPlaylist < ActiveRecord::Migration
  def change
    add_column :playlists, :user_id, :Integer
  end
end
