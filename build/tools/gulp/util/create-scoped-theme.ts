import {join} from 'path';
import {writeFileSync, readFileSync} from 'fs-extra';
import {sync as glob} from 'glob';
import {Bundler} from 'scss-bundle';
import {
    ThemeUtils,
    JigsawScopedThemeClass,
    JigsawScopedThemeType
} from "../../../../src/jigsaw/common/core/utils/theme-utils";

export async function bundleScopedScss(type: JigsawScopedThemeType, themingPrebuiltHome: string, scssHome: string) {
    const allScopedScssGlob = join(scssHome, '**/*.scss');
    const files = glob('*.scss', {cwd: themingPrebuiltHome});
    for (const filePath of files) {
        const result = await new Bundler().Bundle(join(themingPrebuiltHome, filePath), [allScopedScssGlob]);
        const targetScssThemePath = join(scssHome, filePath.replace(/(.+)\.scss$/, `$1-${type}.scss`));
        writeFileSync(targetScssThemePath, `
                ${ThemeUtils.getScopedSelector(type)} {
                    ${result.bundledContent}
                }
            `);
    }
}

export function createScopedTheme(ScopedThemeHome: string, cssFile: string) {
    const scopedType: JigsawScopedThemeType = cssFile.endsWith('-weight.css') ? 'weight' : 'scoped';
    const themeClass = JigsawScopedThemeClass[scopedType];
    const scopedSelector = ThemeUtils.getScopedSelector(scopedType);
    const rawCssThemePath = join(ScopedThemeHome, cssFile);
    let themeContent = readFileSync(rawCssThemePath).toString();
    const scopedBlockNameReg = scopedSelector.replace(/([.()])/g, '\\$1');
    const bodyReg = new RegExp(`${scopedBlockNameReg}\\s+body\\b`, 'g');
    const cssVarReg = new RegExp(`${scopedBlockNameReg}\\s+:root`, 'g');

    // 替换body标签和css变量
    // scoped body要替换成theme-selector，不能替换成:is(theme-selector)，防止伪类class匹配非body元素
    themeContent = themeContent.replace(bodyReg, ThemeUtils.getThemeSelector(themeClass))
        .replace(cssVarReg, ThemeUtils.getCssVariableSelector(themeClass));
    writeFileSync(rawCssThemePath, themeContent);
}
