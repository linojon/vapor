Vapor::Application.routes.draw do
  
  # static xar media e.g. "var/uploads/Image/fields.jpg" => /postings/var/uploads...
  #match "/postings/var/uploads/:dir/:file.:ext" => redirect("/uploads/%{dir}/%{file}.%{ext}")
  match "/postings/var/uploads/:dir/:file.:ext" => redirect("https://s3.amazonaws.com/vaporbase/uploads/%{dir}/%{file}.%{ext}")
  match "/var/uploads/:dir/:file.:ext" => redirect("https://s3.amazonaws.com/vaporbase/uploads/%{dir}/%{file}.%{ext}")

  #match 'signup' => 'users#new', :as => :signup
  match 'logout' => 'user_sessions#destroy', :as => :logout
  match 'login' => 'user_sessions#new', :as => :login

  match 'pages/:action', :controller => 'pages'
  match 'about' => 'pages#about', :as => :about
  match 'archives' => 'pages#archives', :as => :archives
  match 'rails-django' => 'pages#rails_django', :as => :rails_django
  match 'postings/rails-django' => redirect('/rails-django')
  
  resources :categories
  resources :postings do
    resources :comments
    collection do
      get 'admin'
    end
  end
  resources :comments do
    collection do
      delete 'destroy_multiple'
    end
  end
  resources :user_sessions
  resources :users
  
  resources :contact_forms, :only => [:new, :create]

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => "welcome#index"
  root :to => "postings#index"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
