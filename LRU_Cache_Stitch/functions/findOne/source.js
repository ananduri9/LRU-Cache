exports = async function(query, clustName, dbName, collName){
  
  var collection = context.services.get(clustName).db(dbName).collection(collName);
  var collection2 = context.services.get(clustName).db(dbName).collection("metrics");
  
  
  var doc = await collection.findOne(query);
  
  await collection2.insertOne({type: "read", timestamp: Date.now()});
  
  await collection.updateOne({_id: doc._id}, {name: doc.name, timestamp: Date.now()}); //update timestamp for LRU cache
  
  return doc;

};
