const fs = require("fs");

const crypto = require('crypto');
const path = require('path');

const curr_path = path.join();
const status = fs.statSync(curr_path);


function calculateHashMd5(curr_path) {
    const result = fs.readFileSync(curr_path, 'utf-8');
    const hashMd5 = crypto.createHash('md5').update(result).digest('hex');
    return hashMd5;

}

function calculateHashSha1(curr_path) {
    const result = fs.readFileSync(curr_path, 'utf-8');
    const hashSha1 = crypto.createHash('sha1').update(result).digest('hex');
    return hashSha1;
}
function getFiles(curr_path) {
    let mypath = curr_path;
    var data = mypath + " " + calculateHashSha1(mypath) + "  " + calculateHashMd5(mypath) + "\n";
    fs.appendFile("hashdata.txt", data, function (err) {
        if (err) throw err;
    });
    return;

}
function getRecursiveDir(curr_path) {
    let mypath = curr_path;
    fs.readdir(mypath, function (err, files) {
        if (err) {
            return console.log("error" + err);
        }
        files.forEach(function (file) {

            if (fs.statSync(path.join(mypath + '/' + file)).isDirectory()) {

                getRecursiveDir(path.join(mypath + '/' + file));
            }

            else {

                getFiles(path.join(mypath + '/' + file));

            }
        });
    });
}
if (fs.statSync("./hashdata.txt").isFile()) {
    fs.writeFile('./hashdata.txt', '', function () { console.log('done') })
}
if (status.isFile()) {
    getFiles(curr_path);
}
if (status.isDirectory()) {
    getRecursiveDir(curr_path);
}

