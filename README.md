# discord calendar

a calendar app with a discord bot. backend in express, frontend in next.js, bot in discord.js.

---

## what's in here

```
discord_calendar/
├── backend/        express + mongodb api
├── discord-bot/    discord.js bot
└── frontend/       next.js app
```

---

## prereqs

install these before anything else:

- [node.js](https://nodejs.org) v18+ — download and run the installer, check with `node -v`
- [mongodb community](https://www.mongodb.com/try/download/community) — install and make sure it's running on port 27017
  - windows: it runs as a service automatically after install
  - mac: `brew install mongodb-community` then `brew services start mongodb-community`
- git

---

## dependencies

each folder has its own `package.json`. running `npm install` inside each one pulls everything in.

**backend** (`backend/`)

| package | what it does |
| --- | --- |
| express | web server framework |
| mongoose | connects to mongodb, defines schemas |
| cors | lets the frontend talk to the backend |
| bcrypt | hashes passwords |
| jsonwebtoken | makes and verifies jwt tokens |
| socket.io | real-time events |
| node-schedule | runs tasks on a schedule |
| dotenv | loads `.env` into `process.env` |
| nodemon *(dev)* | auto-restarts server when you save a file |

**discord-bot** (`discord-bot/`)

| package | what it does |
| --- | --- |
| discord.js | discord api wrapper |
| dotenv | loads `.env` into `process.env` |

**frontend** (`frontend/`)

| package | what it does |
| --- | --- |
| next | react framework, handles routing and ssr |
| react | ui library |
| axios | makes http requests to the backend |
| socket.io-client | connects to the backend for real-time events |
| react-big-calendar | calendar ui component |
| date-fns | date formatting and math |
| tailwindcss *(dev)* | utility css styling |
| typescript *(dev)* | type checking |

---

## step 1 — get a discord bot token

1. go to [discord.com/developers/applications](https://discord.com/developers/applications)
2. click **new application**, give it a name
3. go to the **bot** tab → click **add bot**
4. copy the token (you'll need this later)
5. scroll down, enable **server members intent** and **message content intent**
6. go to **oauth2 → url generator** → check `bot` and `applications.commands`
7. open the generated url in your browser to invite the bot to your server
8. copy your server id — right click the server name → copy server id (need developer mode on: discord settings → advanced → developer mode)

---

## step 2 — clone the repo

```bash
git clone <your-repo-url>
cd discord_calendar
```

---

## step 3 — backend

```bash
cd backend
npm install
```

create a `.env` file inside `backend/`:

```env
MONGO_URI=mongodb://localhost:27017/discord_calendar
JWT_SECRET=put_any_random_string_here
PORT=5000
NODE_ENV=development
```

run it:

```bash
npm run dev
```

you should see:

```
server running on http://localhost:5000
MongoDB connected
```

hit `http://localhost:5000/api/test` in your browser to confirm it's working.

---

## step 4 — discord bot

open a new terminal:

```bash
cd discord-bot
npm install
```

create a `.env` file inside `discord-bot/`:

```env
DISCORD_TOKEN=your_bot_token_here
DISCORD_GUILD_ID=your_server_id_here
```

run it:

```bash
node bot.js
```

you should see:

```
discord bot logged in as yourbot#1234
```

---

## step 5 — frontend

open another terminal:

```bash
cd frontend
npm install
```

create a `.env.local` file inside `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

run it:

```bash
npm run dev
```

frontend is at `http://localhost:3000`.

---

## running everything at once

you need 3 terminals open:

```bash
# terminal 1 — backend
cd backend && npm run dev

# terminal 2 — discord bot
cd discord-bot && node bot.js

# terminal 3 — frontend
cd frontend && npm run dev
```

---

## current state

- backend connects to mongodb and has a test route
- discord bot logs in but doesn't do anything yet
- frontend is a blank next.js app
