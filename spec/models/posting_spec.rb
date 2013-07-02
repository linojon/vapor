require File.dirname(__FILE__) + '/../spec_helper'

describe Posting do
  it "should be valid" do
    Posting.new.should be_valid
  end
end
