export type DrawerState = boolean;

export type Company = {
	symbol: string;
	name: string;
	currency: string;
	stockExchange: string;
	exchangeShortName: string;
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
