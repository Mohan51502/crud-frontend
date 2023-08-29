import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../components/mix.css"
import { Link } from 'react-router-dom';

const Adduser = () => {


    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        phonenumber: "",
        password: "",
        userid: "",
    });

const userid = localStorage.getItem("_id");
console.log(userid);


    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const addQuerydata = async (e) => {
        e.preventDefault();

        const { fname, email,phonenumber,password } = inpval;

        if (fname === "") {
            toast.warning("Name is required!", {
                position: "top-center"
            });
        } else if (email === "") {
            toast.error("Email is required!", {
                position: "top-center"
            });
        } 
        else if (phonenumber === "") {
            toast.error("Phone Number is required!", {
                position: "top-center"
            });
        } 
        else if (phonenumber.length > 10) {
            toast.error("phone Number must be 10 char!", {
                position: "top-center"
            });
        } else if (phonenumber.length < 10) {
            toast.error("phone Number must be 10 char!", {
                position: "top-center"
            });
        }
        else if (!email.includes("@")) {
            toast.warning("includes @ in your Email!", {
                position: "top-center"
            });
        } 
        else if (!email.includes(".")) {
            toast.warning("includes . in your Email!", {
                position: "top-center"
            });
        }else if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        }
         else {
            // console.log("user registration succesfully done");


            const data = await fetch("https://crud-backend-krbq.onrender.com/crud/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  fname,email,phonenumber,password,userid
                })
            });
           // console.log(data)


            const res = await data.json();
            // console.log(res.status);

            if (res.status === 200) {
                toast.success("User Added Successfully  😃!", {
                    position: "top-center"
                });
                setInpval({ ...inpval, fname: "", email: "",phonenumber: "",password:"" ,userid:""});
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Add User</h1>
                        <p style={{ textAlign: "center" }}></p>
                    </div>

                    <form>
                        
                    <div className="form_input">
                            <label htmlFor="Name">Name</label>
                            <input type="text" onChange={setVal} value={inpval.fname} name="fname" id="fname" placeholder='Enter Name' />
                        </div>
     <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input  type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter  Email'  />
                        </div>
                        <div className="form_input">
                            <label htmlFor="phonenumber">Phone Number</label>
                            <input  type="Number" onChange={setVal} value={inpval.phonenumber} name="phonenumber" id="phonenumber"  placeholder='Enter  Phone Number'/>
                        </div>
                                            

                        <div className="form_input">
                            <label htmlFor="Password">Password</label>
                            <input type="password" onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter Password' />
                        </div>
                        <Link to={`/dash`} className='btn  btn-info me-2' style={{color:"white"}}>Back</Link>
                        <button className='btn' onClick={addQuerydata}>Create</button>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Adduser;