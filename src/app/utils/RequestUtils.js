'use strict';

let HOST = 'http://127.0.0.1:8090/';

export function request(url, method, body) {
    var isOk;
    return new Promise((resolve, reject) => {
        console.log("url=" + HOST + url);
        fetch(HOST + url, {
                method: method,
                headers: {
                    //'Accept': 'application/json',
                    //'Content-Type': 'application/json'
                },
                body: body,
            })
            .then((response) => {
                if (response.ok) {
                    isOk = true;
                } else {
                    isOk = false;
                }
                var resObj = response.json();
                console.log("response==" + resObj + ";isOk=" + isOk);
                return resObj;
            })
            .then((responseData) => {
                if (isOk) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                reject(error);
            });
    })
}
