import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


function Update() {

  const [data ,setData] = useState([])

  const {_id} = useParams();
  console.log(_id);

  
  const [inpval, setInpval] = useState({
    fname: setData.fname,
    email: setData.email,
    
    phonenumber:setData.phonenumber,
    password:setData.password,
   
});


const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    console.log("update",data);

    setData(() => {
        return {
            ...inpval,
            [name]: value
        }
    })
};
function handleupdate(e){
    e.prevantDefault()
    axios.put('https://crud-backend-krbq.onrender.com/crud'+ _id)
      .then(res =>setData(res.data.data))
      .catch(err =>console.log(err))

}

  useEffect(()=>{
      axios.get('https://crud-backend-krbq.onrender.com/crud/getUser/'+ _id)
      .then(res =>setData(res.data.data))
      .catch(err =>console.log(err))

  },[])
  return (
    <div>
        <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Update user</h1>
                        <p style={{ textAlign: "center" }}></p>
                    </div>

                    <form onSubmit={handleupdate}>
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" onChange={setVal}  name="fname" id="fname" placeholder='Enter Your Name' value={data.fname ||""}/>
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email"  name="email" id="email" onChange={setVal} placeholder='Enter Your Email Address'value={data.email ||""}/>
                        </div>
                      

                        <div className="form_input">
                            <label htmlFor="phonenumber">Phone Number</label>
                            <input type="number" onChange={setVal} value={data.phonenumber ||""} name="phonenumber" id="phonenumber" placeholder='Enter Your phone Number' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <input type="password" onChange={setVal} value={data.password} name="password" id="password" placeholder='Enter Your password' />
                        </div>

                       

                        <button className='btn'>Update user</button>
                    </form>
                    <ToastContainer />
                </div>
            </section>
    </div>
  )
}

export default Update