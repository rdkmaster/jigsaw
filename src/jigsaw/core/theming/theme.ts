export class JigsawTheme {
    public static majorStyle : "dark" | "light" = "light";

    public static getPopupBackgroundColor() {
        switch (JigsawTheme.majorStyle) {
            case "dark":
                return "#102331";
            default:
                return null;
        }
    }
}
