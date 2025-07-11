# ChatTangle

<img width="1918" height="910" alt="image" src="https://github.com/user-attachments/assets/a45aafdb-8d32-4bb4-90d8-847a3c452bb9" />

## Badges

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=zustand&logoColor=white)](https://zustand-bear.github.io/)
[![Vitest](https://img.shields.io/badge/vitest-%236E9AD6.svg?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![React Testing Library](https://img.shields.io/badge/testing%20library-%23323330.svg?style=for-the-badge&logo=testing-library&logoColor=red)](https://testing-library.com/react/)
[![ESLint](https://img.shields.io/badge/eslint-%234B32C3.svg?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)

## Project Overview

This project is a **ChatTangle**, a powerful and intuitive web application designed to help users visually create, manage, and deploy complex chatbot conversation flows. Built with modern web technologies, it provides a drag-and-drop interface for defining conversational paths, message nodes, and conditional logic, making chatbot development accessible and efficient.

## Features

- **Intuitive Drag-and-Drop Interface**: Easily add, connect, and arrange conversational nodes on a canvas.
- **Customizable Nodes**: Define various types of nodes (e.g., text messages, user inputs, conditional branches) with editable properties.
- **Real-time Flow Validation**: Ensures that conversation flows are logically sound and complete before saving.
- **Save and Load Flows**: Persist your chatbot designs and load them for future editing or deployment.
- **Clear All Functionality**: Quickly reset the canvas to start a new flow.
- **Responsive Design**: A clean and user-friendly interface that adapts to different screen sizes.

## Tech Stack

This application leverages a robust set of modern web technologies:

- **Frontend Framework**: [React](https://react.dev/) (with TypeScript)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Flow Diagramming**: [React Flow](https://reactflow.dev/) for the interactive node-based canvas.
- **State Management**: [Zustand](https://zustand-bear.github.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS.
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Testing**:
  - [Vitest](https://vitest.dev/) for unit and integration testing.
  - [React Testing Library](https://testing-library.com/react/) for testing React components.
  - [JSDOM](https://github.com/jsdom/jsdom) for a DOM environment in tests.
- **Linting**: [ESLint](https://eslint.org/)

## Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/) and [pnpm](https://pnpm.io/) installed on your system.

### Clone the repository

```bash
git clone https://github.com/AKASH-PRASAD7/chatbot-flow-builder.git
cd chatbot-flow-builder
```

### Install dependencies

```bash
pnpm install
```

## Usage

### Development Server

To run the application in development mode:

```bash
pnpm dev
```

This will start the Vite development server, and you can access the application in your browser, usually at `http://localhost:5173`.

### Building for Production

To build the application for production:

```bash
pnpm build
```

This command will compile and optimize your application for deployment, placing the output in the `dist/` directory.

### Preview Production Build

To preview the production build locally:

```bash
pnpm preview
```

## Testing

This project uses Vitest and React Testing Library for comprehensive testing.

### Run Tests

To run all tests:

```bash
pnpm test
```

### Run Tests with UI

To run tests and view the Vitest UI for an interactive testing experience:

```bash
pnpm test:ui
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information. (Note: You might need to create a `LICENSE` file if you don't have one.)
