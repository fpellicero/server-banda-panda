class Song < ActiveRecord::Base
  attr_accessible :title, :url, :album_id
  belongs_to :album
  has_and_belongs_to_many :playlist
end
