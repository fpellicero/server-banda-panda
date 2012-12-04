class Recommendation < ActiveRecord::Base
self.inheritance_column = nil #i wanna use type as a column on my db, bitch
  attr_accessible :source_id, :target_id, :type, :resource_id
end
