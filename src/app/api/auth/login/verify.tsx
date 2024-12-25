// pages/api/auth/verify.ts

import { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode("your-secret-key"); // Store securely

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { token } = req.body;

	try {
		const { payload } = await jwtVerify(token, secretKey);
		return res.status(200).json({ message: "Token is valid", payload });
	} catch (error) {
		return res.status(401).json({ error});
	}
}
