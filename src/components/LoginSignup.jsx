import {useState} from "react"
import {useUser} from "../context/UserContext"


function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const {user, signup, login, logout} = useUser()

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const authFunction = isLogin ? login : signup
    authFunction(username)
    setUsername("")
  }

  return (
    <>
      <div className="toggleContainer">
        <button  onClick={() => setIsLogin(true)}>Login</button>
        <button  onClick={() => setIsLogin(false)}>
            Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button className="btn" type="submit">
            {isLogin ? "Login" : "Signup"}
        </button>
      </form>

      {user && <button onClick={logout}>Logout</button>}
      
    </>
  );
}

export default LoginSignup;
