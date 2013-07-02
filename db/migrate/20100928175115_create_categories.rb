class CreateCategories < ActiveRecord::Migration
  def self.up
    create_table :categories do |t|
      t.string :name
      t.timestamps
    end    
    create_table :categories_postings, :id => false do |t|
      t.integer :category_id
      t.integer :posting_id
    end
  end
  
  def self.down
    drop_table :categories
    drop_table :categories_posts
  end
end
