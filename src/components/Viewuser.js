import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Viewusers() {


    
    const [data ,setData] = useState([])

    const id = localStorage.getItem("_id")

    const cruddata = async =>{
        const resp =  axios.get(`https://crud-backend-krbq.onrender.com/crud/getUsercrudOnly/`+id)
        .then(res =>setData(res.data.data))
        .catch(err =>console.log(err))
    }
    useEffect(()=>{
       cruddata()

    },[])

    const navigate = useNavigate();

    const handledelete  = (_id) =>{
        const confirm = window.confirm("Would you like to Delete?");
        if(confirm){
            axios.delete(`https://crud-backend-krbq.onrender.com/crud/` +_id)
            .then(res => {
                navigate(`/dash`);
                cruddata();
              
            }).catch(err => console.log(err));
        }
    }


  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-150 box-size'>
        <h1>List of Users</h1>
        <div className='w-90 rounded bg-white border shadow p-4 border-size'>


        <div className='d-flex justify-content-end'>

            <Link to="/adduser" className='btn btn-success'>Add +</Link>


        </div>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Action</th>


                </tr>
            </thead>
            <tbody>
                {
                    data.map((d, i) =>(
                        <tr key={i}>
                            <td>{d.fname}</td>
                            <td>{d.email}</td>
                            <td>{d.phonenumber}</td>

                            <td>
                                <Link to={`/read/${d._id}`} className='btn btn-sm btn-info me-2'>Read</Link>

                                <Link to={`/edit/${d._id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                                <button  onClick={ e => handledelete(d._id)} className='btn btn-sm btn-danger'>Delete</button>
                            </td>



                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
        </div>
        
  )
}