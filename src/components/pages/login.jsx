import React from 'react'
import Input from '../../utils/input'
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <>
    <div className='h-screen flex items-center justify-center'>
      <div className='sm:w-[400px] w-[100%] mx-auto bg-white p-6 rounded-lg shadow-md'>
        <h1 className='text-center text-2xl font-bold mb-2'>Login</h1>
        <p className='text-center mb-6'>Enter your details below to login</p>
        <Input
          placeholder={"Email"}
          labels={"Email"}
          marginBottom={"20px"}
          value={email}
          marginTop={"0px"}
          onChange={(val) => setEmail(val)}
        />
        <Input
          placeholder={"Password"}
          labels={"Password"}
          marginBottom={"20px"}
          value={password}
          onChange={(val) => setPassword(val)}
          marginTop={"0px"}
        />
        <Link to={'/dashboard'}>
        <button className='primary_btn'>Login</button>
        </Link>
      </div>
    </div>


    </>
  )
}

export default Login
