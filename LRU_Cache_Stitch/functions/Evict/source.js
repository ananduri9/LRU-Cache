exports = async function(arg){
  const clustName = context.values.get("SERVICE_NAME");
  const dbName = context.values.get("DB_NAME");
  const collName = context.values.get("COLLECTION_NAME");
  const threshold = context.values.get("limit") * 0.95;
  
  var collection = context.services.get(clustName).db(dbName).collection(collName);
  var collection2 = context.services.get(clustName).db(dbName).collection("metrics");

  
  //evict while above threshold
  while(await collection.count() > threshold){
    const [removeDoc] = await collection.find().sort({timestamp: 1}).limit(1).toArray();
    collection.deleteOne({_id: removeDoc._id});
    await collection2.insertOne({type: "delete", timestamp: Date.now()});
  }
  
};