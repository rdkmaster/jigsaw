/**
 * jigsaw目录下所有import都不能从jigsaw目录开头，否则ngx-formly表单控件会编译不过。
 */

 const fs = require('fs');
 const path = require('path');
 
 let hasError = false;
 checkAll();
 if (hasError) {
     process.exit(1);
 } else {
     console.error(`Everything's fine!`);
 }
 
 // checkPublicVariables('D:\\Codes\\jigsaw\\src\\jigsaw\\mobile-components\\alert\\alert.ts');
 
 function checkAll(folder) {
     const cmpHome = path.resolve(`${__dirname}/../../src/jigsaw`);
     const cmpFolders = fs.readdirSync(cmpHome);
     cmpFolders.forEach(cmpFolder => {
         const pathname = path.join(cmpHome, cmpFolder);
         const stat = fs.lstatSync(pathname);
         if (stat.isDirectory()) {
             checkSourceFiles(pathname);
         }
     });
 }
 
 function checkSourceFiles(sourceFolder) {
     const files = fs.readdirSync(sourceFolder);
     files.forEach(file => {
         const pathname = path.join(sourceFolder, file);
         const stat = fs.lstatSync(pathname);
         if (stat.isDirectory()) {
             checkSourceFiles(pathname)
         } else {
             checkImportPath(pathname);
         }
     });
 }
 
 function checkImportPath(srcPath) {
     if (!srcPath.match(/.+\.ts$/i)) {
         return;
     }
 
     console.log(`Checking ${srcPath} ...`);
     const source = fs.readFileSync(srcPath).toString();
 
     source.replace(/import\s+[\s\S]*?\s+from\s+['"](.*?)['"]/g, (found, importPath) => {
         if (importPath.startsWith('rxjs')) {
             return '';
         }
         if (importPath[0] != '.' && !fs.existsSync(`${__dirname}/../../node_modules/${importPath}`)) {
             error('invalid import path', importPath, ', file:', srcPath);
         }
         return '';
     });
 }
 
 function error(...msg) {
     console.error.call(null, 'Error:', ...msg);
     hasError = true;
 }
 
 
 