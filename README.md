# krg-test-app
## The project consists of two separate applications, server and client

1. ExpressJS server contains two route handlers which fetch posts and trackers from provided web APIs. Trackers are filled in with missing dates before being returned from the trackers route handler.

2. AngularJS client consists of the main application module and a post module where the post components, post routes, and post services are defined. Uses SystemJS along with Plugin-TypeScript to transpile TS on the fly.

Each of the applications has it's own packages.json file with separately defined dependencies.


## Run instructions

1. Install server dependencies
	`> npm install`

2. Install client dependencies
  `wwwroot > npm install`

3. Start the server
	`> npm run dev`
