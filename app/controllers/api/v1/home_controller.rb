class Api::V1::HomeController < ApplicationController
  def location
    locations = Location.select(:id,:name,:is_deliverable).where(is_deliverable:true).all.order(name: :asc)
    render json:locations
  end
  def login
    user=User.find_by(phone_number:params[:phoneNumber])
    render json:user
  end
  def signup
    user=User.find_by(phone_number:params[:phoneNumber])
    if(user)
      render json:{result:'exists'}
    else
      user=User.create(name:params[:name],phone_number:params[:phoneNumber],email:params[:email],password:params[:password])
      render json:user
    end
  end
end
