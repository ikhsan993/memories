import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import useStyle from "./styles";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const Navbar = () => {
	const classes = useStyle();
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("profile"))
	);
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const logout = () => {
		dispatch({ type: "LOGOUT" });
		setUser(null);
		history.push("/");
	};
	useEffect(() => {
		const token = user?.token;
		if (token) {
			const decodedToken = decode(token);
			if (decodedToken.exp * 1000 < new Date().getTime()) {
				logout();
			}
		}
		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);
	return (
		<AppBar
			className={classes.appBar}
			position="static"
			color="inherit"
		>
			<Link to="/" className={classes.brandContainer}>
				<img
					src={memoriesText}
					alt="memories text"
					height="45px"
				/>
				<img
					src={memoriesLogo}
					alt="memories logo"
					height="40px"
					className={classes.image}
				/>
			</Link>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user.result.name}
							src={user.result.imageUrl}
						>
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography
							className={classes.userName}
							variant="h6"
						>
							{user.result.name}
						</Typography>
						<Button
							variant="contained"
							className={classes.logout}
							color="secondary"
							onClick={logout}
						>
							Logout
						</Button>
					</div>
				) : (
					<Button
						component={Link}
						to="/auth"
						variant="contained"
						className={classes.logout}
						color="primary"
					>
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
