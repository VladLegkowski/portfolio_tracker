import postgres from 'postgres';
import { DATABASE_URL } from '$env/static/private';

export type DatabaseUser = {
	id: string;
	username: string;
	password_hash: string;
};

const sql = postgres(DATABASE_URL, {
	ssl: false
	// ssl: { rejectUnauthorized: false }
});

function getPositions(userId: string) {
	return sql`
    SELECT * FROM positions
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
`;
}

function createPosition({
	symbol,
	quantity,
	breakEvenPrice,
	realisedPL,
	userId
}: {
	symbol: string;
	quantity: number;
	breakEvenPrice: number;
	realisedPL: number;
	userId: string;
}) {
	return sql`
      INSERT INTO positions (user_id, symbol, quantity, break_even_price, realised_pl)
          VALUES (${userId}, ${symbol}, ${quantity}, ${breakEvenPrice}, ${realisedPL})
              RETURNING id, symbol, quantity, break_even_price, realised_pl
	`;
}

function signup(userId: string, username: string, passwordHash: string) {
	return sql`
			INSERT INTO auth_user (id, username, password_hash)
			VALUES (${userId}, ${username}, ${passwordHash})
	`;
}

function getUser(userName: string) {
	return sql`
      SELECT * FROM auth_user where username = ${userName}
      `;
}

export { sql, getPositions, createPosition, signup, getUser };
