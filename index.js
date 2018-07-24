console.log('Welcome to Selenium Test!');

"use strict"; 
var webdriver = require("selenium-webdriver"),
SeleniumServer = require("selenium-webdriver/remote").SeleniumServer,
request = require('request');

const fs = require('fs');
 
var cbtHub = "http://hub.crossbrowsertesting.com:80/wd/hub";

var username = 'bciar@yandex.com';
var authkey = 'uea39180f268123c';

var caps = {
    'browserName': 'Chrome',
    'version': '67x64',
    'platform': 'Mac OSX 10.12',
    'screenResolution': '1366x768'
};

caps.username = username;
caps.password = authkey;
 
webdriver.promise.controlFlow().on('uncaughtException', webdriverErrorHandler);
var driver = new webdriver.Builder()
    .usingServer(cbtHub)
    .withCapabilities(caps)
    .build(); 
    
console.log('Waiting on the browser to be launched and the session to start');

driver.getSession().then(function(session){
    sessionId = session.id_; //need for API calls
    console.log('Session ID: ', sessionId); 
    console.log('See your test run at: https://app.crossbrowsertesting.com/selenium/' + sessionId)
});

driver.get('http://datalab-staging.pma2020.org/?surveyCountries=PMA2014_BFR1,PMA2015_BFR2&indicators=cp_all&characteristicGroups=age_5yr_int&chartType=bar&overTime=false'); 

driver.wait(webdriver.until.elementLocated(webdriver.By.className("highcharts-contextbutton")), 200000);
driver.findElement(webdriver.By.className("highcharts-contextbutton")).click();
driver.wait(webdriver.until.elementLocated(webdriver.By.css(".highcharts-contextmenu .highcharts-menu .highcharts-menu-item:nth-of-type(2)")), 100000);
driver.findElement(webdriver.By.css(".highcharts-contextmenu .highcharts-menu .highcharts-menu-item:nth-of-type(2)")).click();

fs.readFile('/etc/hosts', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
});
driver.sleep(100000);

function quitDriver() {
    console.log("WebDriver is about to close.");
    driver.quit();
} 
//Call API to set the score
function setScore(score) {

    //webdriver has built-in promise to use
    var deferred = webdriver.promise.defer();
    var result = { error: false, message: null }

    if (sessionId){
        
        request({
            method: 'PUT',
            uri: 'https://crossbrowsertesting.com/api/v3/selenium/' + sessionId,
            body: {'action': 'set_score', 'score': score },
            json: true
        },
        function(error, response, body) {
            if (error) {
                result.error = true;
                result.message = error;
            }
            else if (response.statusCode !== 200){
                result.error = true;
                result.message = body;
            }
            else{
                result.error = false;
                result.message = 'success';
            }

            deferred.fulfill(result);
        })
        .auth(username, authkey);
    }
    else{
        result.error = true;
        result.message = 'Session Id was not defined';
        deferred.fulfill(result);
    }

    return deferred.promise;
}
//general error catching function
function webdriverErrorHandler(err){

    console.error('There was an unhandled exception! ' + err);

    //if we had a session, end it and mark failed
    if (driver && sessionId){
        driver.quit();
        setScore('fail').then(function(result){
            console.log('set score to fail')
        })
    }
}