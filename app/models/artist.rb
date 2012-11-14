class Artist < ActiveRecord::Base
  attr_accessible :name
  has_many :album
end
