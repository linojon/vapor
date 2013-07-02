class CommentsController < ApplicationController
  before_filter :login_required, :only => [:index, :destroy, :destroy_multiple]
  before_filter :find_posting
  before_filter :posting_required, :only => [:create]
  before_filter :find_comment, :only => [:edit, :update, :destroy]
  
  def index
    @comments = Comment.paginate :page => params[:page], :order => "created_at DESC" #and status => anything
  end
  
  # def show
  #   # @posting @comment found in before filter
  # end
  
  # def new
  #   @comment = Comment.new
  # end
  
  def create
    #debugger
    @comment = @posting.comments.new(params[:comment])
    if params[:math] && (params[:math].to_i == 9 || params[:math].downcase=='nine') && @comment.save
    #if simple_captcha_valid? && @comment.save
      Notifier.new_comment(@comment).deliver
      flash[:notice] = "Successfully created comment."
    else
      flash[:notice] = "Error creating comment."
    end
    redirect_to @posting
  end
  
  def edit
    # @posting @comment found in before filter
  end
  
  def update
    if @comment.update_attributes(params[:comment])
      flash[:notice] = "Successfully updated comment."
      # if @posting
      #   redirect_to @posting
      # else
      #   redirect_to comments_path
      # end
      redirect_to :back
    else
      render :action => 'edit'
    end
  end
  
  def destroy
    @comment.destroy
    flash[:notice] = "Deleted comment"
    redirect_to :back
  end
  
  def destroy_multiple
    #debugger
    if ids = params[:comment_ids]
      Comment.destroy(ids)
      flash[:notice] = "Deleted comments #{ids.to_sentence}"
    end
    redirect_to :back
  end
  
  #----------
  private
  
  def find_posting
    @posting = Posting.by_url(params[:posting_id]).first if params[:posting_id]
  end
  
  def find_comment
    #@comment = @posting.comments.find(params[:id])
    @comment = Comment.find(params[:id])
  end
  
  def posting_required
    unless @posting
      flash[:notice] = "Access denied"
      redirect_to root_path
    end
  end
end
