app.testDataObject = {};
app.testDataString = '';
app.fiveMbData = {};

app.ls = {};
app.idb = {};

// init
app.init = function() {
	// fetch data to test storage limits and serialization/deserialization
	app.get('data/40.json', function (data) {
		app.testDataObject = data;
		app.testDataString = JSON.stringify(data);

		// reset localStorage and IndexedDB
		window.localStorage.clear();
		indexedDB.deleteDatabase("db");
	});

	app.get('data/20750.json', function (data) {
		app.fiveMbData = data;
		app.getEl('triggerStringify').disabled = false;
		app.getEl('triggerParse').disabled = false;
	});

	// get IndexedDB quota
	app.idb.getIndexedDbQuota();

	// init event handlers
	app.getEl('triggerStringify').addEventListener("click", function(e) {
		app.ls.stringifyData(app.fiveMbData);
	});

	app.getEl('triggerParse').addEventListener("click", function(e) {
		app.ls.parseData(JSON.stringify(app.fiveMbData));
	});

	app.getEl('triggerMaxLocalStorage').addEventListener("click", function(e) {
		e.target.disabled = true;
		app.ls.determineMaxLocalStorage(1);
	});

	app.getEl('triggerMaxIndexedDbStorage').addEventListener("click", function(e) {
		e.target.disabled = true;
		app.idb.initIndexedDb(function() {
			app.idb.determineMaxIndexedDb(1);
		});
	});
};

app.ls.determineMaxLocalStorage = function(offset) {
	offset++;

	try {
		var bytes = app.getBytesFromObject(app.testDataString);
		window.localStorage.setItem(offset, app.testDataString);
		app.getEl('maxLocalStorageStatus').textContent = 'Stored ' + app.getKBytes(offset * bytes) + ' kB (approx. ' + app.getMBytes(offset * bytes) + ' MB) successfully';
		app.ls.determineMaxLocalStorage(offset);
	} catch (e) {
		console.log(e);
		app.getEl('maxLocalStorageStatus').textContent = app.getEl('maxLocalStorageStatus').textContent + ' - Exception: ' + e.message;
		app.getEl('triggerMaxLocalStorage').disabled = false;
	}
};

app.ls.stringifyData = function(data) {
	var start = new Date().getTime();
	JSON.stringify(data);
	app.getEl('stringifyStatus').textContent = 'Stringified 5MB in ' + (new Date().getTime() - start) + 'ms';
};

app.ls.parseData = function(data) {
	var start = new Date().getTime();
	JSON.parse(data);
	app.getEl('parseStatus').textContent = 'Parsed 5MB in ' + (new Date().getTime() - start) + 'ms';
};

app.idb.initIndexedDb = function(callback) {
	var request = indexedDB.open("db", 1);

	request.onupgradeneeded = function(event) {
		var db = event.target.result;
		var store = db.createObjectStore("items", { keyPath: "id" });

		store.transaction.oncomplete = function(event) {
			var itemStore = db.transaction("items", "readwrite").objectStore("items");
			callback();
		}
	}
};

app.idb.getIndexedDbQuota = function() {
	if(window.webkitStorageInfo) {
		window.webkitStorageInfo.queryUsageAndQuota(webkitStorageInfo.TEMPORARY, function(used, remaining) {
	  		app.getEl('indexedDbQuota').textContent = app.getEl('indexedDbQuota').textContent + app.getMBytes(used + remaining) + ' MB';
		}, function(e) {
			console.log('Could not determine quota:');
	  		console.log(e); 
		});
	} else {
		app.getEl('indexedDbQuota').textContent = app.getEl('indexedDbQuota').textContent + ' N/A';
	}
};

app.idb.determineMaxIndexedDb = function(offset) {
	offset++;
	
	var item = {
		id: offset,
		data: app.testDataObject
	};

	try{
		indexedDB.open("db", 1).onsuccess = function(event) {
			var db = this.result;
			var store = db.transaction("items", "readwrite").objectStore("items");

			var request = store.add(item);

			request.onsuccess = function(event) {
				// event.target.result == customerData[i].ssn;
				var bytes = app.getBytesFromObject(app.testDataString);
				app.getEl('maxIndexedDbStorageStatus').textContent = 'Stored ' + app.getKBytes(offset * bytes) + ' kB (approx. ' + app.getMBytes(offset * bytes) + ' MB) successfully';
				app.idb.determineMaxIndexedDb(offset);
			};

			request.onerror = function(event) {
				console.log(event);
			};
		}
	} catch(e) {
		console.log(e);
		app.getEl('triggerMaxIndexedDbStorage').disabled = false;
	}
};

// initialize everything
app.init();