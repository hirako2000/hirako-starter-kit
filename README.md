<p align="center">
  <a href="#"><img src="https://i.ibb.co/qY7BdkD/banner.png" /></a>
</p>

<p align="center">
  A slightly <em>opinionated</em> starter kit <br/>
  for building Node.js server.
</p>
<br/>
<br/>

<p align="center">
  <a href="#launch">Launch</a> •
  <a href="#tech">Tech</a> •
  <a href="#roadmap">Roadmap</a> •
</p>

<p align="center">
  <a href="https://travis-ci.org/hirako2000/hirako-starter-kit">
    <img src="https://travis-ci.org/hirako2000/hirako-starter-kit.svg?branch=master">
  </a>
  <a href="./License.md">
    <img src="https://img.shields.io/npm/l/slate.svg?maxAge=300">
  </a>
  <a href="https://www.codacy.com/manual/hirako2000/hirako-starter-kit">
    <img src="https://api.codacy.com/project/badge/Grade/1cca597cc64f4d9d97b2a1682ec65f7a">
  </a>
</p>

<br/>
<br/>

A start kit for building web apps using express, marko, mongoose and passport.

## Launch

```sh
git clone https://github.com/hirako2000/hirako-starter-kit.git
cd hirako-starter-kit
npm install # this will take a while depending on your internet bandwith
cp .env.example .env
npm start # Your default browser will open and load the root page
```

## Design Philosophy

- Maximize productivity and ease in development
- Guarantee ease of deployment and performance in production
- Must be easy to adopt and not force you to change the way you write your code

## Another Express boilerplate

Maybe. I checked out a number of supposedly rock solid express boilerplate, many of them don't even build or start, issues raised with no activity. It happens with open source.. I can often fix the issues, but, one or more of those dissapointing surprise follow:

- Lack of decent server rendering set up, just API. I want an API and the ablity to render structued pages already, API boilerplate are fine, but I don't want two projects, especially when prototying
- Bloated with heavy front end libraries, I need performance
- Boated with poorly configured webpack bundler, I need performance
- No proper production structure and config, good for developement, but I need a production ready foundation, or at least reasonably configurable and not having to re-write my own production build pipeline
- Lack of unit tests, lack of means to unit test anything in there or my own code
- Hard to remove dependencies such as outdated or even unmaintained libraries

So yea, I built my own. Open sourcing it for the poor bears in need of a solution.

## Opinions

The boilerplate is not what one would call opinionated. Some decisions had to be made though. A totally opinionless starter kit leads to some gaps to fill.

When incorporating a design pattern, library or framework, the question is how difficult would it be to drop it or replace with better suited alternative. If the answer is `way too difficult`, then it's left off. Choices made so far can be formulated as below:

- Server side rendering is just plain more performant than SPA. Can't beat text for templating, can't beat a server processing power (if well provisioned), and it's SEO ready with no headache.
- RESTful API. It is needed, really. Express may not be the 'best' framework for API development, but it is a very well rounded, backed by the largest community and number of solid libraries. And, most node.js developers are familiar with it.
- LessCSS. Sass is superior, I know sassy. But it requires complied binaries to execute. It's OK for dev (to some degree) but it is NOT ok for devops. Any OS distribution should be able to build the project. Some native from source compilation on some distribs is a nightmare. Been there. the LessCSS processor is written in JavaScript. that's cross platform as it only needs node.js. If you want Sass, pull it yoursef.
- MarkoJS. While the community backing this framework isn't massive, it is production ready. Other templating solutions on node.js don't support streaming, and usually adppt specific syntax to get familiar with. Marko's synstax follow JS, and even support inline JavaScript.
- OpenAPI is the most evolved standard. And, let's get serious about doc, APIs need documentation, ideally generated from source. SwaggerUI and Redoc are beautiful doc templates
- Linting. Get a life. Just follow some standard and don't waste time arguing. If you don't like the standard followed in this project, jsut change the liniting and run --fix.
- Testing. I have to admit I don't know enough about front end testing to defend what I did here. My view is, testing is vital, but can be very expensive when bootstraing and asserting the surface/UI of applications. Frigile slow tests doesn't contribute to tddd. So I favour unit test covering business logic. If you need to test the dom, go ahead.
- pm2. The license is a bit obscure, but afaik if no modification is made to its source then it's fine. It is superior to `forever` and others. Just see for yourself.

