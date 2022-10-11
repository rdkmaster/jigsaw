import { Component, ViewEncapsulation } from "@angular/core";
import { JigsawTheme } from "jigsaw/public_api";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    themeData = [
        {
            groupName: "亮色主题",
            data: [
                { label: "VMax Light", name: "vmax-pro", style: "light" },
                { label: "OES Light", name: "paletx-pro", style: "light" },
                { label: "Ux2.0 Light", name: "idea", style: "light" },
                { label: "MASBD Light", name: "masbd", style: "light" },
                { label: "ZJCM Light", name: "zjcm", style: "light" },
            ],
        },
        {
            groupName: "深色主题",
            data: [{ label: "OES Dark", name: "paletx-pro", style: "dark" }],
        },
    ];

    themeChange(theme) {
        const themeData = theme[0].data[0];
        const themeName = themeData.name,
            majorStyle = themeData.style;
        // localStorage.setItem("jigsawDemoTheme", JSON.stringify({name: themeName, majorStyle: majorStyle}));
        JigsawTheme.changeTheme(themeName, majorStyle);
        const stylesSheets = document.getElementById('jigsaw-app-for-external-code-theme') as HTMLAnchorElement;
        if (!stylesSheets) {
            return;
        }
        stylesSheets.href = `app/for-external/assets/prism-${themeData.style}.css`;
    }
}
