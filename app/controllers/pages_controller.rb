class PagesController < ApplicationController
  def about
  end
  def archives
  end
  def rails_django
  end
  
  def test
    img = Magick::Image.read("#{RAILS_ROOT}/public/images/rails.png").first.scale(5).to_blob
    render :text=>img, :status=>200,:content_type=>'image/gif'
  end
end