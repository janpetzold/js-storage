// dataset - 40 entries, approx. 10 kBytes
var data = [{"id":1,"sex":"female","firstName":"Danica","lastName":"Bremer","mail":"dbremer@mail.de","phone":"021876898806","street":"Kattensteert","houseNumber":284,"city":"Eggstätt","state":"SH","zip":"20302","birthDate":"1962-06-19T22:00:00.000Z"},{"id":2,"sex":"male","firstName":"Micha","lastName":"Baltes","mail":"mbaltes@mail.de","phone":"018475586863","street":"Reinborner Weg","houseNumber":348,"city":"Pleinfeld","state":"SL","zip":"60329","birthDate":"1945-03-09T23:00:00.000Z"},{"id":3,"sex":"male","firstName":"Giselher","lastName":"Heizmann","mail":"gheizmann@mail.de","phone":"097187064375","street":"Donathstraße","houseNumber":18,"city":"Löf","state":"RP","zip":"60836","birthDate":"1969-08-11T22:00:00.000Z"},{"id":4,"sex":"male","firstName":"Karlfrieder","lastName":"Marx","mail":"kmarx@mail.de","phone":"077570295950","street":"Schaberschulstraße","houseNumber":988,"city":"Dötlingen","state":"BB","zip":"10308","birthDate":"1974-01-02T23:00:00.000Z"},{"id":5,"sex":"male","firstName":"Siegfrid","lastName":"Dittmar","mail":"sdittmar@mail.de","phone":"026839317897","street":"Innsbrucker Straße","houseNumber":131,"city":"Kollweiler","state":"BY","zip":"90368","birthDate":"1970-10-07T22:00:00.000Z"},{"id":6,"sex":"male","firstName":"Hansgeorg","lastName":"Fleischmann","mail":"hfleischmann@mail.de","phone":"047901354389","street":"Ullrich-Huber-Weg","houseNumber":584,"city":"Halvesbostel","state":"HH","zip":"22054","birthDate":"1963-05-17T22:00:00.000Z"},{"id":7,"sex":"male","firstName":"Raik","lastName":"Drews","mail":"rdrews@mail.de","phone":"066380736872","street":"Charlotte-Bühler-Straße","houseNumber":569,"city":"Mengerskirchen","state":"BY","zip":"80024","birthDate":"1972-07-08T22:00:00.000Z"},{"id":8,"sex":"female","firstName":"Christel","lastName":"Burkhard","mail":"cburkhard@mail.de","phone":"082637855431","street":"Heidberg","houseNumber":716,"city":"Unkel","state":"HH","zip":"22099","birthDate":"1981-08-26T22:00:00.000Z"},{"id":9,"sex":"female","firstName":"Gefion","lastName":"Engelke","mail":"gengelke@mail.de","phone":"059373817076","street":"Heinrich-Becker-Straße","houseNumber":388,"city":"Weisenbach","state":"BY","zip":"90272","birthDate":"1960-03-26T23:00:00.000Z"},{"id":10,"sex":"female","firstName":"Hülya","lastName":"Hoppe","mail":"hhoppe@mail.de","phone":"074754973966","street":"Am Weißiger Bach","houseNumber":424,"city":"Nörtershausen","state":"HH","zip":"20068","birthDate":"1966-05-07T22:00:00.000Z"},{"id":11,"sex":"male","firstName":"Sylvio","lastName":"Schürer","mail":"sschürer@mail.de","phone":"073538140658","street":"Waldmünchner Str.","houseNumber":563,"city":"Lugau","state":"RP","zip":"50894","birthDate":"1961-09-29T22:00:00.000Z"},{"id":12,"sex":"female","firstName":"Amanda","lastName":"Zink","mail":"azink@mail.de","phone":"034432344810","street":"Rückertstraße","houseNumber":904,"city":"Goßmar","state":"BY","zip":"90978","birthDate":"1980-07-13T22:00:00.000Z"},{"id":13,"sex":"male","firstName":"Wiethold","lastName":"Neu","mail":"wneu@mail.de","phone":"017638503941","street":"Soester Straße","houseNumber":353,"city":"Übach-Palenberg","state":"NW","zip":"40157","birthDate":"1977-03-19T23:00:00.000Z"},{"id":14,"sex":"female","firstName":"Jeanette","lastName":"Pitz","mail":"jpitz@mail.de","phone":"067085797951","street":"Am Brüchigt","houseNumber":957,"city":"Großkarolinenfeld","state":"NI","zip":"20961","birthDate":"1957-08-18T22:00:00.000Z"},{"id":15,"sex":"male","firstName":"Hansfried","lastName":"Lampert","mail":"hlampert@mail.de","phone":"074168511324","street":"Esterhazystraße","houseNumber":817,"city":"Reich","state":"NW","zip":"50294","birthDate":"1979-10-26T22:00:00.000Z"},{"id":16,"sex":"female","firstName":"Leongard","lastName":"Storz","mail":"lstorz@mail.de","phone":"041735218281","street":"Luisenhofstieg","houseNumber":417,"city":"Bröckau","state":"BY","zip":"80900","birthDate":"1974-02-20T23:00:00.000Z"},{"id":17,"sex":"female","firstName":"Christel","lastName":"Brüggemann","mail":"cbrüggemann@mail.de","phone":"084587363378","street":"Liebigstraße","houseNumber":182,"city":"Hägen","state":"NW","zip":"33073","birthDate":"1957-02-12T23:00:00.000Z"},{"id":18,"sex":"female","firstName":"Paola","lastName":"Jakobs","mail":"pjakobs@mail.de","phone":"059876092524","street":"Ferdinand-Braun-Str.","houseNumber":128,"city":"Bergtheim","state":"NW","zip":"50861","birthDate":"1953-01-23T23:00:00.000Z"},{"id":19,"sex":"male","firstName":"Wilhardt","lastName":"Wiener","mail":"wwiener@mail.de","phone":"055117140264","street":"Streekbrücke","houseNumber":261,"city":"Zapel","state":"RP","zip":"30332","birthDate":"1980-02-12T23:00:00.000Z"},{"id":20,"sex":"female","firstName":"Cathrin","lastName":"Grewe","mail":"cgrewe@mail.de","phone":"047251536876","street":"Hugenottenallee","houseNumber":858,"city":"Wolfstein","state":"BY","zip":"90763","birthDate":"1951-10-13T22:00:00.000Z"},{"id":21,"sex":"male","firstName":"Friedwin","lastName":"Jaeger","mail":"fjaeger@mail.de","phone":"054134203819","street":"Favoritenstraße","houseNumber":230,"city":"Püggen","state":"NW","zip":"32080","birthDate":"1945-06-06T22:00:00.000Z"},{"id":22,"sex":"male","firstName":"Ulfried","lastName":"Felber","mail":"ufelber@mail.de","phone":"026678593348","street":"Zschonerallee","houseNumber":171,"city":"Steinach","state":"MV","zip":"10324","birthDate":"1964-04-26T22:00:00.000Z"},{"id":23,"sex":"male","firstName":"Kasimir","lastName":"Habel","mail":"khabel@mail.de","phone":"071792338262","street":"Osterbergstraße","houseNumber":396,"city":"Krunkel","state":"SH","zip":"20953","birthDate":"1962-02-18T23:00:00.000Z"},{"id":24,"sex":"male","firstName":"Baldur","lastName":"Weniger","mail":"bweniger@mail.de","phone":"067146261481","street":"Steinbeker Marktstraße","houseNumber":758,"city":"Sukow-Marienhof","state":"BW","zip":"70674","birthDate":"1982-08-30T22:00:00.000Z"},{"id":25,"sex":"female","firstName":"Svea","lastName":"Neumeister","mail":"sneumeister@mail.de","phone":"089161081193","street":"Franziusplatz","houseNumber":949,"city":"Niederweis","state":"BE","zip":"10059","birthDate":"1967-05-24T22:00:00.000Z"},{"id":26,"sex":"female","firstName":"Nuran","lastName":"Lauterbach","mail":"nlauterbach@mail.de","phone":"093102356853","street":"Johann Kravogl-Gasse","houseNumber":687,"city":"Morungen","state":"BW","zip":"68010","birthDate":"1961-05-13T22:00:00.000Z"},{"id":27,"sex":"male","firstName":"Liebhardt","lastName":"Lichtenberg","mail":"llichtenberg@mail.de","phone":"055352244528","street":"An der Breitenau","houseNumber":583,"city":"Luhnstedt","state":"RP","zip":"30627","birthDate":"1960-07-25T22:00:00.000Z"},{"id":28,"sex":"male","firstName":"Gustl","lastName":"Bartel","mail":"gbartel@mail.de","phone":"044475600418","street":"Häfnergasse","houseNumber":275,"city":"Köngernheim","state":"HH","zip":"22005","birthDate":"1966-08-23T22:00:00.000Z"},{"id":29,"sex":"female","firstName":"Raphaela","lastName":"Kirchhof","mail":"rkirchhof@mail.de","phone":"083834054339","street":"Bussestraße","houseNumber":368,"city":"Estenfeld","state":"BE","zip":"13015","birthDate":"1971-09-05T22:00:00.000Z"},{"id":30,"sex":"female","firstName":"Almute","lastName":"Neuner","mail":"aneuner@mail.de","phone":"078701891139","street":"Maximiliansplatz","houseNumber":774,"city":"Westermoor","state":"NW","zip":"50083","birthDate":"1961-08-23T22:00:00.000Z"},{"id":31,"sex":"male","firstName":"Arwed","lastName":"Bergmann","mail":"abergmann@mail.de","phone":"058706524475","street":"Klopstockstraße","houseNumber":907,"city":"Gollensdorf","state":"HE","zip":"60162","birthDate":"1970-02-12T23:00:00.000Z"},{"id":32,"sex":"female","firstName":"Veronique","lastName":"Hinzmann","mail":"vhinzmann@mail.de","phone":"099706595828","street":"Mühlfeld","houseNumber":256,"city":"Ewighausen","state":"NW","zip":"32097","birthDate":"1986-03-12T23:00:00.000Z"},{"id":33,"sex":"female","firstName":"Isedore","lastName":"Achatz","mail":"iachatz@mail.de","phone":"033228012321","street":"Weilbacher Straße","houseNumber":745,"city":"Hüllhorst","state":"NW","zip":"32098","birthDate":"1975-08-30T22:00:00.000Z"},{"id":34,"sex":"female","firstName":"Anne-Kathrin","lastName":"Kautz","mail":"akautz@mail.de","phone":"096142902639","street":"Bruckertshofer Str.","houseNumber":510,"city":"Kötzschau","state":"NI","zip":"30358","birthDate":"1967-08-12T22:00:00.000Z"},{"id":35,"sex":"male","firstName":"Mathias","lastName":"Häcker","mail":"mhäcker@mail.de","phone":"042140046943","street":"Maulbeerenstraße","houseNumber":275,"city":"Geiersthal","state":"HE","zip":"30460","birthDate":"1971-05-03T22:00:00.000Z"},{"id":36,"sex":"female","firstName":"Walburg","lastName":"Büscher","mail":"wbüscher@mail.de","phone":"059396851791","street":"Zieglerstraße","houseNumber":360,"city":"Großmölsen","state":"SH","zip":"20337","birthDate":"1955-03-05T23:00:00.000Z"},{"id":37,"sex":"female","firstName":"Wilma","lastName":"Sandmann","mail":"wsandmann@mail.de","phone":"070720687519","street":"Löbauer Straße","houseNumber":250,"city":"Tann","state":"TH","zip":"00871","birthDate":"1952-02-03T23:00:00.000Z"},{"id":38,"sex":"male","firstName":"Siegbert","lastName":"Thum","mail":"sthum@mail.de","phone":"029148009888","street":"Bärenklauser Straße","houseNumber":423,"city":"Mirow","state":"BY","zip":"80304","birthDate":"1984-04-19T22:00:00.000Z"},{"id":39,"sex":"male","firstName":"Harro","lastName":"Husmann","mail":"hhusmann@mail.de","phone":"024337489983","street":"Heinrich-Heine-Straße","houseNumber":842,"city":"Heinsen","state":"NW","zip":"40143","birthDate":"1956-09-22T22:00:00.000Z"},{"id":40,"sex":"male","firstName":"Hannspeter","lastName":"Strack","mail":"hstrack@mail.de","phone":"022364496155","street":"Am Mispelbusch","houseNumber":901,"city":"Massing","state":"RP","zip":"70551","birthDate":"1978-07-21T22:00:00.000Z"}];
var dataAsString = JSON.stringify(data);

