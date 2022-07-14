import { useState } from "react"

const Login = () => {
  const [username,setUsername] = useState("")
  const [password,setpassword] = useState("")

  const handleClick = ()=> {
    e.preventDefault();
  }
  return(
    <div>
      <input type="text" placeholder="username" onChange={e=>setUsername(e.target.value)}/>
      <input type="password" placeholder="password" onChange={e=>setUsername(e.target.value)}/>
      <button onClick={handleClick}>Login</button>
    </div>
  )
}

export default Login