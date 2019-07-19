# LRU-Cache for MongoDb Collection

![](images/LRUcache.png?raw=true)

* Uses MongoDB Stitch functions to wrap MongoDb methods (findOne and insertOne) to implement LRU eviction mechanism.
* Uses MongoDB Stitch triggers to regularly clear out 5% of collection if it is approaching capacity.
* React Client with MongoDb Charts to display time-series of read/writes/deletes.
