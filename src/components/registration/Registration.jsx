import axios from 'axios';
import React, { useState } from 'react'


const Registration = () => {
    const [fristName, setFristName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setemail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [confromPassword, setConfromPassword] = useState();
    const [error, setError] = useState()


    const handleClick = async () => {
        if (fristName && lastName && email && phone && password == confromPassword && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(password)) {

            const data = await axios.post('http://localhost:8000/api/v1/authantication/registration', {
                firstName: fristName,
                lastName: lastName,
                email: email,
                phone: phone,
                password: password,
            });
            setError(data.data);
        };
    };




    return (
        <div className='alldiv'>
            <div>
                {
                    error && <p>{error}</p>
                }
            </div>
            <div>
                <h2 style={{ fontSize: "16px" }}>Frist Name</h2>
                <input onChange={(e) => setFristName(e.target.value)} className='input' type="frist name" placeholder='Enter your Frist Name' />
            </div>
            <div>
                <h2 style={{ fontSize: "16px" }}>Last Name</h2>
                <input onChange={(e) => setLastName(e.target.value)} className='input' type="last name" placeholder='Enter your last Name' />
            </div>
            <div>
                <h2 style={{ fontSize: "16px" }}>Email</h2>
                <input onChange={(e) => setemail(e.target.value)} className='input' type="email" placeholder='Enter Your Email Address' />
            </div>
            <div>
                <h2 style={{ fontSize: "16px" }}>Phone</h2>
                <input onChange={(e) => setPhone(e.target.value)} className='input' type="phone" placeholder='Enter Your Email phone' />
            </div>
            <div>
                <h2 style={{ fontSize: "16px" }}>password</h2>
                <input onChange={(e) => setPassword(e.target.value)} className='input' type="text" placeholder='' />
            </div>
            <div>
                <h2 style={{ fontSize: "16px" }}>Confrom password</h2>
                <input onChange={(e) => setConfromPassword(e.target.value)} className='input' type="text" placeholder='Enter Your Email phone confrom password' />
            </div>
            <div>
                <button onClick={handleClick}>Registration</button>
            </div>

        </div>
    )
}

export default Registration