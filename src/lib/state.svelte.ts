import type { LoadingState, Ticker } from './types';

let loadingState: LoadingState = $state(undefined);

let tickers: Array<Ticker> | undefined = $state(undefined);

export function loadingStateFn() {
	function setLoadingState(state: LoadingState) {
		loadingState = state;
	}

	return {
		get loadingState(): LoadingState {
			return loadingState;
		},
		setLoadingState
	};
}

export function tickersFn() {
	function setTickers(tickersArray: Array<Ticker> | undefined) {
		tickers = tickersArray;
	}

	return {
		get tickers() {
			console.log(tickers);
			return tickers;
		},
		setTickers
	};
}
