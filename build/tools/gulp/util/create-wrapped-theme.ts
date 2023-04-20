import {join} from 'path';
import {writeFileSync, readFileSync} from 'fs-extra';

export function createWrappedTheme(wrappedSelector: string, wrappedThemeHome: string, cssFile: string) {
    const rawCssThemePath = join(wrappedThemeHome, cssFile);
    const targetCssThemePath = join(wrappedThemeHome, cssFile.replace(/(.+)\.css$/, `$1-wrapped.css`));
    let themeContent = readFileSync(rawCssThemePath).toString();
    const wrappedBlockNameReg = wrappedSelector.replace(/\./g, '\\.');
    const bodyReg = new RegExp(`${wrappedBlockNameReg}\\s+body\\b`, 'g');
    const cssVarReg = new RegExp(`${wrappedBlockNameReg}\\s+:root\\s*{([^}]+)}`, 'g');
    // 替换body标签和css变量
    themeContent = themeContent.replace(bodyReg, wrappedSelector)
        // css变量名后面添加-wrapped来区分:root下的变量
        .replace(cssVarReg, function (found, match) {
            const wrappedVar = match.split(';')
                .map((m: string) => m.trim())
                .filter((m: string) => !!m)
                .map((m: string) => {
                    if (!m.startsWith('--')) {
                        return m;
                    }
                    return m.replace(/^--(.+)/, '--wrapped-$1');
                }).join(';')
            return `${wrappedSelector} {${wrappedVar}}`
        });
    writeFileSync(targetCssThemePath, themeContent);
}

export function createOpenedTheme(wrappedSelector: string, wrappedThemeHome: string, cssFile: string) {
    const rawCssThemePath = join(wrappedThemeHome, cssFile);
    const targetCssThemePath = join(wrappedThemeHome, cssFile.replace(/(.+)\.css$/, `$1-opened.css`));
    // 为了比wings-theme权重低需要加:where
    const openedSelector = `:where(body :not(${wrappedSelector}))`;
    let themeContent = readFileSync(rawCssThemePath).toString();
    const wrappedBlockNameReg = wrappedSelector.replace(/\./g, '\\.');
    const bodyReg = new RegExp(`${wrappedBlockNameReg}\\s+body\\b`, 'g');
    const selectorReg = new RegExp(`${wrappedBlockNameReg}\\b`, 'g');
    const cssVarReg = new RegExp(`${wrappedBlockNameReg}\\s+:root`, 'g');
    // 替换body标签、wrapped选择器和css变量
    themeContent = themeContent
        // body先替换成tmp-selector，防止后面误替换
        .replace(bodyReg, 'tmp-selector')
        // opened theme 的css变量还原成 :root 变量
        .replace(cssVarReg, ':root')
        // wrapped选择器替换成opened选择器
        .replace(selectorReg, openedSelector)
        .replace(/tmp-selector/g, openedSelector);
    writeFileSync(targetCssThemePath, themeContent);
}
