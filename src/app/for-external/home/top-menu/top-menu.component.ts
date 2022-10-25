import { Component, ViewEncapsulation } from "@angular/core";
import { JigsawTheme, PopupPositionType } from "jigsaw/public_api";

@Component({
    selector: "ued-top-menu",
    templateUrl: "./top-menu.component.html",
    styleUrls: ["./top-menu.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class TopMenuComponent {
    public logoPath = `app/for-external/assets/img/logo-${JigsawTheme.majorStyle}.png`;
    public positionType = PopupPositionType.fixed;
    public themeData = [
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

    public versionData = ['v10.0', 'v9.3', 'v8.0', 'v5.0', 'v1.1'];

    public themeChange(theme) {
        const themeData = theme[0].data[0];
        const themeName = themeData.name,
            majorStyle = themeData.style;
        JigsawTheme.changeTheme(themeName, majorStyle);
        this.logoPath = `app/for-external/assets/img/logo-${JigsawTheme.majorStyle}.png`;
    }

    public changeVersion(version) {
        window.location.href = `https://rdk.zte.com.cn/${version}/#/`
    }
}
