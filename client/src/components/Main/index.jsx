import React from "react";
import styles from "./styles.module.css";

const Main = () => {
	const handleLogout = () => {
		console.log("logout");
		window.open("http://localhost:5000/auth/logout", "_self");
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>NTR</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
};

export default Main;