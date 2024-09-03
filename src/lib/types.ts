import type { User } from 'lucia';
import type { SuperValidated } from 'sveltekit-superforms';

export type DrawerState = boolean;

export type Company = {
	symbol: string;
	name: string;
	currency: string;
	stockExchange: string;
	exchangeShortName: string;
	price?: number;
};

export type Position = {
	id: number;
	user_id: string;
	symbol: string;
	quantity: number;
	break_even_price: number;
	realised_pl: number;
	created_at: Date;
};

export type Data = {
	positions: Position[];
	companies: Company[];
	query: string;
	form: SuperValidated<
		{
			symbol: string;
			quantity: number;
			breakEvenPrice: number;
			realisedPL: number;
		},
		any,
		{}
	>;
	user: User | null;
};
