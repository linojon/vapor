class Posting < ActiveRecord::Base
  attr_accessible :title, :summary, :status, :body, :counter, :user_id, :category_ids
  belongs_to :user
  has_and_belongs_to_many :categories
  has_many :comments
  
  cattr_reader :per_page
  @@per_page = 10
  
  scope :published, where("status = 'approved' OR status = 'frontpage'")
  scope :by_url, lambda {|url| where( :url => URI.escape(url, ':&?/.()') ) }
  scope :recent, where("created_at > ?", Time.now - 1.year)
  
  
  validates_presence_of :title
  validates_uniqueness_of :title  
  acts_as_url :title, :only_when_blank => true, :sync_url => true
  def to_param
    url
  end
  
  STATUS = %w{ submitted rejected approved frontpage } # xar: 0=submitted, 1=rejected, 2=approved, 3=frontpage
  def before_save
    self.status = 'submitted' if status.blank?
  end
  
  
  class << self
    def import(filename)
      # TODO:
      #   - if record exists, skip (or replace) [arg?]
      
      #require 'csv'
      require 'faster_csv'
      ctr = 0
      admin = User.find_by_username 'admin'
      #CSV.foreach( filename, :col_sep => ",", :headers => true, :return_headers => false) do |row|
      FasterCSV.foreach( filename, :col_sep => ",", :headers => true, :return_headers => false) do |row|
        if ctr == 0
          # show headers
          puts " #{row.headers[0]} | #{row.headers[1]} "
          puts " #{'_'*row.headers[0].size} | #{'_'*row.headers[1].size}"
        end
        puts " #{row[0]} | #{row[1]} "
        posting = Posting.new
        row.each do |head, value|
          next if value.blank?
          case head
          when 'authorid', 'pubtypeid', 'notes', 'cids'
            # skip
            next
          when 'aid'
            posting.id = value
          when 'pubdate'
            posting.created_at = Time.at(value.to_i)
          when 'status'
            posting.status = STATUS[value.to_i]
          when 'author'
            # assume "admin" for all
            posting.user = admin
          when 'categories'
            value.split(',').each do |catname|
              cat = Category.find_or_create_by_name catname
              posting.categories << cat
            end     
          #when 'keywords'
            # keywords: not a real keywords, just a comma delimited string
          when 'url'
            # preserve xar's long url, but rails hiccups on dots in it
            posting.url = value.gsub('.','_')
          else
            posting.send head+'=', value
          end
        end
        if posting.save
          ctr += 1
        else
          puts "  xxx- save failed -xxx"
        end
      end
      return ctr      
    end
  end
  
end
