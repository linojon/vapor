class Comment < ActiveRecord::Base
  attr_accessible :title, :body, :author, :status, :anonymous, :posting_id 
  belongs_to :posting
  #default_scope where(:status => 'approved').order("created_at ASC")
  default_scope order("created_at ASC")
  
  validates_presence_of :body
  
  STATUS = %w{ submitted rejected approved frontpage } # xar: 0=submitted, 1=rejected, 2=approved, 3=frontpage
  
  # # simple captcha field must be blank (hide it with css in the form) [idea from http://github.com/plataformatec/mail_form]
  # attr_accessor :captcha 
  # validates :captcha_is_blank
  # def captcha_is_blank
  #   captcha.blank?
  # end
  
  class << self
    def import(filename)
      # TODO:
      #   - if record exists, skip (or replace) [arg?]
      
      #require 'csv'
      require 'faster_csv'
      admin = User.find_by_username 'admin'
      ctr = 0
      
      #CSV.foreach( filename, :col_sep => ",", :headers => true, :return_headers => false) do |row|
      FasterCSV.foreach( filename, :col_sep => ",", :headers => true, :return_headers => false) do |row|
        puts " #{row[1]} "
        
        posting = Posting.find_by_url(row['article_url'].gsub('.','_'))
        comment = posting.comments.new
        row.each do |head, value|
          next if value.blank?
          case head
          when 'title'
            comment.title = value
          when 'datetime'
            comment.created_at = Time.at(value.to_i)
          when 'text'
            comment.body = value
          when 'author'
            comment.author = (value=='linoj') ? 'admin' : value
          when 'status'
            comment.status = STATUS[value.to_i]
          else
            # skip article_id, article_url, author_id, postanon
            next;
          end
        end
        if comment.save
          ctr += 1
        else
          puts "  xxx- save failed -xxx"
        end
      end
      return ctr      
    end
  end
  
end
