class Album < ActiveRecord::Base

	attr_accessible :title, :cover
	has_many :song
	belongs_to :artist
end