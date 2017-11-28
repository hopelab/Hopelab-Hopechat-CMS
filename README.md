# hopelab_ayachatbot_cms

## Getting Started

### Environment Variables:

To do auth on the client, we need an environment variable set in the `client` folder. This is read in to `${process.env.REACT_APP_DEV_BASIC_AUTH_STRING}` in `/src/utils/data.js` and is the bootstrapping function for the client. To add this variable, add a `.env` file in the root of `client`. It has one variable currently, `REACT_APP_DEV_BASIC_AUTH_STRING`. The value of this is the base 64 encoded value of the username and password combination that should be used to enter the site. You can get this through any JS REPL by doing `btoa('username:password')` where `username` and `password` were both the ones you wanted to use. Once this is in place, the create react app build will pick this up and inject the value into the script.

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

```bash
yarn run mock-db
```

## Code Structure

TODO: add details about code structure

## Application Architecture

TODO: add details about application architecture