## Prerequisites

- Node.js (v10+)
- MongoDB

## Tech

- Server framework with [Express](https://expressjs.com/)
- Server side templating and streaming rendering with [Marko](https://markojs.com/)
- Route structuring with [Lumie](https://github.com/Alex-Levacher/Lumie)
- Local Authentication with [Passport.js](http://www.passportjs.org/)
- Security with [Helmet](https://helmetjs.github.io/)
- CSS foundation with [Basscss](https://basscss.com/)
- [LessCSS](http://lesscss.org/) support
- Front end asset bundling and serving with [Lasso](https://github.com/lasso-js/lasso)
- Linting with [ESLint](https://github.com/eslint/eslint)
- HTTP Logging with [Morgan](https://github.com/expressjs/morgan)
- Auto generated [Open API](https://github.com/OAI/OpenAPI-Specification) and [ReDoc](https://github.com/Redocly/redoc)/[Swagger UI](https://github.com/swagger-api/swagger-ui) documentation
- Unit test context with [SuperTest](https://github.com/visionmedia/supertest) and cases with [Jest](https://github.com/facebook/jest)
- Continuous integration with [Travis CI](https://github.com/travis-ci/travis-ci)
- Production instance mgt with [pm2](https://github.com/Unitech/pm2)
- Devop deployment with [Docker Compose](https://github.com/docker/compose)

## Roadmap

- [x] Express and server side Templating/Rendering
- [x] Mongoose
- [x] supertest and Jest
- [x] Linting
- [x] Live browser refresh on js/css and template changes
- [ ] Stand up multiple routes
- [x] Lightweight CSS library bundled in
- [x] LessCSS support
- [ ] Style themes
- [x] API with structured routing
- [x] API doc
- [x] Local auth/login/signup
- [x] Auto-generate OPENAPI spec (with Swagger-ui) and Redoc
- [ ] CSRF
- [ ] i18n
- [ ] socket.io
- [x] Docker image

# HOWTO

## Add a dependency

It's all npm managed. You can add a server or browser (front end) dependency as below.

### Server

```sh
npm install --save lodash
# or
npm install --save-dev typescript
```

```javascript
const lodash = require('lodash');
// or
import lodash from 'lodash';
```

### Browser

```sh
npm install --save lodash
```

Then edit `browser.json`

```json
{
  "dependencies": [
    "basscss/css/basscss.css",
    "basscss-btn/css/btn.css",
    "public/css/styles.less",
    "jquery/dist/jquery.slim.min.js",
    "lodash/path/to/lodash.js"
  ]
}
```

## Docker

You can also use docker for development. Make sure you run npm install on your development environment for linting and everything to work fine.

```sh
npm i
cp .env.example .env
```

Start the services

```sh
docker-compose up -d
```

View the logs

```sh
docker-compose logs -f
```

In case you install a npm module while developing, it should also be installed within docker container, to do this first install the module you want with simple `npm i module name`, then run it within docker container

```sh
docker-compose exec node npm i
```

If you make any changes to a project file, browser-refresh should automatically pick up and restart within docker (you can see this in the logs)

To run tests

```sh
docker-compose exec -e MONGODB_URL=mongodb://mongo:27017/noobjs_test node npm test
```

Note: Difference between exec and run, exec executes the command within the running container and run will spin up a new container to run that command. So if you only want to run the tests without docker-compose up, you may run `docker-compose run -e MONGODB_URL=mongodb://mongo:27017/my_app_test node npm test`

## License

MIT
