const fs = require('fs');
const process = require('process');
const axios = require('axios');

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

async function webCat(url) {
    try {
        let resp = await axios.get(url);
        console.log(resp.data);
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path = process.argv[2];

if (path.slice(0, 4) === 'http') {
    webCat(path);
} else {
    cat(path);
}



// node step2.js one.txt favoritemovies.txt
// This is file one.

// node step2.js http://google.com
// Gives a long html file

// node step2.js http://rithmschool.com/no-such-path
// Gives error
// Error fetching http://rithmschool.com/no-such-path: AxiosError: Request failed with status code 404


