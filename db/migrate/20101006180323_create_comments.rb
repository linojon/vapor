class CreateComments < ActiveRecord::Migration
  def self.up
    create_table :comments do |t|
      t.string :title
      t.text :body
      t.string :author
      t.string :status
      t.boolean :anonymous
      t.integer :posting_id
      t.timestamps
    end
  end
  
  def self.down
    drop_table :comments
  end
end
