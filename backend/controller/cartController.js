import userModel from "../model/userModel.js";

// add to cart

const addCart = async (req, res) => {
   try {
    let userData = await userModel.findById(req.body.userId)

    let cartData = await userData.cartData;

    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId]= 1
    }else{
        cartData[req.body.itemId] += 1
    }
     
    await userModel.findByIdAndUpdate(req.body.userId,{cartData})
    res.json({ success: true, message: "Successfully added to cart" });
   } catch (error) {
    console.log(error);
       res.json({ success: false, message: "Error adding to cart" });
   }
  };




  

// add to cart
const removeCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId)
    let cartData = await userData.cartData

    if (cartData[req.body.itemId]>0) {
        cartData[req.body.itemId] -=1        
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData})
    res.json({success:true,message:"Successfully remove the item from the cart"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"error"})
  }  
};

// add to cart
const getCart = async (req, res) =>{
    try{
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData
    res.json({sucess:true,cartData, message:"succesfully gettind cart list"})
 } catch (error) {
     console.log(error)
     res.json({success:false, message:"Error"})
 }
};

export { addCart, removeCart, getCart };
