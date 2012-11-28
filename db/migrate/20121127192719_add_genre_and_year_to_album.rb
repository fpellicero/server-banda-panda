class AddGenreAndYearToAlbum < ActiveRecord::Migration
  def change
    add_column :albums, :genre, :string
    add_column :albums, :year, :integer
  end
end
