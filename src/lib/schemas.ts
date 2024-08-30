import { z } from 'zod';

export const tickerSymbolSchema = z.object({
	tickerSymbol: z.string().min(2, 'Ticker cant be empty')
});

export const plCalculationSchema = z.object({
	symbol: z.string().min(2, 'Ticker cant be empty'),
	quantity: z
		.number()
		.int()
		.positive('Quantity must be a positive integer')
		.default(0)
		.refine((val) => !isNaN(val), 'Quantity must be a numerical value'),
	breakEvenPrice: z
		.number()
		.positive('Break-even price must be positive')
		.refine((val) => {
			const parts = val.toString().split('.');
			return parts.length === 1 || parts[1].length <= 8;
		}, 'Break-even price must have at most 8 digits after the decimal point')
		.refine((val) => !isNaN(val), 'Break-even price must be a numerical value'),
	realisedPL: z
		.number()
		.refine((val) => !isNaN(val), 'Realised P/L must be a numerical value')
		.default(0)
});

export const loginSchema = z.object({
	email: z.string().email('This is not a valid email.'),
	password: z.string().min(6, 'Password must be 6 characters long')
});
