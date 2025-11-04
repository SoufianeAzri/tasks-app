🧠 Task Management Backend – NestJS + Prisma + Neon + date-fns

    This is the backend API for the Task Management application.
    It is built using NestJS, Prisma ORM, and a PostgreSQL database hosted on Neon.
    The API provides features for managing users, tasks, subtasks, states, and activity tracking, and it’s integrated with date-fns for advanced date operations.


🚀 Technologies Used

    | Tool / Library        | Purpose                                                                    |
    | --------------------- | -------------------------------------------------------------------------- |
    | **NestJS**            | Scalable Node.js framework for building efficient server-side applications |
    | **Prisma**            | ORM for database management and type-safe queries                          |
    | **PostgreSQL (Neon)** | Cloud-hosted database (serverless & free-tier compatible)                  |
    | **date-fns**          | Utility library for date manipulation (used for reports & dashboard stats) |
    | **TypeScript**        | Strongly typed JavaScript for safer and cleaner code                       |
    | **Render**            | Hosting provider for deploying backend services                            |


🏗️ Project Structure

    src/
    ├── main.ts                         # Entry point
    ├── app.module.ts                   # Root module
    ├── database/
    │   ├── database.module.ts 
    │   └── database.service.ts         # Prisma client integration
    ├── tasks/
    │   ├── dto/
    │   │    └── create-task.dto.ts
    │   ├── tasks.module.ts
    │   ├── tasks.service.ts
    │   └── tasks.controller.ts
    ├── states/
    │   ├── dto/
    │   │    ├── create-state.dto.ts
    │   │    └── reorder-states.dto.ts
    │   ├── states.module.ts
    │   ├── states.service.ts
    │   └── states.controller.ts
    ├── users/
    │   ├── dto/
    │   │    ├── create-user.dto.ts
    │   │    └── update-user.dto.ts
    │   ├── users.module.ts
    │   ├── users.service.ts
    │   └── users.controller.ts
    ├── activities/
    │   ├── utils/
    │   │    └── activity.util.ts       # for registre activty by type
    │   ├── activities.module.ts
    │   ├── activities.service.ts
    │   └── activities.controller.ts
    └── helpers/
        └── select.helper.ts            # Custom select from database helpers


⚙️ Installation & Setup

    1️⃣ Clone the repository
    git clone https://github.com/SoufianeAzri/tasks-app
    cd your-backend-repo

    2️⃣ Install dependencies
    npm install

    3️⃣ Configure environment variables

    Create a .env file in the root directory and add this database URL:

    DATABASE_URL="postgresql://neondb_owner:npg_0DJ8lAxwctmX@ep-purple-moon-agch1xpk-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

    ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:5000


🧩 Prisma Setup

    1️⃣ Generate Prisma client
    npx prisma generate

    2️⃣ Apply migrations
    npx prisma migrate deploy

🧱 Example Endpoints

    | Method   | Endpoint        | Description                           |
    | -------- | --------------- | ------------------------------------- |
    | `GET`    | `/tasks`        | Get all tasks                         |
    | `POST`   | `/tasks`        | Create a new task                     |
    | `PUT`    | `/tasks/:id`    | Update task details                   |
    | `DELETE` | `/tasks/:id`    | Delete a task (with related subtasks) |
    | `GET`    | `/dashboard`    | Get dashboard statistics              |
    | `GET`    | `/users/recent` | Get recently added users              |


🧩 Scripts

    | Command              | Description                          |
    | -------------------- | ------------------------------------ |
    | `npm run start:dev`  | Start the server in development mode |
    | `npm run build`      | Build the app for production         |
    | `npm run start:prod` | Start the app in production mode     |
    | `npx prisma studio`  | Open Prisma GUI                      |
