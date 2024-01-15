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

// Kullanıcı giriş yapmışsa /homepage e yönlendir.
  
useEffect(() =>{
  auth.onAuthStateChanged((user) =>{
    if(user){
      navigate('/homepage')
    }
  })
},[])


  // Inputları çek.
  const handleEmailChange = (e) =>{
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) =>{
    setPassword(e.target.value)
  }

  // Gerekli kontrolleri yaptıktan sonra giriş yap.
  const handleSignIn = () => {
    if(!email){
      alert("Please enter a valid email!")
      return
    } else if(!password || password.length < 6){
      alert("Please enter a valid password! (at least 6-digits password)")
      return
    }
    
    signInWithEmailAndPassword(auth, email, password).then(()=>{
      navigate('/homepage')
    }).catch((err)=> alert(err.message))
  }


  // Gerekli kontrolleri yaptıktan sonra kayıt ol.
  const handleRegister = () =>{
    if(registerInfo.email !== registerInfo.confirmEmail){
      alert("Please confirm that emails are the same!")
      return
    } else if(registerInfo.password !== registerInfo.confirmPassword){
      alert("Please confirm that passwords are the same!")
      return
    } else if(registerInfo.password.length < 6){
      alert("Please enter a valid password! (at least 6-digits password)")
    }
    createUserWithEmailAndPassword(auth, registerInfo.email, registerInfo.password).then(()=>{
      navigate('/homepage')
    }).catch((err)=> alert(err.message))
  }
  
  // Giriş ekranı ve kayıt ol ekranlarının tasarımı ve yönlendirmeleri
  return (
    <div className='h-screen w-screen p-4 bg-gradient-to-r from-[#7BD3EA] to-[#A1EEBD]'>
      <div className='bg-slate-100 w-full m-auto max-w-[500px] rounded-md shadow-xl p-5 flex flex-col'>
     
      <h1 className='font-bold text-3xl text-center text-gray-600 p-2 mb-5'>Shopping List</h1>
      <div>
      
      {isRegistering ?(
      <>
      <div className='flex flex-col gap-2'>
      <input type="email" placeholder='Email' value={registerInfo.email} onChange={(e)=> setregisterInfo({...registerInfo, email: e.target.value})} className=' border-2 p-1'/>
      <input type="email" placeholder='Confirm Email' value={registerInfo.confirmEmail} onChange={(e)=> setregisterInfo({...registerInfo, confirmEmail: e.target.value})} className=' border-2 p-1'/>
      <input type="password" placeholder='Password' value={registerInfo.password} onChange={(e)=> setregisterInfo({...registerInfo, password: e.target.value})} className=' border-2 p-1' />
      <input type="password" placeholder='Confirm Password' value={registerInfo.confirmPassword} onChange={(e)=> setregisterInfo({...registerInfo, confirmPassword: e.target.value})} className=' border-2 p-1' />
      
      <button onClick={handleRegister} className='bg-blue-500 py-1.5 font-semibold text-slate-200'>Register</button>
      <button onClick={()=> setisRegistering(false)} className='bg-red-500 py-1.5 font-semibold text-slate-200'>Go Back</button>
      </div>
      </>)
      :(
      <>
      <div className='flex flex-col gap-2'> 
      <input type="email" placeholder='Email' onChange={handleEmailChange} value={email} className=' border-2 p-1'/>
      <input type="password" placeholder='Password' onChange={handlePasswordChange} value={password} className=' border-2 p-1' />
      <button onClick={handleSignIn} className='bg-blue-500 py-1.5 text-slate-200 font-semibold'>Sign In</button>
      <button onClick={()=> setisRegistering(true)} className='bg-gray-500 py-1.5 text-slate-200 font-semibold'>Create an account</button>
      </div>
      </> )}
      </div>
      </div>
    </div>
  )
}
