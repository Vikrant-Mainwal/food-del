import React, { useEffect, useState } from 'react'
import {assets} from '../../assets/assets'
import './Add.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = () => {

  const url = "http://localhost:4000"
  const [image, setImage]= useState(false)

  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })

  useEffect(()=>{
console.log(data)
  },[data])

  const onChangeHandler =(event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler =async(event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("category",data.category)
    formData.append("price",data.price)
    formData.append("image",image);

  

    const reponse = await axios.post(`${url}/api/food/add`,formData)

    if(reponse.data.success){
      setData({ name:"",
        description:"",
        price:"",
        category:"Salad"})
        setImage(false)
        toast.success(reponse.data.message)
    }else{
      toast.error(reponse.data.error)
    }
  }


  return (
    <div className="add">
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-item-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image? URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={ (e)=> setImage(e.target.files[0])} type="file"  id="image" hidden required />
        </div>
        <div className="add-item-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} type="text"
          value={data.name} name="name" placeholder='type here...'/>
        </div>
        <div className="add-item-desc flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler}  
          value={data.description}
          name="description"
          rows="6" placeholder='' required ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p> Product Category</p>
            <select onChange={onChangeHandler} value={data.category} name="category" >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Deserts">Deserts</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" id="" />
          </div>
         
        </div>
        <button type='submit' className='add-btn'>
          ADD
        </button>
      </form>
    </div>
  )
}

export default Add