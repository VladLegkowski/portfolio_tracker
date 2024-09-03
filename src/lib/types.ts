import type { User } from 'lucia';
import type { SuperValidated } from 'sveltekit-superforms';

export type DrawerState = boolean;

export type Company = {
	symbol: string;
	name: string;
	currency: string;
	stockExchange: string;
	exchangeShortName: string;
	price: number | undefined;
};

export type Position = {
	id: number;
	user_id: string;
	symbol: string;
	quantity: number;
	break_even_price: number;
	realised_pl: number;
	created_at: Date;
	price: number;
	currency: string;
};

export type Data = {
	positions?: Position[] | undefined;
	companies: Company[] | undefined;
	query: string;
	form: SuperValidated<
		{
			symbol: string;
			quantity: number;
			breakEvenPrice: number;
			realisedPL: number;
			currency: string;
		},
		any,
		{}
	>;
	user: User | null;
};
