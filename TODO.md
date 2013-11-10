## Near Term Roadmap

### Features
* BB router
* mobile edition (preview)
* update notes using cell phone

### Interaction
* Mouse interaction
* Reordering notes (to front) on drag.
* persist relative orderings to DB
* modulus the zIndexes
* review method (event) interface for Behaviours

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
* Use backbone.Marionette
* replace ioBind with home built solution
* Decouple DB from model representation
* Have flat file or embedded replacement to MongoDB. 
    * Questions: Mongoose compatibility? Persistence
    * TingoDB (http://www.tingodb.com/)
    * NuDB (https://github.com/louischatriot/nedb/)

### ioBind Bugs
* make ioBind ACTUALLY a drop in replacement
* remove update event from model
* inherit model rootURL from collection
* remove window.socket dependency
* urlRoot on model should be able to have leading slash
* model socket should inherit from collection, not window.socket
* I can't add the instance of the model directly to a collection without the
  doubling bug.

