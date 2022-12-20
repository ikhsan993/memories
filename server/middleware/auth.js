import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const isCustomAuth = token.length < 500;
		let decodedData;
		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, "test_secret_key");
			req.userId = decodedData?.id;
		} else {
			jwt.decode(token);
			req.userId = decodedData?.sub;
		}
		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
