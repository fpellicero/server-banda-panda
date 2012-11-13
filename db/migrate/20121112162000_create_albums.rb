class CreateSongs < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.string :title, :null => false
      t.integer :album_id
      t.integer :artist_id
      t.string :cover

      t.timestamps
    end
  end
end
