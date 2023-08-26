import {join} from 'path';
import {writeFileSync, readFileSync} from 'fs-extra';
import {renameSync} from 'fs';
import {sync as glob} from 'glob';
import {Bundler} from 'scss-bundle';
import {
    ScopedThemeUtils, ScopedThemeInfo, defaultScopedThemesConfig
} from "../../../../src/jigsaw/common/core/utils/scoped-theme-utils";

export async function bundleScopedScss(themeInfo: ScopedThemeInfo, themingPrebuiltHome: string, scssHome: string) {
    const allScopedScssGlob = join(scssHome, '**/*.scss');
    console.log(allScopedScssGlob);
    const files = glob('*.scss', {cwd: themingPrebuiltHome});

    let exclusiveScssResult = '';
    const exclusiveScss = join(scssHome, 'common/assets/scss/reset.scss');
    const allThemeScss = join(scssHome, 'pc-components/theming/all-theme.scss');
    const searchString = '@import "../../common/assets/scss/reset.scss";';
    if (themeInfo.type === "unoverridable") {
        const result = await new Bundler().Bundle(exclusiveScss);
        exclusiveScssResult = result.bundledContent;
        renameSync(exclusiveScss, exclusiveScss + 'rename');

        const allThemeContent = readFileSync(allThemeScss).toString();
        if (!allThemeContent.includes(searchString)) {
            console.error("Can't find reset import");
        }
        const allThemeResult = allThemeContent.replace(searchString, '');
        writeFileSync(allThemeScss, allThemeResult);
    }
    for (const filePath of files) {
        const result = await new Bundler().Bundle(join(themingPrebuiltHome, filePath), [allScopedScssGlob]);
        const targetScssThemePath = join(scssHome, filePath.replace(/(.+)\.scss$/, `$1-${themeInfo.name}.scss`));
        writeFileSync(targetScssThemePath, `
                ${ScopedThemeUtils.getScopedSelector(themeInfo)} {
                    ${result.bundledContent}
                }
                ${exclusiveScssResult}
            `);
    }
    if (themeInfo.type === "unoverridable") {
        renameSync(exclusiveScss + 'rename', exclusiveScss)
        const allThemeContent = readFileSync(allThemeScss).toString();
        const allThemeResult = `${searchString} ${allThemeContent}`;
        writeFileSync(allThemeScss, allThemeResult);
    }
}

export function createScopedTheme(ScopedThemeHome: string, cssFile: string) {
    const scopedThemesConfig = getScopedThemesConfig();
    const {type: scopedType, name: themeName} = scopedThemesConfig.find(themeInfo => cssFile.endsWith(`-${themeInfo.name}.css`));
    const scopedSelector = ScopedThemeUtils.getScopedSelector({type: scopedType, name: themeName});
    const rawCssThemePath = join(ScopedThemeHome, cssFile);
    let themeContent = readFileSync(rawCssThemePath).toString();
    const scopedBlockNameReg = scopedSelector.replace(/([.()])/g, '\\$1');
    const bodyReg = new RegExp(`${scopedBlockNameReg}\\s+body\\b`, 'g');
    const cssVarReg = new RegExp(`${scopedBlockNameReg}\\s+:root`, 'g');

    // 替换body标签和css变量
    // scoped body要替换成theme-selector，不能替换成:is(theme-selector)，防止伪类class匹配非body元素
    themeContent = themeContent.replace(bodyReg, ScopedThemeUtils.getThemeSelector(themeName))
        .replace(cssVarReg, ScopedThemeUtils.getCssVariableSelector(themeName));
    writeFileSync(rawCssThemePath, themeContent);
}

export function getScopedThemesConfig(): ScopedThemeInfo[] {
    const args = process.argv.slice(3);
    const params: any = {};
    // 解析参数为键值对
    args.forEach(arg => {
        const [key, value] = arg.split('=');
        params[key.replace('--', '')] = value;
    });
    if (!params.hasOwnProperty('scopedThemes')) {
        // 没有配置scopedThemes
        return defaultScopedThemesConfig;
    }
    let scopedThemesConfig: ScopedThemeInfo[];
    try {
        scopedThemesConfig = eval(params.scopedThemes);
    } catch {
        console.error('parse scoped theme config error!');
        scopedThemesConfig = defaultScopedThemesConfig;
    }
    return scopedThemesConfig;
}
