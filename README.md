This project is a Skill Test from [Synapsis.id](https://synapsis.id/)

this project build with:

- Typescript
- NEXT
- Zustand
- Tailwind

## Getting Started

##### install packages

```bash
npm install
#or
yarn install
#or
pnpm install
```

##### run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

##### run the linter:

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

## Project Folder Structure

```
project-root/
|
├── public/
├── src/
| ├── domain/
| | ├── request/
| | | ├── authRequest.ts
| | | └── ...
| | |
| | └── response/
| | ├── authResponse.ts
| | └── ...
| |
| ├── infrastructure/
| | ├── config/
| | | ├── api/
| | | | └── index.ts
| | | └── ...
| | |
| | ├── constant/
| | | └── index.ts
| | |
| | ├── enum/
| | | └── index.ts
| | |
| | ├── services/
| | | ├── auth/
| | | | └── index.ts
| | | └── ...
| | |
| | ├── types/
| | | └── index.ts
| | |
| | └── utils/
| | └── index.ts
| |
| ├── pages/
| | ├── _app.tsx
| | ├── _document.tsx
| | └── ...
| |
| └── ui/
| ├── assets/
| | ├── images/
| | | ├── png/
| | | | ├── example.png
| | | | └── ...
| | | ├── svg/
| | | | ├── example.svg
| | | | └── ...
| | | └── ...
| | |
| | └── styles/
| | └── global.css
| |
| ├── components/
| | ├── Button/
| | | └── index.ts
| | |
| | ├── Dropdown/
| | | └── index.ts
| | └── ...
| |
| ├── context/
| | ├── Notify/
| | | └── NotifyProvider.ts
| | ├── ...
| | └── index.ts
| |
| ├── layouts/
| | ├── Header/
| | | ├── hooks.ts
| | | └── index.tsx
| | |
| | └── Footer/
| | ├── hooks.ts
| | └── index.tsx
| |
| ├── screens/
| | ├── Home/
| | | ├── hooks.ts
| | | └── index.tsx
| | └── ...
| |
| └── stores/
| ├── auth/
| | ├── index.ts
| └─ ...
|
|
├── package.json
├── README.md
├── .env
└─ ...
```
