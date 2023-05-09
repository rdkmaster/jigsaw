import {join} from 'path';
import {writeFileSync, readFileSync} from 'fs-extra';
import {sync as glob} from 'glob';
import {Bundler} from 'scss-bundle';

export type ScopedType = 'outer' | 'scoped';

export const jigsawScopedClass = {outer: '.jigsaw-outer-theme', scoped: '.jigsaw-scoped-theme'};

export async function bundleScopedScss(type: ScopedType, themingPrebuiltHome: string, scssHome: string) {
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
 * 在canvas上添加.jigsaw-scoped-theme，在canvas外的地方添加.jigsaw-outer-theme
 * :is(.jigsaw-outer-theme) xxxx 权重要比wings-theme大，要比用户写的css大，要排除scoped-theme下的元素，body使用.jigsaw-outer-them替换
 * :where(.jigsaw-scoped-theme) xxxx 权重要比wings-theme小，要比用户写的css小，body使用.jigsaw-scoped-theme替换
 * @param type
 */
function _getScopedSelector(type: ScopedType): string {
    const {outer, scoped} = jigsawScopedClass;
    return type == 'outer' ? `:is(${outer})` : `:where(${scoped})`;
}

export function createScopedTheme(ScopedThemeHome: string, cssFile: string) {
    const scopedType = cssFile.endsWith('-outer.css') ? 'outer' : 'scoped';
    const scopedClass = jigsawScopedClass[scopedType];
    const scopedSelector = _getScopedSelector(scopedType);
    const rawCssThemePath = join(ScopedThemeHome, cssFile);
    let themeContent = readFileSync(rawCssThemePath).toString();
    const scopedBlockNameReg = scopedSelector.replace(/([.()])/g, '\\$1');
    const bodyReg = new RegExp(`${scopedBlockNameReg}\\s+body\\b`, 'g');

    // 替换body标签和css变量
    // scoped body要替换成scoped-class，不能替换成scoped-selector，防止伪类class匹配非body元素
    themeContent = themeContent.replace(bodyReg, scopedClass);
    if (scopedType == 'outer') {
        // css变量名前面添加-outer来区分:root下的变量
        const cssVarReg = new RegExp(`${scopedBlockNameReg}\\s+:root\\s*{([^}]+)}`, 'g');
        themeContent = themeContent.replace(cssVarReg, function (found, match) {
            const scopedVar = match.split(';')
                .map((m: string) => m.trim())
                .filter((m: string) => !!m)
                .map((m: string) => {
                    if (!m.startsWith('--')) {
                        return m;
                    }
                    return m.replace(/^--(.+)/, '--outer-$1');
                }).join(';')
            return `${scopedClass} {${scopedVar}}`
        });
    }
    if (scopedType == 'scoped') {
        // scoped theme 的css变量还原成 :root 变量
        const cssVarReg = new RegExp(`${scopedBlockNameReg}\\s+:root`, 'g');
        themeContent = themeContent.replace(cssVarReg, ':root');
    }
    writeFileSync(rawCssThemePath, themeContent);
}
