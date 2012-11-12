class Song < ActiveRecord::Base

	attr_accessible :title, :url, :album_id, :artist_id
	belongs_to :album
	belongs_to :artist
end