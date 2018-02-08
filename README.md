# Idea Jar Server

> A server used to store ideas in a database

My roommates and I wanted to start working on projects together in our spare time.
We talked about having a jar full of ideas to pull from, so why not make that our first project!

<img src="https://media.giphy.com/media/3o7TKpWMuZga6QURwI/giphy.gif" width="550" />

## Getting Started

To start the server, first clone the repository. Then install the dependencies:

```bash
npm install
```

Before you can start the server, you must supply some environment variables.

Name | Description | Required | Default
--- | --- | --- | ---
`MONGO_DBNAME` | The database name to use inside the instance of MongoDB. | Yes | None
`MONGO_HOST` | The hostname to use to access the MongoDB instance. | Yes | None
`MONGO_PASSWORD` | The password to access the MongoDB instance. | No | None
`MONGO_PORT` | The port to use to access the MongoDB instance. | No | 27017
`MONGO_USER` | The username to access the MongoDB instance. | No | None

You can start the server in two different modes: development mode and production mode.

Development mode uses Nodemon to reload the server on code changes. To start the server in
development mode, issue the following command:

```bash
npm run dev
```

To start the server in production mode, issue the following command:

```bash
npm start
```

## License

MIT
