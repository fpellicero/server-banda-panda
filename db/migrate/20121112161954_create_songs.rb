class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title, :null => false
      t.integer :album_id
      t.integer :artist_id
      t.string :url

      t.timestamps
    end
  end
end
