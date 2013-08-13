// Tentative Schema
{
  title : String,
  type : String, //'text' || 'html' || 'img' || etc...
  id: ObjectId,
  meta : {
    created : { type : Date, default: Date.now}
    modified: { type : Date}
  },
  layouts : {
    // Identifier : Layout Data
    String : Mixed, 
    String : Mixed
  },
  data : Mixed
}

