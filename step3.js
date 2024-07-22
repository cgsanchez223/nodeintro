const fs = require('fs');
const process = require('process');
const axios = require('axios');

function outPut(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf8', function(err) {
            if (err) {
                console.error(`Couldn't write ${out}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

function cat(path, out) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            outPut(data, out);
        }
    });
}

async function webCat(url, out) {
    try {
        let resp = await axios.get(url);
        outPut(resp.data, out);
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path; 
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
}


// node step3.js favoritemovies.txt
// lists favoritemovies.txt

// node step3.js http://google.com
// prints out html  file

// node step3.js --out new.txt favoritemovies.txt
// created new file new.txt with the contents of favoritemovies.txt


// node step3.js --out new.txt  http://google.com
// Changes the contents of new.txt to the html from google

// node step3.js --out /no/dir/new.txt one.txt
// Error
// Couldn't write /no/dir/new.txt: Error: ENOENT: no such file or directory, open '/no/dir/new.txt'

