const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const publicPath = __dirname;
const buildPath = path.resolve(__dirname, './source/build');

console.log('Building...');
childProcess.execSync('cd ./source&&npm run build');

function rmRF(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(file => {
      const filename = `${path}/${file}`;
      if (fs.lstatSync(filename).isDirectory()) {
        rmRF(filename);
      } else {
        fs.unlinkSync(filename);
      }
    });
    fs.rmdirSync(path);
  }
}

function move(oldPath, newPath) {
  const is = fs.createReadStream(oldPath);
  const os = fs.createWriteStream(newPath);

  console.log(`${oldPath} ---> ${newPath}`);

  is.pipe(os);
  is.on('end',function() {
    fs.unlinkSync(oldPath);
  });
}

function moveAll(oldPath, newPath) {
  fs.readdirSync(oldPath)
    .forEach((file) => {
      const filename = `${oldPath}/${file}`;
      const newPathName = `${newPath}/${file}`;
      if (fs.lstatSync(filename).isDirectory()) {
        if (!fs.existsSync(newPathName)) {
          fs.mkdirSync(newPathName);
        }
        moveAll(filename, newPathName);
      } else {
        move(filename, newPathName);
      }
    });
}

console.log('Removing old file');
const excludeSet = new Set(['.git', '.gitignore', '.idea', '.vscode', 'source', 'deploy.js']);
fs.readdirSync(publicPath)
  .filter(el => !excludeSet.has(el))
  .forEach((file) => {
    const stat = fs.lstatSync(file);
    if (stat.isFile()) {
      fs.unlinkSync(file);
    } else {
      rmRF(file);
    }
  });

console.log('Moving new file');
moveAll(buildPath, publicPath);

// console.log('Push to github');
// childProcess.execFileSync('git commit -a "rebuild page"');
// childProcess.execFileSync('git push origin master');

console.log('Done!');
