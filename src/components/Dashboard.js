import React, { useContext, useEffect ,useState} from 'react'
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate} from "react-router-dom";
import Viewusers from './Viewuser';



//import { Button } from '@mui/material';

const Dashboard = () => {

    const { logindata, setLoginData } = useContext(LoginContext);

    const [data, setData] = useState(false);
    console.log(logindata);


    const history = useNavigate();

    const StudentDashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("https://crud-backend-krbq.onrender.com/user/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();

        if (data.status === 200) {
            setLoginData(data)
            history("/dash");        } else {
           // console.log("user verify");
           history("*");
        }
    }


    useEffect(() => {
        setTimeout(() => {

            StudentDashboardValid();
            setData(true)
        },500)

    }, [])


    //const addUserdata = async (e) => {

        // const res = await fetch(`http://localhost:5000/user/getAllUser`, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // });

        // const data = await res.json()

        // if (data.status == 201) {
        //     console.log("user valid")
        // } else {
        //     console.log(data);
        // }
        
    //}
    //var value = logindata.ValidUserOne.role
    //console.log(value)

    return (
        <>
            {
                data ? <div style={{display:""}} className='studentdashboard'>
                    

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} className='studentdashboardcenter'>
                   
                    <Viewusers/>

                    </div>
                    

                    
   


{/* <p> <NavLink to="/adduser" className='btn btn-success'>Create User</NavLink> </p> */}
<br/>

{/* <p> <NavLink to="/viewusers">View Users</NavLink> </p> */}


{/* <button className='btn' onClick={addUserdata}>view user</button> */}


{/* <p> <div className='d-flex justify-content-end'>
    <Link to={`/viewusers`} disabled={{} } className='btn btn-primary'>Add User</Link></div> </p> */}





                </div> 
                
                
                
                : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            }

        </>

    )
}

export default Dashboard