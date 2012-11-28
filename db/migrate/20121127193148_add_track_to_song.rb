class AddTrackToSong < ActiveRecord::Migration
  def change
    add_column :songs, :track, :integer
  end
end
