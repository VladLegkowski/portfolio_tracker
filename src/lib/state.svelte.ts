import type { DrawerState } from './types';

let drawerState: DrawerState = $state(false);

export function drawerStateFn() {
	function setDrawerState(state: DrawerState) {
		drawerState = state;
	}

	return {
		get drawerState(): DrawerState {
			return drawerState;
		},
		setDrawerState
	};
}
