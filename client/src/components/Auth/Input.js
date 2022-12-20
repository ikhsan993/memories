import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({
	name,
	half,
	handleChange,
	label,
	autoFocus,
	type,
	handleShowPassword,
}) => {
	return (
		<Grid xs={6} md={12} sm={half ? 6 : 12}>
			<TextField
				name={name}
				onChange={handleChange}
				required
				fullWidth
				label={label}
				autoFocus={autoFocus}
				variant="outlined"
				type={type}
				InputProps={
					name === "password" && {
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={
										handleShowPassword
									}
								>
									{name === "password" ? (
										<Visibility />
									) : (
										<VisibilityOff />
									)}
								</IconButton>
							</InputAdornment>
						),
					}
				}
			/>
		</Grid>
	);
};

export default Input;
