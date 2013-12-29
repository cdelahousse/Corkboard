#Installation

## Dependencies

To get up and running, you'll need some type of Unix like OS with MongoDB,
node.js, Bower and NPM. The remaining server and client side dependencies will
be fulfilled through Bower and NPM. They include Backbone.js, Express.js,
Socket.io, ioBind, Mongoose, Grunt.js, and Require.js`

## Installation
1. Install node.js, MongoDB, node.js, Bower and NPM.
2. Clone this project
3. Navigate to the directory

    `cd corkboard`

4. Download dependencies

    `npm install`
    `bower install`

5. Have a look at the configuration files

  `vim ./server/config.js`
  `vim ./client/scripts/config.js`

6. Make sure MongoDB is running.

7. Run the app

  `node server/app.js`

8. Navigate your browser to `http://localhost:60100`

## Tests

Front End unit tests can be found in `tests/unit`. First, navigate to that
folder and run `bower install`. Run the tests by using `grunt unit`.
