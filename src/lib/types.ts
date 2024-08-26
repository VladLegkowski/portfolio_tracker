export type LoadingState = 'loading' | 'success' | undefined;

export type Company = {
	symbol: string;
	name: string;
	currency: string;
	stockExchange: string;
	exchangeShortName: string;
};
