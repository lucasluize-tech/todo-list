<script lang="ts">
	import { onMount } from 'svelte';
	import { state, update, completeItems } from './state';
	import { v4 as uuidv4 } from 'uuid';

	type Todo = {
		id: string;
		text: string;
		completed: boolean;
		editing: boolean;
		priority: string;
	};

	let textInput = '';
	let ref: any;
	let sortOption = 'text';
	let sortedTodos: Todo[] = [];
	let priorityInput = 'low';
	let showConfirm: boolean = false;

	$: {
		sortOption;
		sortedTodos = [...$state.todos];
		console.log($state);
		console.log(sortedTodos);
		sortTodos();
	}

	onMount(() => {
		ref.focus();
		sortTodos();
	});

	function addTodo() {
		update((state) => {
			state.todos.push({
				id: uuidv4(),
				text: textInput,
				completed: false,
				editing: false,
				priority: priorityInput
			});
			return state;
		});
		textInput = '';
	}

	function sortTodos() {
		let sorted = sortedTodos.sort((a: Todo, b: Todo): any => {
			switch (sortOption) {
				case 'text':
					return a.text.localeCompare(b.text);
				case 'priority':
					return getPriorityNumber(b.priority) - getPriorityNumber(a.priority);
				case 'completed':
					return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
			}
		});
		sortedTodos = sorted;
	}

	function getPriorityNumber(priority: string): number {
		switch (priority) {
			case 'high':
				return 3;
			case 'medium':
				return 2;
			case 'low':
				return 1;
			default:
				return 0;
		}
	}

	function getPriorityClass(priority: string): string {
		switch (priority) {
			case 'high':
				return 'bg-red-200';
			case 'medium':
				return 'bg-yellow-200';
			case 'low':
				return 'bg-green-200';
			default:
				return '';
		}
	}

	function setEditing(id: string, isEditing: boolean) {
		update((state) => {
			const todo = state.todos.find((todo) => todo.id === id);
			if (todo) {
				todo.editing = isEditing;
			}
			return state;
		});
	}

	function deleteTodo(idx: string) {
		update((state) => {
			const index = state.todos.findIndex((todo) => todo.id === idx);
			if (index !== -1) {
				state.todos.splice(index, 1);
			}
			return state;
		});
	}

	function completeAll() {
		update((state) => {
			state.todos.forEach((todo) => {
				todo.completed = true;
			});
			return state;
		});
	}

	function resetAll() {
		update((state) => {
			state.todos.forEach((todo) => {
				todo.completed = false;
			});
			return state;
		});
	}

	function deleteAll() {
		update((state) => {
			state.todos = [];
			return state;
		});
	}
</script>

<div class=" bg-slate-800 h-screen">
	<h1 class="text-3xl font-bold text-white text-center mb-12">ToDo List</h1>
	<div class="container mx-auto flex flex-col items-center gap-3">
		<form on:submit|preventDefault={addTodo} class="flex gap-2 w-[60%]">
			<input
				type="text"
				placeholder="add your todo here"
				bind:value={textInput}
				class="m-2 px-2 py-1 rounded-md flex-grow bg-gray-300"
				bind:this={ref}
			/>
			<select bind:value={priorityInput} class="m-2 p-2 bg-gray-300 rounded-md">
				<option value="high">High</option>
				<option value="medium">Medium</option>
				<option value="low">Low</option>
			</select>
			<button
				on:click={() => console.log(textInput)}
				class="text-white m-2 p-5 bg-purple-500 rounded-lg"
			>
				ADD
			</button>
		</form>

		<div class="flex items-center gap-3 w-[60%]">
			{#if $completeItems}
				<input type="checkbox" name="checkall" on:click={() => resetAll()} />
				<label for="checkall" class="text-white">Uncheck all</label>
			{:else}
				<input type="checkbox" name="checkall" on:click={() => completeAll()} />
				<label for="checkall" class="text-white">Check all</label>
			{/if}
			<select bind:value={sortOption} class="my-4 p-2 bg-gray-400 rounded-md">
				<option value="text">Sort by text</option>
				<option value="priority">Sort by priority</option>
				<option value="completed">Sort by completed</option>
			</select>

			<button
				on:click={() => (showConfirm = true)}
				class="text-white m-2 ml-72 p-2 bg-red-500 rounded-lg"
			>
				Delete all
			</button>
		</div>

		{#if showConfirm}
			<div
				class="z-10 inset-0 overflow-y-auto"
				aria-labelledby="modal-title"
				role="dialog"
				aria-modal="true"
			>
				<div
					class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
				>
					<!--
                Background overlay, show/hide based on modal state.
            -->
					<div
						class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
						aria-hidden="true"
					/>
					<div
						class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
					>
						<div class="p-6">
							<h2 id="modal-title" class="text-xl font-medium text-gray-900">
								Are you sure you want to delete all?
							</h2>
							<div class="mt-4">
								<button
									type="button"
									on:click={() => {
										deleteAll();
										showConfirm = false;
									}}
									class="mr-4 text-white p-2 bg-red-500 rounded-lg"
								>
									Yes, delete all
								</button>
								<button
									type="button"
									on:click={() => (showConfirm = false)}
									class="text-white p-2 bg-blue-500 rounded-lg"
								>
									No, cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<div class="flex flex-col w-[60%] gap-5">
			{#each sortedTodos as todo}
				{#if todo.editing}
					<div class="flex flex-row gap-3">
						<input type="text" bind:value={todo.text} class="flex-grow m-2 px-2 py-1 rounded-md" />
						<select bind:value={todo.priority} class="m-2 px-2 py-1 rounded-md">
							<option value="high">High</option>
							<option value="medium">Medium</option>
							<option value="low">Low</option>
						</select>
						<button
							class="ml-2 px-2 py-1 bg-blue-500 rounded-md text-white"
							on:click={() => setEditing(todo.id, false)}>Save</button
						>
					</div>
				{:else}
					<div class="flex flex-row gap-3 {getPriorityClass(todo.priority)} p-2 rounded-lg">
						<input type="checkbox" bind:checked={todo.completed} class="mr-2" />
						<p class="block text-xl font-bold flex-grow text-slate-800">{todo.text}</p>
						<button
							class="ml-2 px-2 py-1 bg-blue-500 rounded-md text-white"
							on:click={() => setEditing(todo.id, true)}
						>
							Edit
						</button>
						<button
							class="ml-2 px-2 py-1 bg-red-500 rounded-md text-white"
							on:click={() => deleteTodo(todo.id)}
						>
							Delete
						</button>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
