exports = async function(){
  var db = context.services.get("LRU").db("testdb");
  
  console.log(await db.collection("test").stats());
   
};