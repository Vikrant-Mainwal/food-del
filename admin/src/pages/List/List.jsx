import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.sucess) {
      setList(response.data.data);
    } else {
      toast.error("error");
    }
  };

  const removeFood = async (foodId) =>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    }
    else{
      toast.error('error')
    }
 }

  useEffect(() => {
    fetchList();
  }, []);
  

 

  return (
    <div className="list add flex-col">
      <p className="list-title">All food list</p>
      <div className="list-table-format title">
        <b>Image</b>
        <b>name</b>
        <b>category</b>
        <b>price</b>
        <b>action</b>
      </div>
  
      <div>
        {list.map((item, index) => (
          
            <div key={index} className="list-table-format item">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className="cross">X</p>
            </div>
          
        ))}
      </div>
    </div>
  );
};

export default List;
