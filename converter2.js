var chosenCurrency = document.getElementById('chooseCurrency');
var btn = document.getElementById("btn");
var output = document.getElementById('result');


btn.addEventListener("click", function() {
    var request = new XMLHttpRequest();

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var currentRates = JSON.parse(request.responseText);
            var currency = chosenCurrency.options[chosenCurrency.selectedIndex].value; // USD, EUR ...
            var buy = check();
            var amount = document.getElementById('amount').value
            console.log(currentRates);
            // console.log(currency,  buy, amount);
            calcResult(currentRates, currency, buy, amount);
        } else {
            console.log("We connected to the server, but it returned an error.");
        }
    };

    request.open('GET', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    request.send();
});

// Checks if 'buy' checkbox is chosen
function check() {
    return document.getElementById("buy").checked;
}


// Caclulations
function calcResult(currentRates, currency, buy, amount) {
    var rate;
    var calculation;

    currentRates.find(function(obj) {
        if (obj.ccy === currency && buy === true) {  // if buy 'true'
            rate =  [obj.sale, obj.base_ccy];
        }
        if (obj.ccy === currency && buy === false) {  // if sale 'true'
            rate =  [obj.buy, obj.base_ccy];
        }
    });

    //console.log(rate);
    calculation = amount * rate[0];

    if(isNaN(calculation) || calculation === 0) {
        output.innerHTML = '<span>Enter a valid amount.</span>';
    } else {
        output.innerHTML = parseFloat(calculation).toFixed(2) + " " + rate[1];
    }
    
}


        











/*  /// PREVIOUS CONVERTER ///

var from = document.getElementById('from');
var to = document.getElementById('to');
var output = document.getElementById('result');
var fromCurrencyName = document.getElementById('fromCurrency');
var toCurrencyName = document.getElementById('toCurrency');

// get all currencies
var request1 = new XMLHttpRequest();
request1.onload = function() {
    //console.log(request.responseText);
    if (request1.status >= 200 && request1.status < 400) {
    	let data = JSON.parse(request1.responseText);
    	//console.log(data);
    	var options = "";
    	    	
    	for(var key in data.results){
			if(data.results.hasOwnProperty(key)) {
				from.innerHTML += '<option val="' + data.results[key].currencyName + '">' + key + '</option>';
				to.innerHTML += '<option val="' + data.results[key].currencyName + '">' + key + '</option>';
			}
		}

    	//renderHTML(data);
    } else {
    	console.log("We connected to the server, but it returned an error.");
    }
}

request1.open('GET', 'https://free.currencyconverterapi.com/api/v5/currencies');
request1.send();
////////////////////////////////////////////////////////////////////////////////////////////////////
 let btn = document.getElementById("btn");

 // get conversion rates
btn.addEventListener("click", function() {
	fromCurrencyName.innerHTML = from[from.selectedIndex].getAttribute("val");
	toCurrencyName.innerHTML = to[to.selectedIndex].getAttribute("val");

 	var convertFrom = from.options[from.selectedIndex].value; 	
 	console.log(from[0].getAttribute("val"));
 	var convertTo = to.options[to.selectedIndex].value;
 	//console.log(convertFrom + ' , ' + convertTo);

 	var url = 'https://free.currencyconverterapi.com/api/v5/convert?q=' + convertFrom + '_' + convertTo + '&compact=ultra';
 	var request2 = new XMLHttpRequest();
	request2.onload = function() {
    //console.log(request.responseText);
    if (request2.status >= 200 && request2.status < 400) {
    	let newData = JSON.parse(request2.responseText);
    	// console.log(data);
    	var result = newData[convertFrom + '_' + convertTo];
    	//console.log(result);

    	var amount = document.getElementById('amount').value
    	var calculation = amount * result;
    	console.log(calculation);

    	if(isNaN(calculation) || calculation === 0) {
    		output.innerHTML = '<span>Enter a valid amount.</span>';
    		//console.log('Please enter a valid amount.')
    	} else {
    		output.innerHTML = parseFloat(calculation).toFixed(4);
    	}
    } else {
    	console.log("We connected to the server, but it returned an error.");
    }
}

request2.open('GET', url);
request2.send();

});

*/


 


