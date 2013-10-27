# Corkboard
A generic card wall framework.

## What is Corkboard?
Kan Ban boards, agile card walls, affinity diagrams, etc. are all
specific implementations of generic card walls. This framework aims to simplify the
contruction of multi-user, multi-touch card wall based applications. It mostly
consists of way to structure code and offers pre-built modules.

## Basics
The documentation will use the following terms.

### Note
This is the abstract piece of information a user manipulates on screen.

### Note Type
All note content is an instantiation of a Note Type. Types can be anything the
developer defines, such as Text, Image, or Chart Types. They must be defined.

### Note Bezel
This is the interface that surrounds every individual note and allows a user to
switch the note to edit mode, delete the note from the workspace, etc.

### Layouts
Layouts manage how the notes are layed out over an area. It defines how the user
can manipulate them, how new notes are added to the layout, etc.

### Workspace
Workspaces are where the developer will be doing most application level work.
They take a layout, styling and logic to be shaped into a space where the user
will be manipulating notes. Workspaces are basically the logic and chrome built
around layouts.

### Walls
The Corkboard framework supports switching amongst multiple workspaces. The
composite of these workspaces is called a Wall.

### App View
The high level application interface.

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

8. Navigate your browser to `http://localhost:3000`

## Directory Structure

There are two major parts to this project, the client and server, along with the
project root that contains various project related files.

### Project Root

`./`

`bower.js` and `package.js` are used for server and client package management.
Add dependencies to these files. Corkboard uses the grunt build system with
`Gruntfile.js` being used for build configuration.

### Server

`./server`

Currently, the back end is very simple and implements simple CRUD functionality.
It communicates over WebSockets using Socket.io. Most of the application logic
is in `app.js`. Configuration details are in `config.js`.

### Client

`./client/`

#### Markup

Corkboard based Single Page Applications (SPA) load only one HTML file
(`./client/index.html`). The file includes Require.js to take care of
dynamically loading the rest of the client and `./client/scripts/boot.js` to
bootstrap the application.

#### Scripts

All the client side JavaScript is located at `./client/scripts/`. Aside from
`behaviours`, `collections` and `models`, the rest of the directories contain
Backbone.js views.

##### `./client/scripts/`

* `boot.js` bootstraps the SPA and defines Require.js' paths.
* `config.js` contains configuration constants.
* `utils.js` contains application wide helper functions.
* `sockets.js` contains the web sockets specific code.

#### `./client/scripts/core/`

These are the core views that all Note Types, Workspaces, and Walls will inherit
from. It is inadvisable to modify these. `App.js` is the application interface.
`NoteBezel.js` contains the interface for individual Note instances.

#### `./client/scripts/types/`

All note content are instances of Note Types that inherit from
`./[..]/core/Type.js` and are defined here. To define new types, copy and modify
`NewType.js` and update `./[..]/config.js`.

#### `./client/scripts/layouts/[...]`

Layouts consist of a wrapper (`Wrapper.js`) that wrap a Note View instance
and a layout manager (`Layouts.js`) that add, remove, manage Notes within the
layout. The layout takes it's name from the directory that contains these two
files.

Layouts should offer a `.add()` and `.remove()` methods that take a Note view to
be added to the layout.

#### `./client/scripts/behaviours/`

UI behaviour and interaction logic is defined in these files.

The `Drag.js` constructor takes a Backbone view to be bound to, and the Drag
instance offers `.end()`, `.start()`, `.move()`, `.cancel()` hooks that are fed
handlers. The `this` keyword within these handlers is the view `Drag` is bound
to.

#### `./client/scripts/models/Note.js`

The model class that represents a Note's data.

#### `./client/scripts/collections/Notes.js`

The class that represents a collection of Note models.

### CSS

* `./client/styles/main.css` application wide css

The following are automatically loaded with their associated views.

* `./client/styles/types/` Note type specific css.
* `./client/styles/layouts/` Layout specific css.

### Templates

All dynamically loaded templates are located at `./client/templates/`.

## TODO
### Features
* BB router
* mobile edition (preview)

### Interaction
* Mouse interaction
* Reordering notes (to front) on drag.

### Small items
* Nested models on client (meta and layouts)
* re-order nested note type css classes

### Nav
* Add validation

### Annoyances
* Validation on client side
* Validation on server side
* Clean db output ( eg: remove `__v`)
* have proper ID's (not mongo `_id`)

### Structural TODO
* replace ioBind with home built solution
* Have flat file or embedded replacement to MongoDB

### ioBind Bugs
* make ioBind ACTUALLY a drop in replacement
* remove update event from model
* inherit model rootURL from collection
* remove window.socket dependency
* urlRoot on model should be able to have leading slash
* model socket should inherit from collection, not window.socket
* I can't add the instance of the model directly to a collection without the
  doubling bug.

