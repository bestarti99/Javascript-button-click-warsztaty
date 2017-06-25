'use strict'

// Definicja funkcji ajax
function ajax(ajaxOptions) {

    // Opcje połączenia i jego typu, ||-inicjacja
    var options = {
        type: ajaxOptions.type || 'POST',
        url: ajaxOptions.url || '',
        onError: ajaxOptions.onError || function () {},
        onSuccess: ajaxOptions.onSuccess || function () {},
        dataType: ajaxOptions.dataType || 'text',
    }

    //funkcja sprawdająca statusy
    function httpSuccess(httpRequest) {
        try {
            return (httpRequest.status >= 200 && httpRequest.status < 300 || httpRequest.status == 304 ||
                // Dotyczy przeglądarek Safari
                navigator.userAgent.indexOf('Safari') >= 0 && typeof httpRequest.status == 'undefind');
        } catch (e) {
            return false;
        }

    }

    // Utworzenie obiektu XMLHttpRequest
    var httpReq = new XMLHttpRequest();

    // Otwarcie połączenia metoda-adres-asynchronicznie?
    httpReq.open(options.type, options.url, true);

    // Iterowanie za każdym razem , kiedy zmienia się ready state - od 0 do 4
    httpReq.onreadystatechange = function () {
        // Sprawdź status połącznia - funkcja httpSuccess
        if (this.readyState == 4) {
            if (httpSuccess(this)) {

                // jęsli dane w formacie XML, to zwróć obiekt responseXML, w przeciwnym wypadku responseText (JOSN to tekst)
                var returnData = (options.dataType == 'xml') ? this.responseXML : this.responseText;

                options.onSuccess(returnData);

                httpReq = null;
            } else {
                options.onError(console.log('Błąd'));
            }
        }
    }

    httpReq.send();
}




button.onclick = function () {
           ajax({
            type: 'GET',
            url: 'http://echo.jsontest.com/userId/108/userName/Akademia108/userURL/akademia108.pl',
            onError: function (msg) {
                console.log(msg);
            },
            onSuccess: function (response) {
                var jsonObjArray = JSON.parse(response);
                console.log(jsonObjArray);
                
                var beginOfData = document.createElement('p');
                var endOfData = document.createElement('p');
                
                beginOfData.innerHTML = '<br>-----------------------BEGIN OF DATA--------------<br><br>';
                endOfData.innerHTML = '<br>-----------------------END OF DATA--------------<br><br>';
                
                document.body.appendChild(beginOfData);
                
                for(var i in jsonObjArray) {
                    var userId = document.createElement('p');
                    var userName = document.createElement('p');
                    var userURL = document.createElement('p');
                    
                    userId.innerHTML = 'User ID: ' + jsonObjArray[i].id;
                    userName.innerHTML = 'User Name: ' + jsonObjArray[i].name;
                    userURL.innerHTML = 'User URL : ' + jsonObjArray[i].website + '<br>----------------';
                    
                    document.body.appendChild(userId);
                    document.body.appendChild(userName);
                    document.body.appendChild(userURL); 
                }
                
                document.body.appendChild(endOfData);
            }
        });

