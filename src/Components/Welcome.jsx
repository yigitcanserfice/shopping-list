import React, {useState, useEffect} from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [isRegistering, setisRegistering] = useState(false)
const [registerInfo, setregisterInfo] = useState({
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
})


const navigate = useNavigate()
  
useEffect(() =>{
  auth.onAuthStateChanged((user) =>{
    if(user){
      navigate('/homepage')
    }
  })
},[])

  const handleEmailChange = (e) =>{
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) =>{
    setPassword(e.target.value)
  }
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password).then(()=>{
      navigate('/homepage')
    }).catch((err)=> alert(err.message))
  }

  const handleRegister = () =>{
    if(registerInfo.email !== registerInfo.confirmEmail){
      alert("Please confirm that emails are the same!")
      return
    } else if(registerInfo.password !== registerInfo.confirmPassword){
      alert("Please confirm that passwords are the same!")
      return
    }
    createUserWithEmailAndPassword(auth, registerInfo.email, registerInfo.password).then(()=>{
      navigate('/homepage')
    }).catch((err)=> alert(err.message))
  }

  return (
    <div>
      <h1>Shopping List</h1>
      <div>
      {isRegistering ?(
      <>
      <input type="email" placeholder='Email' value={registerInfo.email} onChange={(e)=> setregisterInfo({...registerInfo, email: e.target.value})} className=' border-2'/>
      <input type="email" placeholder='Confirm Email' value={registerInfo.confirmEmail} onChange={(e)=> setregisterInfo({...registerInfo, confirmEmail: e.target.value})} className=' border-2'/>
      <input type="password" placeholder='Password' value={registerInfo.password} onChange={(e)=> setregisterInfo({...registerInfo, password: e.target.value})} className=' border-2' />
      <input type="password" placeholder='Confirm Password' value={registerInfo.confirmPassword} onChange={(e)=> setregisterInfo({...registerInfo, confirmPassword: e.target.value})} className=' border-2' />
      <button onClick={handleRegister} className='bg-red-500 text-slate-200'>Register</button>
      <button onClick={()=> setisRegistering(false)}>Go Back</button>
      </>)
      :(
      <>
      <input type="email" onChange={handleEmailChange} value={email} className=' border-2'/>
      <input type="password" onChange={handlePasswordChange} value={password} className=' border-2' />
      <button onClick={handleSignIn} className='bg-red-500 text-slate-200'>Sign In</button>
      <button onClick={()=> setisRegistering(true)}>Create an account</button>
      </> )}
      </div>
    </div>
  )
}
