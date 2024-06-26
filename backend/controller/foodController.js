import { log } from "console";
import foodModel from "../model/foodModel.js";
import fs from "fs";


// add food
const addFood = async (req, res) => {

  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "food add" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "food not add" });
  }
};

// get food 
const getFood = async(req,res)=>{
try {
   let foods = await foodModel.find({});
   res.json({sucess:true,data:foods, message:"succesfully gettind food list"})
} catch (error) {
    console.log(error)
    res.json({success:false, message:"Error"})
}
}

// remove food 

const removeFood = async (req, res) => {

  try {
    console.log('Request body:', req.body);
  console.log('Food ID to remove:', req.body.id);

    const food = await foodModel.findById(req.body.id);
    console.log('Food found:', food);

    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }

    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) {
        console.log(`Error deleting image file: ${err.message}`);
      }
    });

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food removed" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};




export { addFood, getFood, removeFood};
