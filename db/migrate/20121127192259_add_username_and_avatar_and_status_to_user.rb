class AddUsernameAndAvatarAndStatusToUser < ActiveRecord::Migration
  def change
    add_column :users, :username, :string
    add_column :users, :avatar, :string
    add_column :users, :status, :string
  end
end
