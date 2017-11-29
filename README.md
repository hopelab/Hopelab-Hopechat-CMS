# hopelab_ayachatbot_cms

## Getting Started

### Environment Variables:

To do auth on the client, we need an environment variable set in the `client` folder. This is read in to `${process.env.REACT_APP_DEV_BASIC_AUTH_STRING}` in `/src/utils/data.js` and is the bootstrapping function for the client. To add this variable, add a `.env` file in the root of `client`. It has one variable currently, `REACT_APP_DEV_BASIC_AUTH_STRING`. The value of this is the base 64 encoded value of the username and password combination that should be used to enter the site. You can get this through any JS REPL by doing `btoa('username:password')` where `username` and `password` were both the ones you wanted to use. Once this is in place, the create react app build will pick this up and inject the value into the script.

Also, here is a list of other environment variables that the CMS uses for Redis and AWS:

```bash
REDIS_HOST
REDIS_PORT
AWS_BUCKET
AWS_ACL
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
```

This repo is using [config](https://www.npmjs.com/package/config) to manage environment variables and fallback to defaults in case of something missing.

### Code Structure

The CMS is split into two pieces, the `client` and `server`. The server is using the same `Redis` db that the Bot reads the message content from. There are a series of endpoints and controllers that manage all `CRUD` operations for a given entity.

The `client` is a `create-react-app` scaffold with some additional packages for UI components.

In production, the server will server the generated `client` build from `client/build`. In `DEV`, calls from the client are proxied to the `server` with hot reloading. In `DEV`, there will be two processes running for the CMS, one for the `server` and one for the `client`. In prod, it should just need to run the server.

To install dependencies:

```bash
yarn
```

### Run App:

```bash
yarn run start
```

### Run Tests:

```bash
yarn run test
```

### Run Coverage:

```bash
yarn run coverage
```

### Run Prettier:

```bash
yarn run prettify
```

### Run Linting:

```bash
yarn run lint
```

### Setup a Mock DB with some fake data:

This doesn't actually load mock data, but will reset the database to defaults.

```bash
yarn run mock-db
```
