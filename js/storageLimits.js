app.testDataObject = {};
app.testDataString = '';
app.fiveMbData = {};

app.ls = {};
app.idb = {};

// init
app.init = function() {
	// check browsers capabilities for localStorage, IndexedDB and ServiceWorker
	if (window.localStorage) {
		app.getEl('localStorageAvailable').textContent = 'available';
		app.getEl('localStorageAvailable').style.color = '#2CAE23';
	}

	if (window.indexedDB) {
		app.getEl('indexedDbAvailable').textContent = 'available';
		app.getEl('indexedDbAvailable').style.color = '#2CAE23';
	}

	if ('serviceWorker' in navigator) {
		app.getEl('serviceWorkerAvailable').textContent = 'available';
		app.getEl('serviceWorkerAvailable').style.color = '#2CAE23';
	}

	// fetch data to test storage limits and serialization/deserialization
	app.get('data/40.json', function (data) {
		app.testDataObject = data;
		app.testDataString = JSON.stringify(data);

		// reset localStorage
		if(window.localStorage) {
			window.localStorage.clear();
		}
	});

	app.get('data/20750.json', function (data) {
		app.fiveMbData = data;
		app.getEl('triggerStringify').disabled = false;
		app.getEl('triggerParse').disabled = false;
	});

	// get IndexedDB quota
	app.idb.getIndexedDbQuota();

	// init event handlers
	if(document.addEventListener) {
		app.getEl('triggerStringify').addEventListener('click', function (e) {
			app.ls.stringifyData(app.fiveMbData);
		});

		app.getEl('triggerParse').addEventListener('click', function (e) {
			app.ls.parseData(JSON.stringify(app.fiveMbData));
		});

		app.getEl('triggerMaxLocalStorage').addEventListener('click', function (e) {
			e.target.disabled = true;
			app.ls.determineMaxWebStorage('Local');
		});

		app.getEl('triggerMaxSessionStorage').addEventListener('click', function (e) {
			e.target.disabled = true;
			app.ls.determineMaxWebStorage('Session');
		});

		app.getEl('triggerMaxIndexedDbStorage').addEventListener('click', function (e) {
			e.target.disabled = true;
			app.idb.initIndexedDb(function () {
				indexedDB.deleteDatabase('db');
				app.idb.determineMaxIndexedDb();
			});
		});
	}
};

app.ls.determineMaxWebStorage = function(type, offset) {
	if(!offset) {
		offset = 1;
	}

	var bytes = app.getBytesFromObject(app.testDataString);
	offset++;

	try {
		if(type === 'Local') {
			window.localStorage.setItem(offset, app.testDataString);
		} else {
			window.sessionStorage.setItem(offset, app.testDataString);
		}
		app.getEl('max' + type + 'StorageStatus').textContent = 'Stored ' + app.getKBytes(offset * bytes) + ' kB (approx. ' + app.getMBytes(offset * bytes) + ' MB) successfully';
		app.ls.determineMaxWebStorage(type, offset);
	} catch (e) {
		console.log(e);
		app.getEl('max' + type + 'StorageStatus').textContent = app.getEl('max' + type + 'StorageStatus').textContent + ' - Exception: ' + e.message;
		app.getEl('triggerMax' + type + 'Storage').disabled = false;
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
	var request = indexedDB.open('db', 1);

	request.onupgradeneeded = function(event) {
		var db = event.target.result;
		var store = db.createObjectStore('items', { keyPath: 'id' });

		store.transaction.oncomplete = function(event) {
			var itemStore = db.transaction('items', 'readwrite').objectStore('items');
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
	if(!offset) {
		offset = 1;
	}

	offset++;
	
	var item = {
		id: offset,
		data: app.testDataObject
	};

	try{
		indexedDB.open('db', 1).onsuccess = function(event) {
			var db = this.result;
			var store = db.transaction('items', 'readwrite').objectStore('items');

			var request = store.add(item);

			request.onsuccess = function(event) {
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