class CreateRecommendations < ActiveRecord::Migration
  def change
    create_table :recommendations do |t|
      t.integer :target_id
      t.integer :source_id
      t.string :type

      t.timestamps
    end
  end
end
