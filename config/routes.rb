Rails.application.routes.draw do
  # get '/solutions/new/', to: 'solutions#new', as: :solutions_new
  get '/', to: 'solutions#new', as: :solutions_new
end
