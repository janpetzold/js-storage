var app = {};

app.get = function(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function () {
        if (request.readyState != 4 || request.status != 200) {
            return;
        }
        callback(request.responseText);
    };
    request.send();
};

app.getEl = function(id) {
    return document.getElementById(id);
};

app.getBytesFromObject = function(data) {
    return encodeURI(data).split(/%..|./).length - 1;
};

app.getKBytes = function(bytes) {
    return Math.floor(bytes / 1024);
};

app.getMBytes = function(bytes) {
    return Math.floor(bytes / 1024 / 1024);
};
