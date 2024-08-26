import postgres from 'postgres';
import { DATABASE_URL } from '$env/static/private';

const sql = postgres(DATABASE_URL, {
	ssl: false
});

function getPositions() {
	return sql`
      SELECT * FROM positions
      ORDER BY created_at DESC
    `;
}

function createPosition(
	symbol: string,
	quantity: number,
	breakEvenPrice: number,
	realisedPL: number
) {
	return sql`
      INSERT INTO positions (symbol, quantity, break_even_price, realised_pl)
          VALUES (${symbol}, ${quantity}, ${breakEvenPrice}, ${realisedPL})
              RETURNING id, symbol, quantity, break_even_price, realised_pl
	`;
}

function signup(userId: string, username: string, passwordHash: string) {
	return sql`
			INSERT INTO auth_user (id, username, password_hash)
			VALUES (${userId}, ${username}, ${passwordHash})
	`;
}

export { sql, getPositions, createPosition, signup };
