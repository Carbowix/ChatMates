# ChatMates

<div align="center">
  <img src='./public/logo.png' width="100px" height="100px" />
  <h1>ChatMates</h1>
</div>

<h3 align="center">A simple online chatting platform for texting your mates</h3>

<div align="center">
  <p>
    <a href="https://github.com/Carbowix/ChatMates/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/carbowix/ChatMates?style=for-the-badge" alt="license mit"/>
    </a>
    <a href="https://github.com/Carbowix/ChatMates">
      <img src="https://img.shields.io/github/package-json/v/carbowix/ChatMates?style=for-the-badge" alt="ChatMates version"/>
    </a>
    <br>
    <a href="https://discord.gg/nntu7rgxtP">
      <img src="https://img.shields.io/discord/633795546724827157?color=5865F2&logo=discord&logoColor=white" alt="Discord server" />
    </a>
  </p>
  <br>
    <a href="https://chat-mates.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/Carbowix/ChatMates/issues">Report Bug</a>
    ·
    <a href="https://github.com/Carbowix/ChatMates/issues">Request Feature</a>
   
</div>
 <br>
<details>
<summary style="font-size: 21px;">Table of Contents</summary>
<ol>
    <li><a href="#features">Features</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
    </ul>
    <li><a href="#technologies">Technologies</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
</details>
<br>

# Features

- **Instant Messaging**: Engage in real-time text conversations with friends
- **Friend Requests**: Send and accept friend requests to connect with other users.
- **Push Notifications**: Receive instant notifications for new messages, friend requests, and more.
- **Unread Message Count**: Stay informed about unread messages with message count badges.
- **Adaptive Layout**: Tailored layout that adjusts to various screen sizes for optimal usability.

# Getting Started

## Prerequisites

- Latest [Node.js LTS](https://nodejs.org/en/download)
- [Supabase](https://supabase.com/) database
- [Pusher](https://dashboard.pusher.com/) account

## Installation

```bash
# Clone repo
git clone https://github.com/Carbowix/ChatMates.git

# Install the required packages
## Using NPM
npm install

## Using yarn (preferred)
yarn install
```

- Add your Pusher, Supabase, Google OAuth, and Next-Auth details to `.env.example` (don't forget to rename `.env` obviously)

- Push and generate the prisma schema

```bash
## Using NPM
# Generate schema
npm run postinstall
# Push schema to database
npm run prisma:push

## Using yarn (preferred)
# Generate schema
yarn postinstall
# Push schema to database
yarn prisma:push
```

- Run the application on development mode

```bash
## Using NPM
npm run dev

## Using yarn
yarn run dev
```

# Technologies

This project is heavily based on the [nextjs-postgres-auth-starter](https://github.com/vercel/nextjs-postgres-auth-starter/)

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/) for utility CSS classes
- [Next-Auth](https://next-auth.js.org/) for authentication
- [Pusher](https://dashboard.pusher.com/) for websockets
- [Supabase](https://supabase.com/) for PostgreSQL database hosting
- [Prisma](https://www.prisma.io/) for database ORM
- [ESLint](https://eslint.org/) configured with some initial rules
- [Prettier](https://prettier.io/) to enforce consistent code style

# Acknowledgements

- [SYNC INTERN's](https://www.syncinterns.com/) gave me the energy to do this project
- [ChatMates Icon](https://www.pngitem.com/middle/hommxo_chat-png-icon-free-download-searchpng-transparent-chat/) by [Vikram Basra](https://www.pngitem.com/userpic/10150/)
