
const md5File = require('md5-file');
const hash1 = md5File.sync('C:\\Users\\asharp\\Downloads\\chart.png');
const hash2 = md5File.sync('hash2.png');
const hash3 = md5File.sync('hash3.png');
console.log('hash1=', hash1);
console.log('hash2=', hash2);
console.log('hash3=', hash3);

/* md5File('C:\\Users\\asharp\\Downloads\\chart.png', (err, hash) => {
    if (err) throw err
   
    console.log(`The MD5 sum is: ${hash}`)
}); */