class Notifier < ActionMailer::Base
  #default :from => "admin@vaporbase.com" # not using but would be for sending emails to users (for example)
  default_url_options[:host] = "vaporbase.com" # for when foo_url used in view, needs to know the domain
  
  def contact_form(sender)
    @sender = sender
    mail( :to => sender.to,
          :from => sender.from, #this doesnt seem to work, gets the "name" part but email replaced by my gmail account email
          :subject => "Vaporbase contact form"
    )
  end
  
  def new_comment( comment )
    @comment = comment
    mail( :to => "Jonathan Linowes <jonathan@linowes.com>",
          :from => "jonathan@linowes.com", #this doesnt seem to work, gets the "name" part but email replaced by my gmail account email
          :subject => "Vaporbase comment"
    )
    
  end
end
