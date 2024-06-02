import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { loginAPI, registerAPI } from '../Services/allApis';
import '../assets/styles/auth.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const location = useNavigate()
  const [registerSuccessfull, setRegister] = useState(false)
  const [isLoginForm, setLoginForm] = useState(true);


  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState('');

  const toggleForm = () => {
    setLoginForm(!isLoginForm);
    setError('');
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (async (e) => {
    e.preventDefault();

    try {

      if (isLoginForm) {

        if (!userData.email || !userData.password) {
          setError('Please fill in all fields.');
          return;
        }

        const result = await loginAPI(userData)
        if (result.status == 200) {
          sessionStorage.setItem('existingUser', JSON.stringify(result.data.user))
          sessionStorage.setItem('token', result.data.token)
          location('/UserHome')
        }
        else (
          alert("Invalid Login")
        )
      }

      else {

        if (!userData.email || !userData.password || !userData.confirmPassword || !userData.userName) {
          setError('Please fill in all fields.');
          return;
        }

        if (userData.password !== userData.confirmPassword) {
          setError('Passwords do not match.');
          return;
        }

        const result = await registerAPI(userData)
        if (result.status == 200) {
          setRegister(true)
        }
        else (

          alert("Server Error")
        )
      }
    } catch (error) {
      setError('Operation failed. Please try again.');
      console.error(error)
    }
  })

  return (
    <div className='container-fluid'>
     
      <div className='wrapper'>
      {registerSuccessfull && <Alert variant="success">"registeration Successfull"</Alert>}

        <div className="title-text">
          <div>{isLoginForm ? 'Login' : 'Signup'}</div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input type="radio" name="slide" className='btn-check' id="login" checked={isLoginForm} onChange={toggleForm} />
            <label htmlFor="login" className={isLoginForm ? "slide checked" : "slide"}>Login</label>
            <input type="radio" name="slide" className='btn-check' id="signup" checked={!isLoginForm} onChange={toggleForm} />
            <label htmlFor="signup" className={!isLoginForm ? "slide checked" : "slide"}>Signup</label>
          </div>
          <div className="form-div">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <div className="field mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email Address"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {!isLoginForm && (
                <div className="field mb-3">
                  <input
                    type="text"
                    name="userName"
                    className="form-control"
                    placeholder="Username"
                    value={userData.userName}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="field">
                <input
                  type="password"
                  name='password'
                  className="form-control"
                  placeholder="Password"
                  value={userData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {!isLoginForm && (
                <div className="field mt-3">
                  <input
                    type="password"
                    name='confirmPassword'
                    className="form-control"
                    placeholder="Confirm password"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              {isLoginForm && (
                <div className="pass-link mt-1">
                  <a href="#">Forgot password?</a>
                </div>
              )}
              <div className="mb-3 mt-3">
                <Button type="submit" className="btn submit-btn">{isLoginForm ? "Login" : "Signup"}</Button>
              </div>
              <div className="signup-link">
                {isLoginForm ? 'Not a member?' : 'Already a member?'}
                <a href="#" onClick={toggleForm}>{isLoginForm ? 'Signup now' : 'Login now'}</a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
