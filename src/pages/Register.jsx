import { useState } from "react"

export default function Register() {

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

   
  // handling the input values
  const handleInput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    })
  }

  //handling the form submission

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  }

  return (
    <div>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img src="../assets/images/register.png" alt="registration" width="500" height="500" />
              </div>

              {/* let tackle registration form */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input 
                      type="text"
                      name="username" 
                      placeholder="username" 
                      id="username" 
                      required 
                      autoComplete="off" 
                      value={user.username}
                      onChange={handleInput}
                    />
                  </div>

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
                    <label htmlFor="phone">phone</label>
                    <input 
                      type="number"
                      name="phone" 
                      placeholder="phone" 
                      id="phone" 
                      required 
                      autoComplete="off" 
                      value={user.phone}
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

                  <button type="submit" className="btn btn-submit">Register Now</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  )
}
