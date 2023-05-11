export type JigsawThemeType = 'global' | JigsawScopedThemeType;

export type JigsawScopedThemeType = 'scoped' | 'weight';

export enum JigsawScopedThemeClass {
    scoped = 'jigsaw-scoped-theme', weight = 'jigsaw-weight-theme'
}

// @dynamic
export class ThemeUtils {
    /**
     * 在canvas上添加.jigsaw-scoped-theme，在canvas外的地方添加.jigsaw-weight-theme
     * :is(.jigsaw-weight-theme) xxxx 权重要比wings-theme大，要比用户写的css大，要排除scoped-theme下的元素，body使用.jigsaw-weight-theme替换
     * :where(.jigsaw-scoped-theme) xxxx 权重要比wings-theme小，要比用户写的css小，body使用.jigsaw-scoped-theme替换
     * @param type
     */
    public static getScopedSelector(type: JigsawScopedThemeType): string {
        return type == 'weight' ? `:is(${this.getThemeSelector(JigsawScopedThemeClass.weight)})`
            : `:where(${this.getThemeSelector(JigsawScopedThemeClass.scoped)})`;
    }

    public static getThemeSelector(themeClass: JigsawScopedThemeClass): string {
        return '.' + themeClass;
    }

    public static getCssVariableSelector(themeClass: JigsawScopedThemeClass): string {
        const themeSelector = this.getThemeSelector(themeClass);
        // css变量改成themeSelector, themeSelector-variable下的变量
        // 设定两个范围，一个用于隔离皮肤里的组件，一个用于外部使用变量，但又不需要隔离皮肤的组件
        return `${themeSelector}, ${themeSelector}-variable`;
    }

    public static getStyleInfo(themeType: JigsawThemeType): { styleId: string, selector: string } {
        let styleId, selector;
        switch (themeType) {
            case "global":
                styleId = "jigsaw-theme";
                selector = ':root';
                break;
            case "scoped":
            case "weight":
                styleId = JigsawScopedThemeClass[themeType];
                selector = this.getCssVariableSelector(styleId);
        }
        return {styleId, selector};
    }
}


