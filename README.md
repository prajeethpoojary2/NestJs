⚙️ Installation & Setup
1. Install NestJS CLI
npm i -g @nestjs/cli


👉 Installs the NestJS CLI globally.

2. Create New Project
nest new project-name


👉 Creates a new NestJS project with default boilerplate.

3. Start Development Server
nest start:dev


👉 Runs the server in watch mode (auto reloads on file changes).

🛠 NestJS Generators
Generate Module
nest generate module <name>


👉 Creates a new NestJS module.

Generate Controller
nest generate controller <name>


👉 Creates a new controller (REST endpoints).

Generate Service
nest generate service <name>


👉 Creates a new service (business logic).

📦 Dependencies
Validation & DTO Mapping
npm i --save class-validator class-transformer


👉 For validating request DTOs.

npm install @nestjs/mapped-types


👉 Provides utility functions for creating partial/update DTOs.

Prisma ORM
npm install prisma --save-dev


👉 Installs Prisma CLI as a dev dependency.

npx prisma


👉 Shows available Prisma CLI commands.

npx prisma init


👉 Initializes Prisma (creates prisma/schema.prisma).

npx prisma migrate dev --name init


👉 Applies migrations and creates the database schema.

npm install @prisma/client


👉 Installs Prisma client for database queries.

npx prisma migrate reset


👉 Resets the database and reapplies migrations.

Authentication & Security
npm install @nestjs/jwt passport passport-jwt bcrypt


👉 JWT module, Passport strategy, and bcrypt for password hashing.

npm install @types/passport-jwt @types/bcrypt -D


👉 TypeScript type definitions for passport-jwt and bcrypt.

🔑 Authentication Setup

Auth Module contains AuthService, AuthController, and JwtStrategy.

JWT tokens are generated in AuthService using JwtService.sign().

Access Token → Short-lived token (7 days in this project).

Refresh Token → Used to generate new access tokens (15 minutes expiry here).

JwtStrategy validates tokens from Authorization: Bearer <token> headers.

👥 User Module

UserService handles database queries with Prisma.

UserController exposes endpoints for:

Get profile (/user/profile)

Get all users (with optional search)

Update user

Delete user

Protected routes use:

@UseGuards(JwtAuthGuards)

🏗 Project Structure
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
