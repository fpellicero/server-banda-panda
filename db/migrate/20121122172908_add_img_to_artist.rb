class AddImgToArtist < ActiveRecord::Migration
  def change
    add_column :artists, :img, :string
  end
end
