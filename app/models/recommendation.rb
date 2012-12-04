class Recommendation < ActiveRecord::Base
  self.inheritance_column = nil # Rails reserva per defecte "type", ho canviem per poder fer-lo servir.
  attr_accessible :source_id, :target_id, :type, :resource_id, :read
end
