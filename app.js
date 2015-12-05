var MongoClient = require('mongodb').MongoClient , assert = require('assert');

//connection URL
var url = 'mongodb://localhost:27017';
//console.log("here");
// Use connect method to connect to the Server
MongoClient.connect(url, function(err,db) {
	assert.equal(null, err);
	console.log("here");
	createUsers(db, function() {
		updateUser(db, function() {
			findUsers(db, function() {
				db.close();
			});
		});
		
	});
	
});

var createUsers = function(db, callback) {
	//get the users collection
	var collection = db.collection('users');
	collection.insert([
		{a: 1}
		], function(err, result) {
			assert.equal(err, null);
			assert.equal(1, result.result.n);
			assert.equal(1, result.ops.length);
			console.log("inserted");
			callback(result);
		});
}

var updateUser = function(db, callback) {
	// get the Users collection
	var collection = db.collection('users');
	//insert some documents
	collection.update({ a : 1 },
		{ $set: {b : 1 } }, function(err, result) {
			assert.equal(err, null);
			assert.equal(1, result.result.n);
			console.log("updated b to 2");
			callback(result);
		});
}

var findUsers = function(db, callback) {
	var collection = db.collection('users');

	collection.find({}).toArray(function(err, docs) {
		console.log("finding docs");
		assert.equal(err,null);
		assert.equal(4, docs.length);
		console.dir(docs);
		callback(docs);
	});
}