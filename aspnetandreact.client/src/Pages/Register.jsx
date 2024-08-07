/* eslint-disable no-mixed-spaces-and-tabs */
import '../Styles/Register.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react'
import UserContext from '../Components/UserContext'



function Register() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [response, setresponse] = useState({})

	const { setUser } = useContext(UserContext);

	const navigate = useNavigate();

	const handleRegisterClick = () => {
		navigate('/');
	}

	return (
		<div >
			<div className="rcontainer">
		<h3 className="rheader">Register</h3>
				<form>
					<input className="input" type="text" name="txt" placeholder="User name" required />
					<input className="input" type="text" name="txt" placeholder="First name" required />
					<input className="input" type="text" name="txt" placeholder="Last name" required />
					<input className="input" type="password" name="pswd" placeholder="Password" required />
					<button className="singupBtn">Sign up</button>
					<p>Already have an account?
						<a onClick={handleRegisterClick }> Login</a>
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

export default Register;