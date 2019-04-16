export class JigsawTheme {
    public static majorStyle: "dark" | "gray" | "black" | "purple" | "blue" | "default" = "default";

    public static getPopupBackgroundColor() {
        switch (JigsawTheme.majorStyle) {
            case 'default':
                return null;
            case "dark":
                return "#102331";
            case "gray":
                return "#232429";
            case "black":
                return "#151518";
            case "purple":
                return "#1c1c2e";
            case "blue":
                return "#102940";
            default:
                return null;
        }
    }
}
