# NestJS + Prisma + JWT Project Documentation

## ⚙️ Installation & Setup

### 1. Install NestJS CLI

```bash
npm i -g @nestjs/cli
```

> Installs the NestJS CLI globally.

### 2. Create New Project

```bash
nest new project-name
```

> Creates a new NestJS project with default boilerplate.

### 3. Start Development Server

```bash
nest start:dev
```

> Runs the server in watch mode (auto reloads on file changes).

## 🛠 NestJS Generators

### Generate Module

```bash
nest generate module <name>
```

> Creates a new NestJS module.

### Generate Controller

```bash
nest generate controller <name>
```

> Creates a new controller (REST endpoints).

### Generate Service

```bash
nest generate service <name>
```

> Creates a new service (business logic).

## 📦 Dependencies

### Validation & DTO Mapping

```bash
npm i --save class-validator class-transformer
```

> For validating request DTOs.

```bash
npm install @nestjs/mapped-types
```

> Provides utility functions for creating partial/update DTOs.

### Prisma ORM

```bash
npm install prisma --save-dev
```

> Installs Prisma CLI as a dev dependency.

```bash
npx prisma
```

> Shows available Prisma CLI commands.

```bash
npx prisma init
```

> Initializes Prisma (creates prisma/schema.prisma).

```bash
npx prisma migrate dev --name init
```

> Applies migrations and creates the database schema.

```bash
npm install @prisma/client
```

> Installs Prisma client for database queries.

```bash
npx prisma migrate reset
```

> Resets the database and reapplies migrations.

### Authentication & Security

```bash
npm install @nestjs/jwt passport passport-jwt bcrypt
```

> JWT module, Passport strategy, and bcrypt for password hashing.

```bash
npm install @types/passport-jwt @types/bcrypt -D
```

> TypeScript type definitions for passport-jwt and bcrypt.

## 🔑 Authentication Setup

* Auth Module contains `AuthService`, `AuthController`, and `JwtStrategy`.
* JWT tokens are generated in `AuthService` using `JwtService.sign()`.
* **Access Token** → Short-lived token (7 days in this project).
* **Refresh Token** → Used to generate new access tokens (15 minutes expiry here).

* **For Login Controller user body (POSTMAN)**  
{   
    "email":"email",
    "password":"password"
}

* **For Register Controller user body (POSTMAN)**
{   
    
    "email":"email",
    "name":"name",
    "password":"password",
    "role":"USER"

}

* `JwtStrategy` validates tokens from `Authorization: Bearer <token>` headers.

## 👥 User Module

* `UserService` handles database queries with Prisma.
* `UserController` exposes endpoints for:

   //use auth recieved during login as header//

  * Get profile (`/user/profile`)  
  * Get all users (with optional search by name)
  * Update user
  * Delete user
* Protected routes use `@UseGuards(JwtAuthGuards)`

## 🏗 Project Structure

```
src/
│── auth/
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   ├── jwt.strategy.ts
│   └── guards/jwt-auth.guard.ts
│
│── user/
│   ├── user.service.ts
│   ├── user.controller.ts
│   └── dto/
│       └── user-response.dto.ts
│
│── database/
│   └── database.service.ts
│
│── app.module.ts
```

## ✅ Notes & Best Practices

* Always use DTOs (`UserResponseDto`) to control the data returned to the client.
* Hash passwords using `bcrypt` before saving to the database.
* Use `@UseGuards(JwtAuthGuards)` to protect sensitive endpoints.
* Use environment variables for secrets (`process.env.JWT_SECRET`) and database URL.
* Generate tokens via `JwtService.sign()`; verify using `JwtStrategy`.
* Follow RESTful conventions for endpoints and HTTP methods.

---

This documentation covers setup, project structure, dependencies, and authentication flow for a NestJS + Prisma + JWT full-stack project.
