/* eslint-disable no-mixed-spaces-and-tabs */
import '../Styles/Login.css'
import { loginUser } from '../Services/LoginRegister'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../Components/UserContext'


function Login() {
	//gather the input and send it to the database
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
			console.log(res)
			if (res.type !== "") {
				setUser({ id: res.id, username: username, token: res.token, type: res.type })
				if (res.type == "admin") {
					navigate('/SystemAdminDashboard');
				} else if (res.type == "shop admin") {
					navigate('/adminDashboard')
				} else if (res.type == "user") {
					navigate('/app')
				}
			}
		} catch (error) {
			console.log(error)
		}
		setresponse(res)
	}
	useEffect(() => {
		console.log('Updated response:', response);
	}, [response]);

	const handleRegisterClick = () => {
		navigate('/register');
	}

	return (
		<div className="container">
			<div className="login">
			<h3 className="header">Login</h3>
				<form onSubmit={handleSubmit }>
					<input type="text"
						name="txt"
						placeholder="User name"
						required
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						 />

					<input type="password"
						name="pswd"
						placeholder="Password"
						required
						value={password }
						onChange={(e) => setPassword(e.target.value)} />
					{response.token == ""? <p className="error"> Wrong useranme or password</p>: "" }
					<button className="loginbtn" type='submit'>Login</button>
					<p>Don't have an account?
						<a onClick={handleRegisterClick}> Sign up for free</a>
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