var getEl = function(id) {
	return document.getElementById(id);
};

// event handlers
getEl('triggerMaxLocalStorage').addEventListener("click", function(e) {
	e.target.disabled = true;
	determineMaxLocalStorage(1);
});

getEl('triggerMaxIndexedDbStorage').addEventListener("click", function(e) {
	e.target.disabled = true;
	initIndexedDb(function() {
		determineMaxIndexedDb(1);
	});
});

// app logic
var getBytesFromObject = function(data) {
	return encodeURI(data).split(/%..|./).length - 1;
}

var getKBytes = function(bytes) {
	return Math.floor(bytes / 1024);
}

var getMBytes = function(bytes) {
	return Math.floor(bytes / 1024 / 1024);
}

var determineMaxLocalStorage = function(offset) {
	offset++;

	try {
		window.localStorage.setItem(offset, dataAsString);
		getEl('maxLocalStorageStatus').textContent = 'Stored ' + getKBytes(offset * bytes) + ' kB (approx. ' + getMBytes(offset * bytes) + ' MB) successfully';
		determineMaxLocalStorage(offset);
	} catch (e) {
		console.log(e);
		getEl('maxLocalStorageStatus').textContent = getEl('maxLocalStorageStatus').textContent + ' - Exception: ' + e.message;
		getEl('triggerMaxLocalStorage').disabled = false;
	}
};

