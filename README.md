# Index

-   [Title](#title)
-   [Demo](#demo)
-   [Hosting](#host)
-   [Tech Stack / Dependencies](#deps)
-   [Features](#features)
-   [Run locally](#run)
-   [Authors](#authors)

<h2 id="title">Video Game Infinite Gallery</h2>

A single page video game gallery, lets users sort, filter, search and view information about video games. Built with
next.js and the RAWG API.

<h2 id="demo">Demo</h2>

[KinoWIKI](https://video-game-gallery.vercel.app/)

<h2 id="host">Hosting</h2>

This web app is hosted on [Vercel](https://vercel.com/)

<h2 id="deps">Tech Stack / Dependencies</h2>

-   [next.js](https://nextjs.org/)
-   [react](https://reactjs.org/)
-   [sass](https://sass-lang.com/)
-   [swr](https://swr.vercel.app/)
-   [redux-toolkit](https://redux-toolkit.js.org/)

<h2 id="features">Features</h2>

-   Search functionality
-   Infinite scroll
-   Custom 404 page
-   Image slider
-   Responsive design
-   Sorting video games by year, rating
-   Filter video games by platform

<h2 id="run">Run Locally</h2>

To run the project locally you have to provide your own [RAWG](https://rawg.io/apidocs) API key.

Clone the project

```bash
  git clone https://github.com/SamyZog/video-game-gallery
```

Go to the project directory

```bash
  cd video-game-gallery
```

Create <code>.env.local</code> file and run these commands replacing <code><<your_api_key>></code> with your own MovieDB
API key:

```bash
  echo "RAWG_API_KEY=<<your_api_key>>" > .env.local
```

```bash
  echo "NEXT_PUBLIC_RAWG_API_KEY=<<your_api_key>>" >> .env.local"
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

<h2 id="authors">Authors</h2>

-   [@SamyZog](https://www.github.com/SamyZog)
