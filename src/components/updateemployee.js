import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';


function EditEmployee() {
	const [data, setData] = useState({
		fname: '',
		email: '',
		phonenumber: '',
		password: '',
	})
	const navigate = useNavigate()
	
	const {_id} = useParams();

	useEffect(()=> {
		axios.get('https://crud-backend-krbq.onrender.com/crud/getUser/'+_id)
		.then(res => {
			setData({...data, fname: res.data.data.fname,
				email: res.data.data.email,
				phonenumber: res.data.data.phonenumber,
				password: res.data.data.password
			})
		})
		.catch(err =>console.log(err));
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.put('https://crud-backend-krbq.onrender.com/crud/'+_id, data)
		.then(res => {
			// if(res.data.Status === "Success") {
				navigate('/dash')
		//	}
		})
		.catch(err => console.log(err));
	}
  return (
    <div className='d-flex flex-column align-items-center pt-4'>
			<h2>Update User</h2>
			<form class="row g-3 w-50" onSubmit={handleSubmit}>
			<div class="col-12">
					<label for="inputName" class="form-label">Name:</label>
					<input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setData({...data, fname: e.target.value})} value={data.fname}/>
				</div>
				<div class="col-12">
					<label for="inputEmail4" class="form-label">Email:</label>
					<input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})} value={data.email}/>
				</div>
				<div class="col-12">
					<label for="inputSalary" class="form-label">Phone Number:</label>
					<input type="number" class="form-control" id="inputSalary" placeholder="Enter Number" autoComplete='off'
					onChange={e => setData({...data, phonenumber: e.target.value})} value={data.phonenumber}/>
				</div>
				<div class="col-12">
					<label for="inputAddress" class="form-label">Password:</label>
					<input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
					onChange={e => setData({...data, password: e.target.value})} value={data.password}/>
				
                </div>
				<div class="col-12">
					<button type="submit" class="btn btn-primary ms-3">Update</button>

				</div>

			</form>

		</div>
  )
}

export default EditEmployee