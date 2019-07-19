exports = function(clustName, dbName, collName){

  var collection = context.services.get(clustName).db(dbName).collection(collName);
  
  var limit = context.values.get("limit");
  return collection.count().then(res => {return res + 1 > limit;} );  
};