namespace :vapor do
  desc "Import postings from csv"
  task :import => :environment do
    # destroy_all postings (and comments) first?
    count = Posting.import 'postings.csv'
    puts "Imported #{count} postings"
  end
  desc "Import comments from csv"
  task :comments => :environment do  
    count = Comment.import 'comments.csv'
    puts "Imported #{count} comments"
  end

end
