class AddReadToRecommendation < ActiveRecord::Migration
  def change
    add_column :recommendations, :read, :integer
  end
end
