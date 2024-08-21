import { useState } from "react"
import loginimage from "../assets/images/login.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
export default function Login() {
  const {API} = useAuth();
  console.log(API);
  const URL = `${API}/api/auth/login`;
  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,

    })
  }
  const handleSubmit = async (e)=> {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(user),
      })
      const res_data = await response.json();
      if(response.ok){
        // stored the token in localhost
        storeTokenInLS(res_data.token);
        toast.success("Login Successful")
        setUser({email: "", password: ""});
        navigate("/");
      }else{
        toast.error(res_data.extraDetails ? res_data.extraDetails: res_data.message);

      }
    } catch (error) {
      toast.error("Internal Error!", error);
    }
  }
  return (
    <div>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img src={loginimage} alt="login" width="500" height="500" />
              </div>

              {/* let tackle registration form */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login Form</h1>
                <br />
                <form onSubmit={handleSubmit}>

                  <div>
                    <label htmlFor="email">email</label>
                    <input 
                      type="email"
                      name="email" 
                      placeholder="enter your email" 
                      id="email" 
                      required 
                      autoComplete="off" 
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input 
                      type="password"
                      name="password" 
                      placeholder="password" 
                      id="password" 
                      required 
                      autoComplete="off" 
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <br />

                  <button type="submit" className="btn btn-submit">Login</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  )
}
