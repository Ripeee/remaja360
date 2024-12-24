// lib/db.js

import { Pool } from "pg";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL, // Set this in .env.local
	ssl: {
		rejectUnauthorized: false, // needed for cloud hosting, e.g., Heroku
	},
});

export default pool;
