import {join} from 'path';
import {writeFileSync, readFileSync} from 'fs-extra';
import {sync as glob} from 'glob';
import {Bundler} from 'scss-bundle';

type WrappedType = 'outer' | 'inner';

export const jigsawWrappedClass = {outer: '.jigsaw-outer-theme', inner: '.jigsaw-inner-theme'};

export async function bundleWrappedScss(type: WrappedType, themingPrebuiltHome: string, scssHome: string) {
    const allWrappedScssGlob = join(scssHome, '**/*.scss');
    const files = glob('*.scss', {cwd: themingPrebuiltHome});
    for (const filePath of files) {
        const result = await new Bundler().Bundle(join(themingPrebuiltHome, filePath), [allWrappedScssGlob]);
        const targetScssThemePath = join(scssHome, filePath.replace(/(.+)\.scss$/, `$1-${type}.scss`));
        writeFileSync(targetScssThemePath, `
                ${_getWrappedSelector(type)} {
                    ${result.bundledContent}
                }
            `);
    }
}

/**
 * 只在root上添加.jigsaw-outer-theme，在canvas上添加.jigsaw-inner-theme
 * :is(.jigsaw-outer-theme) xxxx 权重要比wings-theme大，要比用户写的css大，要排除inner-theme下的元素，body使用.jigsaw-outer-them替换
 * :where(.jigsaw-inner-theme) xxxx 权重要比wings-theme小，要比用户写的css小，body使用.jigsaw-inner-them替换
 * @param type
 */
function _getWrappedSelector(type: WrappedType): string {
    const {outer, inner} = jigsawWrappedClass;
    return type == 'outer' ? `:is(${outer})` : `:where(${inner})`;
}

export function createWrappedTheme(wrappedThemeHome: string, cssFile: string) {
    const wrappedType = cssFile.endsWith('-outer.css') ? 'outer' : 'inner';
    const wrappedClass = jigsawWrappedClass[wrappedType];
    const wrappedSelector = _getWrappedSelector(wrappedType);
    const rawCssThemePath = join(wrappedThemeHome, cssFile);
    let themeContent = readFileSync(rawCssThemePath).toString();
    const wrappedBlockNameReg = wrappedSelector.replace(/([.()])/g, '\\$1');
    const bodyReg = new RegExp(`${wrappedBlockNameReg}\\s+body\\b`, 'g');

    // 替换body标签和css变量
    // wrapped body要替换成wrapped-class，不能替换成wrapped-selector，防止伪类class匹配非body元素
    themeContent = themeContent.replace(bodyReg, wrappedClass);
    if (wrappedType == 'outer') {
        // css变量名后面添加-wrapped来区分:root下的变量
        const cssVarReg = new RegExp(`${wrappedBlockNameReg}\\s+:root\\s*{([^}]+)}`, 'g');
        themeContent = themeContent.replace(cssVarReg, function (found, match) {
            const wrappedVar = match.split(';')
                .map((m: string) => m.trim())
                .filter((m: string) => !!m)
                .map((m: string) => {
                    if (!m.startsWith('--')) {
                        return m;
                    }
                    return m.replace(/^--(.+)/, '--wrapped-$1');
                }).join(';')
            return `${wrappedClass} {${wrappedVar}}`
        });
    }
    if (wrappedType == 'inner') {
        // inner theme 的css变量还原成 :root 变量
        const cssVarReg = new RegExp(`${wrappedBlockNameReg}\\s+:root`, 'g');
        themeContent = themeContent.replace(cssVarReg, ':root');
    }
    writeFileSync(rawCssThemePath, themeContent);
}
