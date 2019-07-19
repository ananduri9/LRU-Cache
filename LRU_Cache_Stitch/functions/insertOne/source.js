exports = async function(doc, clustName, dbName, collName){
  doc.timestamp = Date.now();   //update timestamp for LRU cache

  var collection = context.services.get(clustName).db(dbName).collection(collName);
  var collection2 = context.services.get(clustName).db(dbName).collection("metrics");
  
  //now evict if necessary
  var isFull = await context.functions.execute("isFull", clustName, dbName, collName);
  if(isFull) {
    const [removeDoc] = await collection.find().sort({timestamp: 1}).limit(1).toArray();
    collection.deleteOne({_id: removeDoc._id});
    await collection2.insertOne({type: "delete", timestamp: Date.now()});
  }

    await collection2.insertOne({type: "write", timestamp: Date.now()});

  return collection.insertOne(doc);
};