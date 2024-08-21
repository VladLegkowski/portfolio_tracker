import { z } from 'zod';

export const schema = z.object({
	tickerSymbol: z.string().min(2, 'Ticker cant be empty')
});
