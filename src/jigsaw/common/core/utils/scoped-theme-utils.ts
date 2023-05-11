export type JigsawScopedThemeType = 'overridable' | 'unoverridable';

export type JigsawScopedThemeInfo = {
    type: JigsawScopedThemeType,
    // name作为唯一标识
    name: string
}

export const defaultScopedThemesConfig: JigsawScopedThemeInfo[] = [
    {type: 'overridable', name: 'overridable'},
    {type: 'unoverridable', name: 'unoverridable'},
]

// @dynamic
export class ScopedThemeUtils {
    /**
     * 在canvas上添加.jigsaw-overridable-theme，在canvas外的地方添加.jigsaw-unoverridable-theme
     * :is(.jigsaw-unoverridable-theme) xxxx 权重要比wings-theme大，要比用户写的css大，要排除scoped-theme下的元素，body使用.jigsaw-unoverridable-theme替换
     * :where(.jigsaw-overridable-theme) xxxx 权重要比wings-theme小，要比用户写的css小，body使用.jigsaw-overridable-theme替换
     */
    public static getScopedSelector(themeInfo: JigsawScopedThemeInfo): string {
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

    public static getCssVariableSelector(themeClass: string): string {
        const themeSelector = this.getThemeSelector(themeClass);
        // css变量改成themeSelector, themeSelector-variable下的变量
        // 设定两个范围，一个用于隔离皮肤里的组件，一个用于外部使用变量，但又不需要隔离皮肤的组件
        return `${themeSelector}, ${themeSelector}-variable`;
    }

    public static getStyleInfo(scopedThemeInfo?: JigsawScopedThemeInfo): { styleId: string, selector: string } {
        const themeType = scopedThemeInfo ? scopedThemeInfo.type : 'global';
        let styleId, selector;
        switch (themeType) {
            case "global":
                styleId = "jigsaw-theme";
                selector = ':root';
                break;
            default:
                styleId = this.getThemeClass(scopedThemeInfo.name);
                selector = this.getCssVariableSelector(styleId);
        }
        return {styleId, selector};
    }
}


