# discord calendar

a calendar app with a discord bot. backend in express, frontend in next.js, bot in discord.js.

---

## what's in here

```
discord_calendar/
├── backend/        express + mongodb api
├── discord-bot/    discord.js bot
├── frontend/       next.js app
└── mobile/         nothing yet
```

---

## prereqs

before you do anything make sure you have these installed:

- [node.js](https://nodejs.org) (v18+)
- [mongodb](https://www.mongodb.com/try/download/community) running locally on port 27017
- git

---

## step 1 — get a discord bot token

1. go to [discord.com/developers/applications](https://discord.com/developers/applications)
2. click **new application**, give it a name
3. go to the **bot** tab → click **add bot**
4. copy the token (you'll need this later)
5. scroll down, enable **server members intent** and **message content intent** if you need them
6. go to **oauth2 → url generator** → check `bot` and `applications.commands`
7. open the generated url in your browser to invite the bot to your server
8. copy your server's id (right click server → copy server id, enable developer mode in discord settings first)

---

## step 2 — clone and set up folders

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
JWT_SECRET=put_a_random_secret_here
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

test it by hitting `http://localhost:5000/api/test` in your browser.

---

## step 4 — discord bot

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

open 3 terminals:

```bash
# terminal 1
cd backend && npm run dev

# terminal 2
cd discord-bot && node bot.js

# terminal 3
cd frontend && npm run dev
```

---

## current state

- backend connects to mongodb and has a test route
- discord bot logs in but doesn't do anything yet
- frontend is a blank next.js app
