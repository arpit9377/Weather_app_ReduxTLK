import React from 'react';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
   
    navigate('/Main');
  };

  return (
    <>
      <h1 className="text-center mt-4">Log In</h1>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' />
        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' />

        

        <MDBBtn className="mb-4" onClick={handleSignIn} style={{ outline: 'none' }}>
          Sign in
        </MDBBtn>

        <div className="text-center">
          <p>
            Not a member? <a href="/">Register</a>
          </p>
        </div>
      </MDBContainer>
    </>
  );
}

export default Login;
