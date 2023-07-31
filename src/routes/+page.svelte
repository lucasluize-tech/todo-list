<script lang="ts">
	import { onMount } from 'svelte';
	import { state, update } from './state';

	let textInput = '';
	let ref: any;

	onMount(() => {
		ref.focus();
	});

	type Todo = {
		text: string;
		completed: boolean;
		editing: boolean;
	};

	function addTodo() {
		update((state) => {
			state.todos.push({ text: textInput, completed: false, editing: false });
			return state;
		});
		textInput = '';
	}

	function setEditing(i: number, isEditing: boolean) {
		update((state) => {
			state.todos[i].editing = isEditing;
			return state;
		});
	}

	function deleteTodo(idx: number) {
		update((state) => {
			state.todos.splice(idx, 1);
			return state;
		});
	}
</script>

<div class=" bg-slate-800 h-screen">
	<div class="container mx-auto flex flex-col items-center gap-10">
		<h1 class="text-3xl font-bold text-white">ToDo List</h1>
		<form on:submit|preventDefault={addTodo} class="flex gap-12 w-[60%]">
			<input
				type="text"
				placeholder="add your todo here"
				bind:value={textInput}
				class="m-2 px-2 py-1 rounded-md flex-grow"
				bind:this={ref}
			/>
			<button
				on:click={() => console.log(textInput)}
				class="text-white m-2 p-5 bg-purple-500 rounded-lg"
			>
				ADD
			</button>
		</form>
		<div class="flex flex-col w-[60%] gap-5">
			{#each $state.todos as todo, idx}
				{#if todo.editing}
					<div class="flex flex-row gap-3">
						<input type="text" bind:value={todo.text} class="flex-grow m-2 px-2 py-1 rounded-md" />
						<button
							class="ml-2 px-2 py-1 bg-blue-500 rounded-md text-white"
							on:click={() => setEditing(idx, false)}>Save</button
						>
					</div>
				{:else}
					<div class="flex flex-row gap-3">
						<input type="checkbox" bind:checked={todo.completed} class="mr-2" />
						<p class="block text-xl font-bold flex-grow text-white">{todo.text}</p>
						<button
							class="ml-2 px-2 py-1 bg-blue-500 rounded-md text-white"
							on:click={() => setEditing(idx, true)}
						>
							Edit
						</button>
						<button
							class="ml-2 px-2 py-1 bg-red-500 rounded-md text-white"
							on:click={() => deleteTodo(idx)}
						>
							Delete
						</button>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
