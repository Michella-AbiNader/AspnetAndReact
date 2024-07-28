/* eslint-disable no-mixed-spaces-and-tabs */
import '../Styles/Login.css'

function Login() {
	//gather the input and send it to the database
	//javascript function to check password strength
  return (
	<div className="main">
			  <input type="checkbox" id="chk" aria-hidden="true"/>
				  <div className="signup">
					  <form>
						  <label htmlFor="chk" aria-hidden="true">Sign up</label>
						  <input type="text" name="txt" placeholder="User name" required />
				  <input type="text" name="txt" placeholder="First name" required />
				  <input type="text" name="txt" placeholder="Last name" required />
						  <input type="password" name="pswd" placeholder="Password" required />
						  <button className="singupBtn">Sign up</button>
					  </form>
				  </div>
				  <div className="login">
					  <form>
						  <label htmlFor="chk" aria-hidden="true">Login</label>
					  <input type="text" name="txt" placeholder="User name" required />
						  <input type="password" name="pswd" placeholder="Password" required />
						<button className="singupBtn">Login</button>
					  </form>
		  </div>	
		  <div className="screen__background">
			  <span className="screen__background__shape screen__background__shape4"></span>
			  <span className="screen__background__shape screen__background__shape3"></span>
			  <span className="screen__background__shape screen__background__shape2"></span>
			  <span className="screen__background__shape screen__background__shape5"></span>
			  <span className="screen__background__shape screen__background__shape6"></span>
			  <span className="screen__background__shape screen__background__shape7"></span>
		  </div>	
		 	
	</div>

  );
}

export default Login;