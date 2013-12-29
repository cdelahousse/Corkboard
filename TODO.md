## Near Term Roadmap

### Features
* BB router
* mobile edition (preview)
* update notes using cell phone
* Add more tests

## Dragging
* fix issue when dragging images (ghosting)

### Column Layout
* Column layout column grows as you hover over (build as mixin or decorator)
* Column names (layout) (array in constructor);
* fix CSS names for column layout. Make it inherit from parent.

### Free Layout
* persist relative note orderings to DB
* modulus the zIndexes

### Small items
* Nested models on client (meta and layouts)
* re-order nested note type css classes
* utils.loadCSS should only load CSS once

### Types
* New "Preview Note Type" where note has short description and then button show
  full description (Modal or something else);

### Nav
* Add validation

### Annoyances
* Validation on client side
* Validation on server side
* Clean db output ( eg: remove `__v`)
* have proper ID's (not mongo `_id`)

### Structural TODO
* Use CSS preprocessor. Less because it doesn't have RUBY dep.
* Use backbone.Marionette
* replace ioBind with home built solution
* Decouple DB from model representation.
* Have flat file or embedded replacement to MongoDB.
    * Questions: Mongoose compatibility? Persistence
    * TingoDB (http://www.tingodb.com/)
    * NuDB (https://github.com/louischatriot/nedb/)

### ioBind Bugs
* iobind in not compatible with backbone 1.1
* make ioBind ACTUALLY a drop in replacement
* remove update event from model
* inherit model rootURL from collection
* remove window.socket dependency
* urlRoot on model should be able to have leading slash
* model socket should inherit from collection, not window.socket
* I can't add the instance of the model directly to a collection without the
  doubling bug.

