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
        let demoModulePath = filePath.replace('demo.component.html', 'demo.module.ts');
        let moduleCode = fs.readFileSync(demoModulePath).toString();
        if(moduleCode.search('JigsawHeaderModule') == -1) {
            moduleCode = moduleCode.replace('@NgModule', 'import {JigsawHeaderModule} from "jigsaw/public_api";\n\n@NgModule')
                .replace(/imports\s*:\s*\[((.|\n)+?)\]/, 'imports: [$1, JigsawHeaderModule]');
            fs.writeFileSync(demoModulePath, moduleCode);
        }
    }
});
