/* eslint-disable no-mixed-spaces-and-tabs */
import '../Styles/Login.css'
import { loginUser } from '../Services/LoginRegister'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../Components/UserContext'

//To change color based on theme_color


function Login() {
	//javascript function to check password strength
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [response, setresponse] = useState({})

	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		var res;
		e.preventDefault();
		try {
			res = await loginUser(username, password);
			if (res.type !== "") {
				setUser({ id: res.id, username: username, token: res.token, type: res.type })
				if (res.type == "admin") {
					navigate('/system-admin/dashboard');
				} else if (res.type == "shop admin") {
					setUser({
						id: res.id, username: username, token: res.token,
						type: res.type, shop_id: res.shop_id, theme_color: res.theme_color,
						name: res.name, category: res.category, image_url: res.image_url
					})

					
					navigate('/admin/dashboard')
				} else if (res.type == "user") {
					navigate('/app')
				}
			}
		} catch (error) {
			console.log(error)
		}
		setresponse(res)
	}

	const handleRegisterClick = () => {
		navigate('/register');
	}

	return (
		<div className="Lcontainer">
			<div className="container">
			<h3 className="lheader">Login</h3>
				<form onSubmit={handleSubmit }>
					<input className="input" type="text" autoComplete="off"
						name="txt" maxLength="30"
						placeholder="User name"
						required
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						 />

					<input className="input" type="password" autoComplete="off"
						name="pswd" maxLength="30"
						placeholder="Password"
						required
						value={password }
						onChange={(e) => setPassword(e.target.value)} />
					{response.token == ""? <p className="error"> Wrong useranme or password</p>: "" }
					<button className="loginbtn" type='submit'>Login</button>
					<p>Don't have an account?
						<a className="link" onClick={handleRegisterClick}> Sign up for free</a>
					</p>
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