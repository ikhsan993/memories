import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
	Avatar,
	Button,
	Paper,
	Grid,
	Typography,
	Container,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

// import { GoogleLogin } from "@react-oauth/google";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyle from "./styles";
// import Icon from "./Icon";
import Input from "./Input";
import { signin, signup } from "../../actions/auth";

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const Auth = () => {
	const classes = useStyle();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsignUp] = useState(false);
	const [formData, setFormData] = useState(initialState);
	const history = useHistory();
	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignUp) {
			dispatch(signup(formData, history));
		} else {
			dispatch(signin(formData, history));
		}
	};
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// const googleSuccess = async (res) => {
	// 	const result = res?.profileObj;
	// 	const token = res?.tokenId;
	// 	try {
	// 		dispatch({ type: "AUTH", data: { result, token } });
	// 		history.push("/");
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	// const googgleFailure = async (error) => {
	// 	console.log(error);
	// 	console.log("Google sign in failed. Try again later");
	// };
	const switchMode = () => {
		setIsignUp((prevIsSignUp) => !prevIsSignUp);
		setShowPassword(false);
	};

	const handleShowPassword = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);
	return (
		<Container component={"main"} maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5">
					{isSignUp ? "Sign Up" : "Sign In"}
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignUp && (
							<>
								<Input
									name="firstName"
									label="First Name"
									handleChange={
										handleChange
									}
									half
								/>
								<Input
									name="lastName"
									label="Last Name"
									handleChange={
										handleChange
									}
									half
								/>
							</>
						)}
						<Input
							name="email"
							label="Email Address"
							handleChange={handleChange}
							type="email"
						/>
						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							type={
								showPassword === true
									? "text"
									: "password"
							}
							handleShowPassword={
								handleShowPassword
							}
						/>
						{isSignUp && (
							<Input
								name="confirmPassword"
								label="Repeat Password"
								handleChange={handleChange}
								type="password"
							/>
						)}
					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{isSignUp ? "Sign Up" : "Sign In"}
					</Button>
					{/* <GoogleLogin
						clientId="777985642000-kdomf82o0oiau8tl59leor3jno7cdee0.apps.googleusercontent.com"
						render={(renderProps) => (
							<Button
								className={classes.googleButton}
								color="primary"
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}
								variant="contained"
							>
								Google Sign In
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googgleFailure}
						cookiePolicy="single_host_origin"
					/> */}
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Button onClick={switchMode}>
								{isSignUp
									? "Already have and account? Sign In "
									: "Dont have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
