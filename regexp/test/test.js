// import checkHighchartsSvgMatch from '../index';
// const svgCheck = require('../index');
const checkHighchartsSvgMatch = require('../index');

const test = (numTests) => {
  /* Make sure that you have a directory structure like this:
      test
      ├── 1
      │   ├── chart.svg
      │   └── chart2.svg
      └── 2
          ├── chart.svg
          └── chart2.svg
      ...
      
      Args:
          numTests (number): Integer representing the number of tests you want to run.
          Should correspond to the number of directories in "test", themselves each named as integers.
  */
  const rootDir = '/Users/joeflack4/projects/selenium-test/regexp/';  // TODO: Get PWD.
  const testDir = rootDir + 'test/';
  const chartNames = ['chart', 'chart2'];
  const fileSets = [];
  
  for (let i=1; i<numTests+1; i++) {
    const files = [];
    for (let j=0; j<2; j++) {
      files.push(testDir + i.toString() + '/' + chartNames[j] + '.svg');
    }
    fileSets.push(files);
  }
  
  console.log('Every test returning "true" is a pass, and "false" is a fail. Test results:');
  for (let files of fileSets) {
    // const result = checkHighchartsSvgMatch(files);
    // noinspection JSUnresolvedFunction
    const result = checkHighchartsSvgMatch(files);
    // const result = svgCheck.checkHighchartsSvgMatch(files);
    console.log(result);
  }
};

test(2);
