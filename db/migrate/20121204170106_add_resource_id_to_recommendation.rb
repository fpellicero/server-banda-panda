class AddResourceIdToRecommendation < ActiveRecord::Migration
  def change
    add_column :recommendations, :resource_id, :integer
  end
end
