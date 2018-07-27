var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
const md5File = require('md5-file');
const fs = require('fs');

const readFile = (file) => {
    // noinspection JSUnresolvedFunction
    return fs.readFileSync(file, 'utf8', (err, data) => {
      if (err) throw err;
      return data;
    });
};
  
const checkSvgMatch = (files, cleaningFunction) => {
    let filesMatchesToCheck = [];
    for (let file of files) {
        const fileText = readFile(file);
        console.log(fileText);
        const cleanedFileText = cleaningFunction(fileText);
        filesMatchesToCheck.push(cleanedFileText);
        // filesMatchesToCheck.push(md5Check(cleanedFileText));  // See: (1)
    }
    return filesMatchesToCheck.reduce((x, y) => {return x === y});
};

const removeHighChartsId = (text) => {
  const matchPattern1 = /<clipPath id="highcharts-[a-zA-Z0-9]{7}-11">/g;
  const matchPattern2 = /-[a-zA-Z0-9]{7}-/g;
  const replacePattern = /-/g;
  let svgId;
  svgId = text.match(matchPattern1)[0];
  svgId = svgId.match(matchPattern2)[0];
  svgId = svgId.replace(replacePattern, '');
  return text.replace(new RegExp(svgId, 'g'), '');
};



var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

searchTest(driver_chr);

function searchTest(driver) {
    driver.get('http://datalab-staging.pma2020.org/?surveyCountries=PMA2014_BFR1&indicators=cp_all&characteristicGroups=none&chartType=bar&overTime=false'); 
    
    driver.wait(webdriver.until.elementLocated(webdriver.By.className("highcharts-contextbutton")), 200000);
    driver.findElement(webdriver.By.className("highcharts-contextbutton")).click();
    driver.wait(webdriver.until.elementLocated(webdriver.By.css(".highcharts-contextmenu .highcharts-menu .highcharts-menu-item:last-of-type")), 100000);
    driver.findElement(webdriver.By.css(".highcharts-contextmenu .highcharts-menu .highcharts-menu-item:last-of-type")).click();

    const file1 = 'C:\\Users\\asharp\\Downloads\\chart.svg';
    const file2 = 'C:\\Users\\asharp\\Downloads\\chart2.svg';// 'input\\chart2.svg';
    const files = [file1, file2];
    driver.sleep(2000).then(function() {
        // const hash1 = md5File.sync('C:\\Users\\asharp\\Downloads\\chart.svg');
        // const hash2 = md5File.sync('hash2.png');
        const result = checkSvgMatch(files, removeHighChartsId);
        console.log(result); 
    });

    driver.quit();
}