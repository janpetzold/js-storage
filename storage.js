var fewVisitors = [{"id":1,"sex":"female","firstName":"Olinde","lastName":"Wegener","mail":"owegener@mail.de","phone":"018847464753","street":"Schulplatz","houseNumber":94,"city":"Lembruch","state":"HE","zip":"30334","birthDate":"1971-07-13T22:00:00.000Z"},{"id":2,"sex":"male","firstName":"Helbert","lastName":"Manz","mail":"hmanz@mail.de","phone":"060437416792","street":"Innere Löwenstr.","houseNumber":105,"city":"Kleinneuhausen","state":"BE","zip":"13013","birthDate":"1958-03-22T23:00:00.000Z"},{"id":3,"sex":"female","firstName":"Romana","lastName":"Kehr","mail":"rkehr@mail.de","phone":"055725001022","street":"Ludwigstraße","houseNumber":300,"city":"Einhaus","state":"BY","zip":"90885","birthDate":"1976-08-12T22:00:00.000Z"},{"id":4,"sex":"female","firstName":"Heidelore","lastName":"Stein","mail":"hstein@mail.de","phone":"046203432418","street":"Anton-Schuster-Str.","houseNumber":740,"city":"Willanzheim","state":"RP","zip":"30648","birthDate":"1947-11-22T23:00:00.000Z"},{"id":5,"sex":"female","firstName":"Mirjam","lastName":"Fichtner","mail":"mfichtner@mail.de","phone":"055014942094","street":"Schießgasse","houseNumber":698,"city":"Heilsbronn","state":"RP","zip":"30179","birthDate":"1977-06-20T22:00:00.000Z"},{"id":6,"sex":"female","firstName":"Britta","lastName":"Ziegler","mail":"bziegler@mail.de","phone":"042977513554","street":"Föhrenweg","houseNumber":958,"city":"Garlin","state":"SN","zip":"00372","birthDate":"1964-01-10T23:00:00.000Z"},{"id":7,"sex":"female","firstName":"Dietmute","lastName":"Schaffer","mail":"dschaffer@mail.de","phone":"050886402656","street":"Mousonstraße","houseNumber":667,"city":"Quendorf","state":"BY","zip":"90497","birthDate":"1957-07-28T22:00:00.000Z"},{"id":8,"sex":"male","firstName":"Erk","lastName":"Kiesewetter","mail":"ekiesewetter@mail.de","phone":"017549784801","street":"Gurkenallee","houseNumber":2,"city":"Löbnitz","state":"NW","zip":"40668","birthDate":"1979-01-11T23:00:00.000Z"},{"id":9,"sex":"female","firstName":"Caterina","lastName":"Wilken","mail":"cwilken@mail.de","phone":"087326272446","street":"An St. Theresia","houseNumber":612,"city":"Dippoldiswalde","state":"NW","zip":"40393","birthDate":"1955-09-22T22:00:00.000Z"},{"id":10,"sex":"female","firstName":"Hella","lastName":"Ludewig","mail":"hludewig@mail.de","phone":"034515609933","street":"Joseph Roth-Gasse","houseNumber":533,"city":"Damflos","state":"NW","zip":"33075","birthDate":"1981-07-08T22:00:00.000Z"}];

// delete if DB existed already to start from scratch
indexedDB.deleteDatabase("enterJs")

var request = indexedDB.open("enterJs", 1);

request.onerror = function(event) {
	console.log("An error occured:");
	console.log(event);
};

request.onupgradeneeded = function(event) {
	console.log("Uprade needed");
	var db = event.target.result;

	// create store and use ID since it is unique
	var store = db.createObjectStore("visitors", { keyPath: "id" });

	// create index on lastName since we might query for that often
	store.createIndex("lastName", "lastName", { unique: false });

	// once creation of store is done add the data
	store.transaction.oncomplete = function(event) {
		var visitorStore = db.transaction("visitors", "readwrite").objectStore("visitors");
		var bench = new Date().getTime();

		for (var i in fewVisitors) {
			visitorStore.add(manyVisitors[i]);
		}

		console.log('All ' + manyVisitors.length + ' visitors persisted in ' + (new Date().getTime() - bench) + 'ms');
		console.log(visitorStore);
	}
};

