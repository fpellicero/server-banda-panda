class AddInfoAndYearToArtist < ActiveRecord::Migration
  def change
    add_column :artists, :info, :string
    add_column :artists, :year, :integer
  end
end
