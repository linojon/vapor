module PostingsHelper
  def uploads_on_s3(content)
    content.gsub('/var/uploads', 'https://s3.amazonaws.com/vaporbase/uploads').gsub('var/uploads', 'https://s3.amazonaws.com/vaporbase/uploads')
  end
end