// get object store for DB as read-only
var roObjectStore = function(db) {
	return db.transaction("visitors").objectStore("visitors");
};

// get object store for DB read-write
var rwObjectStore = function(db) {
	return db.transaction("visitors", "readwrite").objectStore("visitors");
};

request.onsuccess = function(event) {
	console.log("DB opened");
	var db = this.result;

	// get visitor with ID 8
	roObjectStore(db).get(8).onsuccess = function(event) {
		console.log('Retrieved visitor 8');
		console.log(event.target.result);
	};

	// delete visitor with ID 5
	rwObjectStore(db).delete(5);

	// update data for visitor 2
	roObjectStore(db).get(2).onsuccess = function(event) {
		var data = event.target.result;
		console.log('Visitor 2 lives in ' + data.city);
		
		data.city = 'Berlin';

		rwObjectStore(db).put(data).onsuccess = function() {
			roObjectStore(db).get(2).onsuccess = function(event) {
				console.log('Visitor 2 now lives in ' + event.target.result.city);
			}
		};
	};

	// add a visitor we just know by first and lastName
	/*
	rwObjectStore(db).add({"id":11,"firstName":"Karl","lastName":"Malone"});

	roObjectStore(db).get(11).onsuccess = function(event) {
		console.log('Retrieved visitor 11');
		console.log(event.target.result);
	};
	*/

	// Use index to retrieve a value
	var index = roObjectStore(db).index("lastName");
	var bench = new Date().getTime();

	index.get("Kehr").onsuccess = function(event) {
		console.log('Found Mrs. Kehr via index in ' + (new Date().getTime() - bench) + 'ms');
		console.log(event.target.result);
	};
	
	// Read all entries from DB
	/*
	roObjectStore(db).openCursor().onsuccess = function(event) {
		var bench = new Date().getTime();
		var cursor = event.target.result;
		if (cursor) {
			if(cursor.key < 11) {
				console.log('ID ' + cursor.key + ' is ' + cursor.value.firstName + ' ' + cursor.value.lastName);
			}
			cursor.continue();
		} 
	};
	*/

	// Demo transaction
	var transaction = db.transaction("visitors", "readwrite");
	var store = transaction.objectStore("visitors");
	store.delete(1);
	store.add({"id":999,"firstName":"John","lastName":"Stockton"});

	transaction.abort();

	roObjectStore(db).openCursor().onsuccess = function(event) {
		var cursor = event.target.result;
		if (cursor) {
			console.log('ID ' + cursor.key + ' is ' + cursor.value.firstName + ' ' + cursor.value.lastName);
			cursor.continue();
		} 
	};

};

// helper method to read single value from index
var getFirstOccurenceByIndex = function(name) {
	indexedDB.open("enterJs", 1).onsuccess = function(event) {
		var db = this.result;
		var index = roObjectStore(db).index("lastName");

		var bench = new Date().getTime();

		index.get(name).onsuccess = function(event) {
			console.log('Found visitor with last name ' + name + ' via index in ' + (new Date().getTime() - bench) + 'ms');
			console.log(event.target.result);
		};
	}
}

// helper method to read all values from index
var allOccurencesByIndex = function(name) {
	indexedDB.open("enterJs", 1).onsuccess = function(event) {
		var db = this.result;
		var index = roObjectStore(db).index("lastName");

		var bench = new Date().getTime();

		index.openCursor().onsuccess = function(event) {
			var cursor = event.target.result;
			if (cursor) {
				if(cursor.key === name) {
					console.log('Found visitor with name ' + name + ' in ' + (new Date().getTime() - bench) + 'ms');
					console.log(cursor.value);
				}
				cursor.continue();
			};
		}
	}
}