var getIndexedDbQuota = function() {
	if(window.webkitStorageInfo) {
		window.webkitStorageInfo.queryUsageAndQuota(webkitStorageInfo.TEMPORARY, function(used, remaining) {
	  		getEl('indexedDbQuota').textContent = getEl('indexedDbQuota').textContent + getMBytes(used + remaining) + ' MB';
		}, function(e) {
			console.log('Could not determine quota:');
	  		console.log(e); 
		});
	} else {
		getEl('indexedDbQuota').textContent = getEl('indexedDbQuota').textContent + ' N/A';
	}
}

var initIndexedDb = function(callback) {
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

var determineMaxIndexedDb = function(offset) {
	offset++;
	
	var item = {
		id: offset,
		data: data
	};

	try{
		indexedDB.open("db", 1).onsuccess = function(event) {
			var db = this.result;
			var store = db.transaction("items", "readwrite").objectStore("items");

			store.add(item);

			getEl('maxIndexedDbStorageStatus').textContent = 'Stored ' + getKBytes(offset * bytes) + ' kB (approx. ' + getMBytes(offset * bytes) + ' MB) successfully';

			determineMaxIndexedDb(offset);
		}
	} catch(e) {
		console.log(e);
		getEl('triggerMaxIndexedDbStorage').disabled = false;
	}
};

// init
window.localStorage.clear();
indexedDB.deleteDatabase("db");

getIndexedDbQuota();
var bytes = getBytesFromObject(dataAsString);