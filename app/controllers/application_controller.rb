class ApplicationController < ActionController::Base
  include Authentication
  protect_from_forgery 
  include SimpleCaptcha::ControllerHelpers
  
end
