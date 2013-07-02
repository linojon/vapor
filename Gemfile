source 'https://rubygems.org'
ruby "2.0.0"

gem 'rails', '3.2.13'

gem 'sass-rails', '~> 3.2.3'
gem 'compass-rails'
gem 'compass-colors'
gem 'compass-blueprint'
gem 'sassy-buttons'
group :assets do
  gem 'uglifier', '>= 1.0.3'
end

gem 'jquery-rails'
gem 'haml-rails'
#gem 'compass', ">= 0.10.5"
#gem 'compass-susy-plugin'
#gem 'formtastic', '~> 1.1.0'
gem 'simple_form'
#gem 'tiny_mce'
gem 'tinymce-rails'
#gem 'authlogic'
gem 'authlogic' #, :git => 'git://github.com/odorcicd/authlogic.git', :branch => 'rails3'
#gem 'inherited_resources'
gem "will_paginate" #, "~> 3.0.pre2"
# long urls:
gem 'stringex'
# markdown for comments: eg RDiscount.new(h content).to_html
gem 'rdiscount'
gem 'paperclip'
gem 'fastercsv'

gem 'simple_captcha' #, :git => 'git://github.com/galetahub/simple-captcha.git'
#gem 'rmagick' #, "2.12.0", :require => 'RMagick' 
gem "rmagick", :require => 'RMagick'  #, "2.12.2" 

gem 'rails_autolink'

# Bundle gems for the local environment. Make sure to
# put test-only gems in this group so their generators
# and rake tasks are available in development mode:
# group :development, :test do
#   gem 'webrat'
# end

group :development, :test do
  gem 'sqlite3'
  gem 'debugger'
  gem 'better_errors'
  gem 'binding_of_caller'

  gem 'nifty-generators'
  
  gem 'capybara'
  gem 'database_cleaner'
  gem 'cucumber-rails', :require => false
  gem 'cucumber'
  #gem 'rspec-rails'
  gem 'spork'
  gem 'launchy'    # So you can do Then show me the page
  
  gem 'rspec-rails'
end

group :production do
  gem "unicorn"
  gem "pg"
end
