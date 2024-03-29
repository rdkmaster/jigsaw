/**
 * overridable 表示这套皮肤使用时，它的样式是有预期会被覆盖的
 * unoverridable 则相反，表示这套皮肤的样式不能被覆盖
 */
export type ScopedThemeType = 'overridable' | 'unoverridable';

export type ScopedThemeInfo = {
    type: ScopedThemeType,
    // name作为唯一标识
    name: string
}

export const defaultScopedThemesConfig: ScopedThemeInfo[] = [
    {type: 'overridable', name: 'overridable'},
    {type: 'unoverridable', name: 'unoverridable'},
]

// @dynamic
export class ScopedThemeUtils {
    /**
     * :is(.jigsaw-unoverridable-theme) xxxx 权重要比wings-theme大，要比用户写的css大，body使用.jigsaw-unoverridable-theme替换
     * :where(.jigsaw-overridable-theme) xxxx 权重要比wings-theme小，要比用户写的css小，body使用.jigsaw-overridable-theme替换
     */
    public static getScopedSelector(themeInfo: ScopedThemeInfo): string {
        const selector = this.getThemeSelector(themeInfo.name);
        return themeInfo.type == 'unoverridable' ? `:is(${selector})`
            : `:where(${selector})`;
    }

    public static getThemeClass(themeName: string): string {
        return `jigsaw-${themeName}-theme`;
    }

    public static getThemeSelector(themeName: string): string {
        return `.${this.getThemeClass(themeName)}`;
    }

    public static getCssVariableSelector(themeName: string): string {
        const themeSelector = this.getThemeSelector(themeName);
        // css变量改成themeSelector, themeSelector-variable下的变量
        // 设定两个范围，一个用于隔离皮肤里的组件，一个用于外部使用变量，但又不需要隔离皮肤的组件
        return `${themeSelector}, ${themeSelector}-variable`;
    }

    public static getStyleInfo(scopedThemeInfo?: ScopedThemeInfo): { styleId: string, selector: string } {
        const themeType = scopedThemeInfo ? scopedThemeInfo.type : 'global';
        let styleId, selector;
        switch (themeType) {
            case "global":
                styleId = "jigsaw-theme";
                selector = ':root';
                break;
            default:
                styleId = this.getThemeClass(scopedThemeInfo.name);
                selector = this.getCssVariableSelector(scopedThemeInfo.name);
        }
        return {styleId, selector};
    }
}


