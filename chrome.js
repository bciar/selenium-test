var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
const md5File = require('md5-file');

var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

searchTest(driver_chr);

function searchTest(driver) {
    driver.get('http://datalab-staging.pma2020.org/?surveyCountries=PMA2014_BFR1&indicators=cp_all&characteristicGroups=none&chartType=bar&overTime=false'); 
    
    driver.wait(webdriver.until.elementLocated(webdriver.By.className("highcharts-contextbutton")), 200000);
    driver.findElement(webdriver.By.className("highcharts-contextbutton")).click();
    driver.wait(webdriver.until.elementLocated(webdriver.By.css(".highcharts-contextmenu .highcharts-menu .highcharts-menu-item:nth-of-type(2)")), 100000);
    driver.findElement(webdriver.By.css(".highcharts-contextmenu .highcharts-menu .highcharts-menu-item:nth-of-type(2)")).click();

    driver.sleep(2000).then(function() {
        const hash1 = md5File.sync('C:\\Users\\asharp\\Downloads\\chart.png');
        const hash2 = md5File.sync('hash2.png');
        console.log(hash1 == hash2);
        //console.log(`The MD5 sum is: ${hash}`)
    });

    driver.quit();
}