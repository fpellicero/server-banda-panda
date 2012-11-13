class Song < ActiveRecord::Base

	attr_accessible :name
	has_many :album
	has_many :songs
end