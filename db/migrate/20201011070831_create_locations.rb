class CreateLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :locations do |t|
      t.string :name,null:false
      t.boolean :is_deliverable,default:true

      t.timestamps
    end
  end
end
