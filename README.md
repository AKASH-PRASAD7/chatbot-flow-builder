<h1 align="center">💬 ChatTangle</h1>

<p align="center">
  <img src="https://github.com/user-attachments/assets/a45aafdb-8d32-4bb4-90d8-847a3c452bb9" alt="ChatTangle Screenshot" width="90%"/>
</p>

<p align="center">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" /></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" /></a>
  <a href="https://zustand-bear.github.io/"><img src="https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=zustand&logoColor=white" /></a>
  <a href="https://vitest.dev/"><img src="https://img.shields.io/badge/vitest-%236E9AD6.svg?style=for-the-badge&logo=vitest&logoColor=white" /></a>
  <a href="https://testing-library.com/react/"><img src="https://img.shields.io/badge/testing%20library-%23323330.svg?style=for-the-badge&logo=testing-library&logoColor=red" /></a>
  <a href="https://eslint.org/"><img src="https://img.shields.io/badge/eslint-%234B32C3.svg?style=for-the-badge&logo=eslint&logoColor=white" /></a>
</p>

## 🚀 Project Overview

**ChatTangle** is a powerful and intuitive web application for visually designing chatbot conversation flows using a drag-and-drop interface. Built with cutting-edge modern web technologies, it empowers users to define rich conversational paths, logic branches, and dynamic message interactions.

---

## ✨ Features

- 🎯 **Drag-and-Drop Interface** – Intuitive canvas to design conversation flows visually.
- 🔧 **Customizable Node Types** – Includes messages, inputs, conditionals, and more.
- 🔁 **Real-Time Flow Validation** – Ensures logical consistency before saving.
- 💾 **Persistent Flows** – Save and load conversation flows easily.
- 🧹 **Clear Canvas Button** – Start fresh with a single click.
- 📱 **Responsive UI** – Clean design optimized for desktop and mobile.

---

## 🛠 Tech Stack

| Category        | Tools Used |
|----------------|------------|
| ⚛️ Frontend     | React + TypeScript |
| ⚡ Build Tool    | Vite |
| 🧠 Flow Diagram  | [React Flow](https://reactflow.dev/) |
| 📦 State Mgmt   | [Zustand](https://zustand-bear.github.io/) |
| 🎨 Styling      | Tailwind CSS |
| 🔔 Notifications | React Hot Toast |
| 🧪 Testing      | Vitest + React Testing Library |
| 🧼 Linting      | ESLint |

---

## 📦 Installation

### 🔧 Prerequisites
- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/)

### 🚨 Clone the Repository

```bash
git clone https://github.com/AKASH-PRASAD7/chatbot-flow-builder.git
cd chatbot-flow-builder
```

### Install dependencies

```bash
pnpm install
```

## 💻 Usage

### Development Server

To run the application in development mode:

```bash
pnpm dev
```

This will start the Vite development server, and you can access the application in your browser, usually at `http://localhost:5173`.

### 📦 Building for Production

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

## 🧪 Testing

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


## License

Distributed under the MIT License. See `LICENSE` for more information.
