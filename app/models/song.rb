class Song < ActiveRecord::Base

	attr_accessible :title, :url
	belongs_to :album
end