import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import jwtDecode from "jwt-decode";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [user, setUser] = useState({});

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log("HERE");
			const url = "	";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			localStorage.setItem("uid", res.uid);
			window.location = "/";
			console.log("login res: ", res);
		} catch (err) {
			if (
				err.response &&
				err.response.status >= 400 &&
				err.response.status <= 500
			) {
				setError(err.response.data);
				console.log("error: ", error);
			}
		}
	};

	async function handleCallbackResponse(response) {
		try {
		console.log("Encoded JWT Token: ", response.credential);
		var userObj = jwtDecode(response.credential);
		setUser(userObj);
		const url = "http://localhost:5000/google";
		console.log("user: ", userObj);
		const { data: res } = await axios.post(url, userObj);
		console.log("res data: ", res.data);
		localStorage.setItem("token", res.data);
		localStorage.setItem("uid", res.uid);
		// if (res.data) {
			// console.log("res data");
		window.location = "/";
		// }
		// window.location = "/";
		} catch (err) {
			if (
				err.response &&
				err.response.status >= 400 &&
				err.response.status <= 500
			) {
				setError(err.response.data);
				console.log("error: ", error);
			}
		}
	}


	useEffect(() => {
		/* global google */
		google.accounts.id.initialize({
			client_id: "557275245198-3udch6391040dtboa2mi5flgjeopjlg5.apps.googleusercontent.com",
			callback: handleCallbackResponse
		});
		google.accounts.id.renderButton(
			document.getElementById("googleSignInDiv"),
			{ theme: "outline", size: "large" }
		);
	}, []);

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						<Link to = "/forgot-password" style={{alignSelf: "flex-start"}}>
							<p style={{padding: "0 15px"}}>Forgot Password?</p></Link>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
					<div id="googleSignInDiv"></div>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;