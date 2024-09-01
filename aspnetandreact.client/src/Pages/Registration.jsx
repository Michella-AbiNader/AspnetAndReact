/* eslint-disable no-mixed-spaces-and-tabs */
import '../Styles/Register.css'
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react'
import UserContext from '../Components/UserContext'
import { registerUser } from '../Services/LoginRegister'




function Register() {
	const [username, setUsername] = useState('')
	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
	const [password, setPassword] = useState('')
	const [response, setresponse] = useState({})
	const [passwordStrength, setPasswordStrength] = useState('');


	const { setUser } = useContext(UserContext);

	const navigate = useNavigate();

	const checkPasswordStrength = (password) => {
		let strength = '';
		if (password.length >= 8) {
			const hasUpperCase = /[A-Z]/.test(password);
			const hasLowerCase = /[a-z]/.test(password);
			const hasNumbers = /\d/.test(password);
			const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

			if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar) {
				strength = 'Strong';
			} else if ((hasUpperCase || hasLowerCase) && hasNumbers) {
				strength = 'Medium';
			} else {
				strength = 'Weak';
			}
		} else {
			strength = 'Short';
		}

		setPasswordStrength(strength);
	};

	const handleSubmit = async (e) => {
		var res;
		e.preventDefault();
		if (passwordStrength !== 'Strong') {
			setresponse('Please choose a stronger password.');
			return;
		}
		try {
			res = await registerUser({ "Username": username, "FirstName": firstname, "LastName": lastname, "Password": password, "Type": "user" });
			if (res.token !== "") {
				setUser({ id: res.id, username: username, token: res.token, type: "user" })
				navigate('/app')
			}
		} catch (error) {
			console.log(error)
		}
		setresponse(res)
	}

	const handleRegisterClick = () => {
		navigate('/');
	}

	return (
		<div className="Rcontainer">
			<div className="rcontainer">
				<h3 className="rheader">Register</h3>
				<form onSubmit={handleSubmit}>
					<input className="input" autoComplete="off"
						type="text" maxLength="30"
						name="txt"
						placeholder="User name"
						required
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input className="input" type="text" name="txt" placeholder="First name" required autoComplete="off"
						value={firstname} maxLength="20"
						onChange={(e) => setFirstname(e.target.value)}
					/>
					<input className="input" type="text" name="txt" placeholder="Last name" required autoComplete="off"
						value={lastname} maxLength="20"
						onChange={(e) => setLastname(e.target.value)}
					/>
					<input className="input" type="password" name="pswd" placeholder="Password" required autoComplete="off"
						value={password} maxLength="30" minLength="8"
						onChange={(e) => {
							setPassword(e.target.value)
							checkPasswordStrength(e.target.value);
						}}
					/>
					{passwordStrength == "" ? "" : <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
						Password Strength: {passwordStrength}
					</p>}
					
					{response.token == "" ? <p className="error"> {response.res}</p> : ""}
					<button className="singupBtn" type="submit">Sign up</button>
					<p>Already have an account?
						<a className="link" onClick={handleRegisterClick}> Login</a>
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