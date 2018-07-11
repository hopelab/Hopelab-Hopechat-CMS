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

#### AWS Specific Credentials

You can set AWS_SECRET_ACCESS_KEY and AWS_ACCESS_KEY_ID in either the aws credentials file, which you should create at ~.aws/credentials, or as environmental variables. The current default config created in ./server/config/default.js uses the aws-sdk to load this .aws/credentials file as the default user access. This credential file is used elsewhere to auth ssh commands. Therefore it is my recommendation that this is where you store your personal credentials. You can use the following format:

[default]
aws_secret_access_key=secret_access_key_here!!
aws_access_key_id=access_key_id_here!!
region=us-west-2b

#### config
This repo is using [config](https://www.npmjs.com/package/config) to manage environment variables and fallback to defaults in case of something missing.

### Code Structure

The CMS is split into two pieces, the `client` and `server`. The server is using the same `Redis` db that the Bot reads the message content from. There are a series of endpoints and controllers that manage all `CRUD` operations for a given entity.

The `client` is a `create-react-app` scaffold with some additional packages for UI components.

In production, the server will server the generated `client` build from `client/build`. In `DEV`, calls from the client are proxied to the `server` with hot reloading. In `DEV`, there will be two processes running for the CMS, one for the `server` and one for the `client`. In prod, it should just need to run the server.

### Run App:

Dependencies are installed from two `package.json` files, one is in the root and the second is in `/client`:

```bash
yarn
```

Run the CMS client locally from `/client`:
```bash
yarn start
```

Run the CMS server from root:
```bash
yarn start
```

### Redis DB
This app uses redis to persist data. The redis server is automatically started when you run the CMS server. You can check that it is running in a different terminal using:

```bash
redis-cli ping
```
it should return PONG.

It is possible to set which db is used on startup by modifying the dump.rb file located where the binary for redis is installed.


### Run Tests:

```bash
yarn test
```

### Run Coverage:

```bash
yarn coverage
```

### Run Prettier:

```bash
yarn prettify
```

### Run Linting:

```bash
yarn lint
```

### Setup a Mock DB with some fake data:

This doesn't actually load mock data, but will reset the database to defaults.

```bash
yarn run mock-db
```
