import type { LoadingState } from './types';

let loadingState: LoadingState = $state(undefined);

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
