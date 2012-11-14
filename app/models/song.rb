class Song < ActiveRecord::Base
  attr_accessible :title, :url, :album_id
  belongs_to :album
end
