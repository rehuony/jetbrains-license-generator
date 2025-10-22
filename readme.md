# 🧩 JetBrains License Generator (Educational Project)

> [!Caution]
>
> **Disclaimer:**  This project is for **educational and security research purposes only**.  Please respect JetBrains’ licensing terms and purchase valid licenses for commercial or personal use.

## 📘 Overview

This project is an **educational and research tool** designed to demonstrate how JetBrains software license validation mechanisms work.  It helps developers understand the process of license file generation, cryptographic signing, and validation logic — **not for production or piracy use**.

## ⚙️ Tech Stack

| Category | Technology |
|-----------|-------------|
| 🧱 Build Tool | [Vite](https://vitejs.dev/) |
| ⚛️ Framework | [React](https://react.dev/) |
| 📝 Language | [TypeScript](https://www.typescriptlang.org/) |

## 🚀 Installation & Build

You can build and run this project in **two different ways**:

### ✅ Prerequisites

- `pnpm@10.18.3`
- `Node.js@22.18.0`
- (Optional) `Docker@28.5.1`

### 🔧 Clone the repository

```bash
git clone https://github.com/rehuony/jetbrains-license-generator.git
```

### 📁 Change current path

```bash
cd jetbrains-license-generator
```

### 🧩 Option 1 — Local Development

#### 📦 Install dependencies

```bash
pnpm install
```

#### 🧪 Run in development mode

```bash
pnpm dev
```

#### 🏗️ Build in production mode

```bash
pnpm build
```

The compiled files will be available in the `dist/` directory.

#### 🌐 Preview build output

```bash
pnpm preview
```

### 🐳 Option 2 — Run via Docker

If you prefer an isolated environment or automated deployment, you can build and run the project using Docker.

#### 🏗️ Build Docker image

```bash
docker build -t jetbrains-license-generator .
```

#### 🚀 Run container

```bash
docker run -it -d --rm -p 8080:80 jetbrains-license-generator
```

Now open your browser and visit: http://localhost:8080 👈

### 🐳 Option 3 — Run via Docker Compose

If you prefer an isolated environment or automated deployment, you can build and run the project using Docker.

#### 🚀 Run container

```bash
docker compose up -d
```

Now open your browser and visit: http://localhost:8080 👈

## 🌐 Deploying Under a Subpath

If you want to deploy this project **under a subpath on your domain**, you need to configure the environment variable `VITE_SUBPATH_PREFIX` (e.g. `/jetbrains-license-generator/`), so that Vite generates the correct asset paths during build.

### 🧩 Step 1 — Configure `VITE_SUBPATH_PREFIX`

Create or edit the `.env` file in the project root:

```bash
VITE_SUBPATH_PREFIX=/jetbrains-license-generator/
```

Then rebuild:

```bash
pnpm build
```

The built assets will now work correctly when served from `/jetbrains-license-generator/`.

### 🧱 Step 2 — Configure Nginx (Host Server)

Below is an example **Nginx reverse proxy configuration** for serving this project under a subpath like `https://example.com/jetbrains-license-generator/`:

```
location ^~ /jetbrains-license-generator/ {
    proxy_pass http://127.0.0.1:8080/;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

💡 **Tips:**

-   Make sure your application is listening on port `8080` (or the port you configured in Docker).

-   If you’re using Docker, map the container port accordingly, e.g.:

```bash
docker run -d -p 8080:80 jetbrains-license-generator
```

## 🤝 Contributing

Contributions are welcome! If you’d like to fix bugs, improve documentation, or add new educational examples:

1.  Fork this repository
2.  Create a feature branch
3.  Submit a Pull Request

## ⚖️ Legal Disclaimer

This project is **not affiliated with, endorsed by, or connected to JetBrains s.r.o.** All product names, logos, and trademarks are the property of their respective owners.

This project is provided **solely for educational and research purposes** — to help developers understand software license validation mechanisms, cryptography, and secure key design.

Any use of this software to bypass or modify JetBrains licensing systems would violate their Terms of Service and applicable laws. Please support JetBrains by purchasing a valid license: 👉 https://www.jetbrains.com/store/
