module ApplicationHelper
  def body_id(name)
    content_for(:body_id){name}
  end
  
  def sanitized_markdown(content)
    RDiscount.new(h content).to_html.html_safe
  end
  
  def pluralize_with_delimiter(count, singular, plural = nil)
    # taken from original pluralize helper
    "#{number_with_delimiter(count) || 0} " + ((count == 1 || count =~ /^1(\.0+)?$/) ? singular : (plural || singular.pluralize))
  end
end
