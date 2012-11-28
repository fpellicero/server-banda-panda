class Artist < ActiveRecord::Base
  attr_accessible :name, :img, :info, :year
  has_many :album
end
