import { z } from 'zod';

export const schema = z.object({
	tickerSymbol: z.string().min(4, 'Ticker cant be empty')
});

export type FormSchema = typeof schema;
