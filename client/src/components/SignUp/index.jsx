import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import jwtDecode from "jwt-decode";

const Signup = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");
	const [user, setUser] = useState({});
	// const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/users";
			const { data: res } = await axios.post(url, data);
			console.log("signup res: ", res)
			setMsg(res);
			setError("");
		} catch (error) {
			console.log("error", error);
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data);
			}
		}
	};

	async function handleCallbackResponse(response) {
		try {
		console.log("Encoded JWT Token: ", response.credential);
		var userObj = jwtDecode(response.credential);
		setUser(userObj);
		const url = "http://localhost:5000/google";
		// console.log("user: ", userObj);
		const { data: res } = await axios.post(url, userObj);
		console.log("res data: ", res.data);
		localStorage.setItem("token", res.data);
		localStorage.setItem("user_id", res.user_id);
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
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
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
						{error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
					<div id="googleSignInDiv"></div>
				</div>
			</div>
		</div>
	);
};

export default Signup;