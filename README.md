# SvelteKit To-Do List App !

This repository contains a To-Do List application built with SvelteKit and Vite, demonstrating basic CRUD (Create, Read, Update, Delete) operations along with sorting, priority assignment for tasks, and local storage utilization to persist data across browser sessions.

## Features

- Create new to-do items with a priority level (High, Medium, Low).
- Edit existing to-do items.
- Delete individual to-do items or all at once.
- Sort to-do items based on text, priority, or completion status.
- Check off completed items and uncheck all or complete all tasks with a single click.
- A confirmation modal for the delete-all operation to prevent accidental data loss.

## Project Structure

- The main logic resides in a script block within a Svelte component at `src/routes/+page.svelte`
- It uses a local `state` module to manage the application state.
- Utility functions are defined for sorting tasks and toggling editing mode for individual tasks.

## Setup & Usage

### Preqrequisites

- Node.js (v14 or higher)
- Yarn or npm/pnpm
- Bun

### Installation

1. Clone this repository.
   ```bash
   git clone https://github.com/lucasluize-tech/todo-list.git
   cd todo-list
   ```
2. Install the dependencies.

```bash
yarn install
# or
npm install
# or
pnpm install
# or
bun install
```

3. Run the Development Server

```bash
yarn dev
# or
npm run dev
# ....
```

4. Open the application in your browser at `localhost:3000`.

## Contributing

Feel free to fork the repository, create a feature branch, and open a Pull Request if you have suggestions or improvements.

## Author

This project was created by [Lucas Luize](https://lucasluize.com/).

## License

This project is open source and available under the [MIT License](LICENSE).
