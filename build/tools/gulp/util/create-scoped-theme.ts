import {join} from 'path';
import {writeFileSync, readFileSync} from 'fs-extra';
import {sync as glob} from 'glob';
import {Bundler} from 'scss-bundle';

export type JigsawScopedThemeType = 'scoped' | 'weight';

export enum JigsawScopedThemeClass {
    scoped = '.jigsaw-scoped-theme', weight = '.jigsaw-weight-theme'
}

export async function bundleScopedScss(type: JigsawScopedThemeType, themingPrebuiltHome: string, scssHome: string) {
    const allScopedScssGlob = join(scssHome, '**/*.scss');
    const files = glob('*.scss', {cwd: themingPrebuiltHome});
    for (const filePath of files) {
        const result = await new Bundler().Bundle(join(themingPrebuiltHome, filePath), [allScopedScssGlob]);
        const targetScssThemePath = join(scssHome, filePath.replace(/(.+)\.scss$/, `$1-${type}.scss`));
        writeFileSync(targetScssThemePath, `
                ${_getScopedSelector(type)} {
                    ${result.bundledContent}
                }
            `);
    }
}

/**
 * 在canvas上添加.jigsaw-scoped-theme，在canvas外的地方添加.jigsaw-weight-theme
 * :is(.jigsaw-weight-theme) xxxx 权重要比wings-theme大，要比用户写的css大，要排除scoped-theme下的元素，body使用.jigsaw-weight-theme替换
 * :where(.jigsaw-scoped-theme) xxxx 权重要比wings-theme小，要比用户写的css小，body使用.jigsaw-scoped-theme替换
 * @param type
 */
function _getScopedSelector(type: JigsawScopedThemeType): string {
    return type == 'weight' ? `:is(${JigsawScopedThemeClass.weight})` : `:where(${JigsawScopedThemeClass.scoped})`;
}

export function createScopedTheme(ScopedThemeHome: string, cssFile: string) {
    const scopedType: JigsawScopedThemeType = cssFile.endsWith('-weight.css') ? 'weight' : 'scoped';
    const scopedClass = JigsawScopedThemeClass[scopedType];
    const scopedSelector = _getScopedSelector(scopedType);
    const rawCssThemePath = join(ScopedThemeHome, cssFile);
    let themeContent = readFileSync(rawCssThemePath).toString();
    const scopedBlockNameReg = scopedSelector.replace(/([.()])/g, '\\$1');
    const bodyReg = new RegExp(`${scopedBlockNameReg}\\s+body\\b`, 'g');
    const cssVarReg = new RegExp(`${scopedBlockNameReg}\\s+:root`, 'g');

    // 替换body标签和css变量
    // scoped body要替换成scoped-class，不能替换成scoped-selector，防止伪类class匹配非body元素
    themeContent = themeContent.replace(bodyReg, scopedClass)
        // css变量改成scoped class下的变量
        .replace(cssVarReg, JigsawScopedThemeClass[scopedType]);
    writeFileSync(rawCssThemePath, themeContent);
}
