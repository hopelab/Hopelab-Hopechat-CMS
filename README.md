# hopelab_ayachatbot_cms

## Getting Started

### License Terms

1.	License:  Subject to the terms and conditions of this license (“License”), Hopelab Foundation, Inc. (“Licensor”) hereby grants to you (“Licensee”) a worldwide, nonexclusive, royalty-free license to reproduce, distribute, create derivative works of, and publicly display and perform Licensor’s content management system and any related documentation accompanying the Program and this license (“Program”) subject at all times to the conditions below:

2.	License Conditions:  Licensee agrees to the conditions below and represents and warrants that it will:
(A)	use the Program solely for educational, research, charitable, or similar noncommercial purposes;
(B)	include a copy of this License (and of all other applicable licenses relating to computer code incorporated in the Program as noted in this license (“Third-Party Licenses”)) in all copies of the Program and derivative works of the Program;
(C)	include the following copyright notice: © 2019 Hopelab Foundation, Inc. (and all other copyright notices required by Third-Party Licenses relating to computer code incorporated in the Program) in all copies of the Program and derivative works of the Program;
(D)	indicate if Licensee has modified the Program; Licensee may add Licensee’s own copyright statement to its modified Program; and 
(E)	comply with all terms of this License and of Third-Party Licenses.

3.	No Warranties.  THE PROGRAM IS PROVIDED "AS IS" AND “AS AVAILABLE” WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE (EVEN IF THE PURPOSE HAS BEEN DISCLOSED), TITLE, NONINFRINGEMENT, COMPLETENESS, ACCURACY OR THAT THE PROGRAM IS FREE FROM DEFECTS.  LICENSOR WILL NOT BE LIABLE FOR ANY LOSS, DAMAGE, OR OTHER LIABILITY OF ANY NATURE ARISING FROM ANY CLAIM, WHETHER BASED ON CONTRACT, TORT (INCLUDING NEGLIGENCE) OR OTHER LEGAL OR EQUITABLE THEORY, ARISING IN ANY WAY FROM THE USE OF, OR INABILITY TO USE, THE PROGRAM.  LICENSEE ASSUMES THE ENTIRE AND SOLE RISK ASSOCIATED WITH EXERCISE OF THIS LICENSE AND USE OF THE PROGRAM.  In no circumstance will Licensor be liable to Licensee or any other party for any direct, indirect, special, incidental, consequential, punitive, or similar damages of any character as a result of this License or the use of, or inability to use, the Program. 

4.	Use of Name.  Licensee may not: (A) use Licensor’s name, trademarks, or service marks without Licensor’s prior written permission in each case; or (B) imply that Licensor endorses Licensee or any Licensee software, service, product, or activities. 

5.	General.  This License: (A) is the entire agreement between Licensor and Licensee and may be modified only by an amendment signed by both parties; (B) is governed by the laws of California, which state will be the exclusive venue for any action arising from this License.  The rights granted under this License will terminate automatically if Licensee fails to comply with this License.  The United Nations Convention on Contracts for the International Sale of Goods does not apply to the Program or this License.  Licensee is solely responsible for complying with any applicable export administration and export control regulations and laws of the United States or other countries.


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


### Run Tests:

Server Tests
```bash
yarn test
```

Client Tests
```bash
cd client && yarn test
```


### Run Coverage:

server
```bash
yarn coverage
```

Client Tests
```bash
cd client && yarn coverage
```

### Run Prettier:

```bash
yarn prettify
```

### Run Linting:

```bash
yarn lint
```

Client
```bash
cd client && yarn lint
```

### Setup a Mock DB with some fake data:

This doesn't actually load mock data, but will reset the database to defaults. This is required for the tests to pass

```bash
yarn run mock-db
```

### Redis DB
This app uses redis to persist data. The redis server is automatically started when you run the CMS server. You can check that it is running in a different terminal using:

```bash
redis-cli ping
```
it should return PONG.

It is possible to set which db is used on startup by modifying the dump.rb file located where the binary for redis is installed.

See the hopelab_ayachatbot repo readme for much more information on getting a copy of the production/staging db on your machine, and for more manipulation of the db/redis system in general
