/* eslint-disable no-mixed-spaces-and-tabs */
import '../Styles/Login.css'
import { loginUser } from '../Services/LoginRegister'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../Components/UserContext'


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
					//set the user with the shop id!!!!!
					//To change color based on theme_color
					//function lightenColor(color, percent) {
					//    const num = parseInt(color.replace("#", ""), 16),
					//        amt = Math.round(2.55 * percent),
					//        R = (num >> 16) + amt,
					//        G = (num >> 8 & 0x00FF) + amt,
					//        B = (num & 0x0000FF) + amt;
					//    return `#${(
					//        0x1000000 +
					//        (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
					//        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
					//        (B < 255 ? B < 1 ? 0 : B : 255)
					//    ).toString(16).slice(1).toUpperCase()}`;
					//}
					//useEffect(() => {
					//    if (item.length > 0) {
					//        const themeColor = item[0].theme_color;
					//        if (themeColor) {
					//            document.documentElement.style.setProperty('--mauve-light', lightenColor(themeColor, 20)); // Light variant
					//            document.documentElement.style.setProperty('--mauve-bright', lightenColor(themeColor, -10)); // Bright variant
					//        }
					//    }
					//}, [item]);
					//    --mauve-light: #6A679E;
					//--mauve - bright: #5D54A4;
					//--button - color: #573b8a;
					//--button - onHover: #6d44b8;
					//--font: 'Jost', sans - serif;
					//--table - header - words: black;
					//--table - rows: hsl(243, 22 %, 81 %);
					//--table - rows - hover: #9D9BC4;
					//} 
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
			<h3 className="header">Login</h3>
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