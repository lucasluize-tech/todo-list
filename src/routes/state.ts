import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

let localState;
if (browser) {
	localState = localStorage.getItem('todos');
}

const initialState = {
	todos: []
};

if (!localState)
	if (browser) {
		localStorage.setItem('todos', JSON.stringify(initialState));
	}

const appState = localState ? JSON.parse(localState) : initialState;

export type AppState = {
	todos: {
		text: string;
		completed: boolean;
		editing: boolean;
	}[];
};

export const state = writable<AppState>(appState);
export const update = (callback: (state: AppState) => AppState) => {
	const updatedState = callback(get(state));
	state.update(() => updatedState);
	localStorage.setItem('todos', JSON.stringify(updatedState));
};
