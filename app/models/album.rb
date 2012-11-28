class Album < ActiveRecord::Base
  attr_accessible :cover, :title, :artist_id, :genre, :year
  has_many :song
  belongs_to :artist
end
