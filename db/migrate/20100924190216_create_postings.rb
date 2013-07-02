class CreatePostings < ActiveRecord::Migration
  def self.up
    create_table :postings do |t|
      t.string :title
      t.text :summary
      t.text :body
      t.string :status
      t.integer :counter
      t.integer :user_id
      t.string :keywords
      t.string :url
      t.timestamps
    end
  end
  
  def self.down
    drop_table :postings
  end
end
