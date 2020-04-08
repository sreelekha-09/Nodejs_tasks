const fs = require("fs");

const crypto = require('crypto');
const path = require('path');

const curr_path = path.join();
const status = fs.statSync(curr_path);


function hash(curr_path) {
    const result = fs.readFileSync(curr_path, 'utf-8');
    const hashMD5 = crypto.createHash('md5').update(result).digest('hex');
    const hashSha1 = crypto.createHash('sha1').update(result).digest('hex');
    var data = curr_path + "  " + hashSha1 + "  " + hashMD5 + "\n";
    fs.appendFile("hashdata.txt", data, function (err) {
        if (err) throw err;
    });

}
function getRecursiveFiles(curr_path) {
    let mypath = curr_path;
    hash(mypath);
    return;

}
function getRecursiveDir(curr_path) {
    let mypath = curr_path;
    fs.readdir(mypath, function (err, files) {
        if (err) {
            return console.log("error" + err);
        }
        files.forEach(function (file) {

            if (fs.statSync(mypath + '/' + file).isDirectory()) {

                getRecursiveDir(mypath + '/' + file);
            }

            else {

                getRecursiveFiles(mypath + '/' + file);

            }
        });
    });
}
if(fs.statSync("./hashdata.txt").isFile())
        {
            fs.writeFile('./hashdata.txt', '', function(){console.log('done')})
        }
if (status.isFile()) {
    getRecursiveFiles(curr_path);
}
if (status.isDirectory()) {
    getRecursiveDir(curr_path);
}

