app.idbDemo = {};
app.idbDemo.visitors = {};

app.idbDemo.init = function() {
	app.get('data/10.json', function (data) {
		app.idbDemo.visitors = JSON.parse(data);
		console.log(app.idbDemo.visitors);

		// delete if DB existed already to start from scratch
		indexedDB.deleteDatabase('enterJs');

		// init event listeners
		app.getEl('demoInitDb').addEventListener('click', function(e) {
			app.idbDemo.setupEnterJsDb();
		});

		app.getEl('demoFetch').addEventListener('click', function(e) {
			app.idbDemo.fetchVisitor();
		});

		app.getEl('demoIndex').addEventListener('click', function(e) {
			app.idbDemo.fetchVisitorWithIndex();
		});

		app.getEl('demoDelete').addEventListener('click', function(e) {
			app.idbDemo.deleteVisitor();
		});

		app.getEl('demoUpdate').addEventListener('click', function(e) {
			app.idbDemo.updateVisitor();
		});

		app.getEl('demoTransaction').addEventListener('click', function(e) {
			app.idbDemo.abortTransaction();
		});
	});
};


app.idbDemo.getDb = function(callback) {
	var request = indexedDB.open('enterJs', 1);
	request.onsuccess = function(event) {
		callback(event.target.result);
	}
};

app.idbDemo.roStore = function(db) {
	return db.transaction('visitors').objectStore('visitors');
};

app.idbDemo.rwStore = function(db) {
	return db.transaction('visitors', 'readwrite').objectStore('visitors');
};

app.idbDemo.readVisitors = function(db, callback) {
	var result = [];
	app.idbDemo.roStore(db).openCursor().onsuccess = function(event) {
		var cursor = event.target.result;
		if (cursor) {
			result.push(cursor.value);
			cursor.continue();
		} else {
			callback(result);
		}
	};
};

app.idbDemo.showJsonResult = function(data, description) {
	app.getEl('demoResult').textContent = JSON.stringify(data, null, '\t');
	app.getEl('idbTestResultExplanation').textContent = description;
};

/**
 * Step 1 - init database, fill with initial data
 */
app.idbDemo.setupEnterJsDb = function() {
	var request = indexedDB.open('enterJs', 1);
	var success = 0;

	// init the DB and add some additional data
	request.onupgradeneeded = function(event) {
		var db = event.target.result;

		// create store and use ID as key since it is unique
		var store = db.createObjectStore('visitors', { keyPath: 'id' });

		// create index on lastName since we might query for that often
		store.createIndex('lastName', 'lastName', { unique: false });

		// once creation of store is done add the initial data
		store.transaction.oncomplete = function(event) {
			for (var i in app.idbDemo.visitors) {
				var request = app.idbDemo.rwStore(db).add(app.idbDemo.visitors[i]);
				request.onsuccess = function(event) {
					success++;
					if(success >= app.idbDemo.visitors.length) {
						console.log('All ' + app.idbDemo.visitors.length + ' visitors persisted.');
						app.idbDemo.readVisitors(db, function(result) {
							app.idbDemo.showJsonResult(result, 'Initialized DB, stored ' + app.idbDemo.visitors.length + ' visitors and added index for lastName');
							app.getEl('demoInitDb').disabled = true;
						});
					}
				}
			}
		}
	};
};

/**
 * Step 2 - fetch a visitor from db
 */
app.idbDemo.fetchVisitor = function() {
	app.idbDemo.getDb(function(db) {
		var bench = new Date().getTime();
		app.idbDemo.roStore(db).get(8).onsuccess = function(event) {
			if(event.target.result) {
				app.idbDemo.showJsonResult(event.target.result, 'Fetched visitor 8 from db in ' + (new Date().getTime() - bench) + 'ms.');
			} else {
				app.idbDemo.showJsonResult({}, 'Tried to fetch visitor 8 but was not found');
			}
		};

		app.idbDemo.roStore(db).get(8).onerror = function(event) {
			console.log(event);
		};
	});
};

/**
 * Step 3 - use index for retrieval
 */
app.idbDemo.fetchVisitorWithIndex = function() {
	app.idbDemo.getDb(function(db) {
		var index = app.idbDemo.roStore(db).index('lastName');

		var bench = new Date().getTime();
		index.get('Kiesewetter').onsuccess = function(event) {
			app.idbDemo.showJsonResult(event.target.result, 'Found Mr. Kiesewetter via index in ' + (new Date().getTime() - bench) + 'ms');
		};
	});
};

/**
 * Step 4 - delete a visitor from db
 */
app.idbDemo.deleteVisitor = function() {
	app.idbDemo.getDb(function(db) {
		app.idbDemo.rwStore(db).delete(8);
		app.idbDemo.readVisitors(db, function(result) {
			app.idbDemo.showJsonResult(result, 'Removed visitor 8, ' + result.length + ' visitors remaining');
			app.getEl('demoDelete').disabled = true;
		});
	});
};

/**
 * Step 5 - update data for a visitor
 */
app.idbDemo.updateVisitor = function() {
	app.idbDemo.getDb(function(db) {
		var store = app.idbDemo.rwStore(db);
		store.get(1).onsuccess = function(event) {
			var data = event.target.result;

			data.city = 'Berlin';
			data.state = 'BE';
			data.zip = '12163';

			store.put(data).onsuccess = function() {
				store.get(1).onsuccess = function(event) {
					app.idbDemo.showJsonResult(event.target.result, 'Updated data for visitor 1');
				}
			};
		};
	});
};

app.idbDemo.abortTransaction = function() {
	app.idbDemo.getDb(function(db) {
		var transaction = db.transaction('visitors', 'readwrite');
		var store = transaction.objectStore('visitors');

		store.delete(1);
		store.add({
			'id':999,
			'firstName':'Karl',
			'lastName':'Malone'
		});

		transaction.abort();

		transaction.onerror = function(event) {
			alert('Error - ' + JSON.stringify(event));
		};

		app.idbDemo.readVisitors(db, function(result) {
			//app.idbDemo.showJsonResult(result, 'Aborted transaction, no changes should have been persisted');
		});
	});
};

app.idbDemo.init();