export class JigsawTheme {
    public static majorStyle : "dark" | "default" = "default";

    public static getPopupBackgroundColor() {
        switch (JigsawTheme.majorStyle) {
            case 'default':
                return null;
            case "dark":
                return "#102331";
            default:
                return null;
        }
    }
}
