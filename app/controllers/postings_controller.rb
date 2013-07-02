class PostingsController < ApplicationController
  # uses_tiny_mce :only => [:new, :edit],
  #               :options => {
  #                              :theme => 'advanced',
  #                              :theme_advanced_resizing => true,
  #                              :theme_advanced_resize_horizontal => true #,
  #                              #:plugins => %w{ table fullscreen }
  #                            }
  
  
  before_filter :login_required, :except => [:index, :show]
  before_filter :find_posting, :only => [:show, :edit, :update, :destroy]
  
  def admin
    @postings = Posting.paginate :page => params[:page], :order => 'created_at DESC' 
  end
  
  def index
    if (@category = params[:category]) && (catobj = Category.find_by_name(@category))
      @postings = catobj.postings.published.paginate :page => params[:page], :order => 'created_at DESC'
    elsif (@search = params[:search])
      @postings = Posting.published.where("body LIKE ?", "%#{@search}%").paginate :page => params[:page], :order => 'created_at DESC' 
    else
      @postings = Posting.published.recent.paginate :page => params[:page], :order => 'created_at DESC' 
    end   
  end
  
  def show
    # @posting found with before filters
    @posting.increment!(:counter) unless logged_in?
  end
  
  def new
    @posting = Posting.new
  end
  
  def create
    @posting = Posting.new(params[:posting])
    if @posting.save
      flash[:notice] = "Successfully created posting."
      redirect_to @posting
    else
      render :action => 'new'
    end
  end
  
  def edit
    # @posting found with before filters
  end
  
  def update
    # @posting found with before filters
    if @posting.update_attributes(params[:posting])
      flash[:notice] = "Successfully updated posting."
      redirect_to @posting
    else
      render :action => 'edit'
    end
  end
  
  def destroy
    # @posting found with before filters
    @posting.destroy
    flash[:notice] = "Successfully destroyed posting."
    redirect_to postings_url
  end
  
  def find_posting
    unless @posting = Posting.by_url(params[:id]).first
      raise ActiveRecord::RecordNotFound
    end
  end
end
