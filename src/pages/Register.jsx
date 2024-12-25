import React, { useState, useEffect } from 'react';
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        contact_no: '',
        status: 'accepted',
        email: '',
        dob: '',
        role: '', // Initially empty, will be populated by the user selection
    });
    const [roles, setRoles] = useState([]); // State to hold roles fetched from the backend

    useEffect(() => {
        // Fetch roles from the backend
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://localhost:9091/role/get');
                setRoles(response.data); // Assuming the response is an array of roles
            } catch (error) {
                console.error('Error fetching roles:', error);
                alert('Failed to fetch roles');
            }
        };

        fetchRoles();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRoleChange = (e) => {
        setFormData({
            ...formData,
            role: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('set ==>',roles);
        

        // Build role array based on the selected role
        let roleArray =[];
            if(formData.role === 'Seller'){
               roleArray =  roles.filter(el =>{
                 return   el.name == "Seller" || el.name == "Buyer"
                })
             }
             else{ 
                roleArray =  roles.filter(el =>{
                    return   el.name == "Buyer"
                   })
            }
            console.log(roleArray);
            

        // Final payload to send    
        const payload = {
            ...formData,
            role: roleArray,
        };

        try {
            console.log(payload);
            const response = await axios.post('http://localhost:9091/user/add', payload);
            console.log('Sign up successful:', response.data);

            // Reset form data after successful submission
            setFormData({
                firstName: '',
                lastName: '',
                password: '',
                contact_no: '',
                status: 'accepted',
                email: '',
                dob: '',
                role: '',
            });
            alert('Sign Up Successful');
        } catch (error) {
            console.error('Error during sign-up:', error);
            alert('Sign Up Failed');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="form my-3">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Enter Your First Name"
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Enter Your Last Name"
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="contact_no">Contact Number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="contactNo"
                                    name="contact_no"
                                    value={formData.contact_no}
                                    onChange={handleInputChange}
                                    placeholder="Enter Your Contact Number"
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="dob">Date of Birth</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dob"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="role">Role</label>
                                <select
                                    className="form-control"
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleRoleChange}
                                    required
                                >
                                    <option value="" disabled>
                                        Select a Role
                                    </option>
                                    {roles.map((role, index) => (
                                        <option key={index} value={role.name}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="my-3">
                                <p>
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-decoration-underline text-info">
                                        Login
                                    </Link>
                                </p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;
