import * as fs from 'fs';
import * as path from 'path';
import {sync as glob} from 'glob';

let demoHome = path.join(__dirname, '../../src/app/demo');

glob('**/*.html', {cwd: demoHome}).forEach(fileName => {
    let filePath = path.join(demoHome, fileName);
    console.log(filePath);
    let code = fs.readFileSync(filePath).toString();
    let changed = false;
    if(code.search(/\blive-demo-wrap\b/) != -1 && code.search('<h2') != -1 ) {
        code = code.replace(/<h2/g, '<jigsaw-header [level]="1"').replace(/<\/h2>/g, '</jigsaw-header>');
        changed = true;
    }
    if(code.search(/\blive-demo\b/) != -1 && code.search('<h3') != -1 ) {
        code = code.replace(/<h3/g, '<jigsaw-header [level]="2"').replace(/<\/h3>/g, '</jigsaw-header>');
        changed = true;
    }
    if(changed) {
        fs.writeFileSync(filePath, code);
        const isMobile = filePath.search('demo/mobile/') != -1;
        const [headerModuleName, jigsawPkg] = isMobile ? ['JigsawMobileHeaderModule', 'jigsaw/mobile_public_api'] : ['JigsawHeaderModule', 'jigsaw/public_api'];
        let demoModulePath = filePath.replace('demo.component.html', 'demo.module.ts');
        let moduleCode = fs.readFileSync(demoModulePath).toString();
        if(moduleCode.search(headerModuleName) == -1) {
            moduleCode = moduleCode.replace('@NgModule', `import {${headerModuleName} from "${jigsawPkg}";\n\n@NgModule`)
                .replace(/imports\s*:\s*\[((.|\n)+?)\]/, `imports: [$1, ${headerModuleName}]`);
            fs.writeFileSync(demoModulePath, moduleCode);
        }
    }
});
