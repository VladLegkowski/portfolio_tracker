import { z } from 'zod';

export const schema = z.object({
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
		.multipleOf(0.0001, 'Break-even price must have at most 4 decimal places')
		.refine((val) => !isNaN(val), 'Break-even price must be a numerical value'),
	realisedPL: z
		.number()
		.refine((val) => !isNaN(val), 'Realised P/L must be a numerical value')
		.default(0)
});
