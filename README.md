# IoT Deployment Platform
## Framework
![image](https://github.com/user-attachments/assets/45112c2a-1c1a-4f96-a0bf-3ac0f7f7bf08)
React + TypeScript + Vite

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Project setup

```bash
$ pnpm install
```
## Environment Variable

```bash
# API Url
VITE_PUBLIC_ENV=http://localhost:3000
```

## Compile and run the project

```bash
# development + watch mode
$ pnpm run dev

# production mode
$ pnpm run build
$ pnpm run preview
```

## Deployment
Run Docker Compose script, using this following command
    
```bash
docker compose up -d --build
```
