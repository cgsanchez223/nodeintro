const fs = require('fs');
const process = require('process');

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}

cat(process.argv[2]);

// In Terminal run 
// node step1.js favoritemovies.txt

// node step1.js huh.txt
// This will give you an error since the file does not exit
// Error reading huh.txt: Error: ENOENT: no such file or directory, open 'huh.txt'

