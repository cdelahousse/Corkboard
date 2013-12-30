function buildUiForExample (Corkboard, Note) {
  'use strict';
  var nav = document.getElementsByTagName('nav')[0];

  //Generate pull down of note types
  var select = nav.querySelector('#note-type');
  Corkboard.config.noteTypes.forEach(function (type) {
    var elem = document.createElement('option');
    elem.innerHTML = type;
    select.appendChild(elem);
  });

  $('#note-add').click(function () {
    var attrs = {
      data : 'Created via button',
      type : $('#note-type').val().trim().toLowerCase(),
      title : $('#note-title').val().trim()
    };

    //XXX This is stupid. To fix the doubling bug, I can't add it
    //directly to the collection. For this to work in a nicer way, I should
    //just let the collection do the model creation... Oh sigh...
    (new Note(attrs)).save();

  });
}

function getAndFetchNotes(Notes, apiUrl) {
  'use strict';
  var notes = new Notes([],{
    url : apiUrl
  });
  notes.fetch();
  return notes;

}

