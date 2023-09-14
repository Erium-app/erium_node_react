# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Run with Docker
```bash
NETWORK_NAME="my-network" && docker network inspect "$NETWORK_NAME" &>/dev/null || docker network create "$NETWORK_NAME" && docker rm -f nginx-container react-app &>/dev/null || true && docker pull eriumzone/nginx-react-app:latest && docker pull eriumzone/node-react-app:latest && docker run -d --name react-app --network my-network eriumzone/node-react-app:latest && docker run -d --name nginx-container --network my-network -p 80:80 --restart=no eriumzone/nginx-react-app:latest
```
