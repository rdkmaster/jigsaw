import {Component, ViewEncapsulation} from "@angular/core";
import {JigsawTheme, PopupPositionType} from "jigsaw/public_api";

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
                {label: "VMax Light", name: "vmax-pro", style: "light"},
                {label: "OES Light", name: "paletx-pro", style: "light"},
                {label: "Ux2.0 Light", name: "idea", style: "light"},
                {label: "MASBD Light", name: "masbd", style: "light"},
                {label: "ZJCM Light", name: "zjcm", style: "light"},
            ],
        },
        {
            groupName: "深色主题",
            data: [{label: "OES Dark", name: "paletx-pro", style: "dark"}],
        },
    ];

    public versionData = [
        {label: 'latest', url: '/#/home'},
        {label: 'v9.3', url: 'https://rdk.zte.com.cn/v9.3/#/'},
        {label: 'v8.0', url: 'https://rdk.zte.com.cn/v8.0/#/'},
        {label: 'v5.0', url: 'https://rdk.zte.com.cn/v5.0/#/'},
        {label: 'v1.1', url: 'https://rdk.zte.com.cn/v1.1/#/'}
    ]

    public themeChange(theme) {
        const themeData = theme[0].data[0];
        const themeName = themeData.name,
            majorStyle = themeData.style;
        JigsawTheme.changeTheme(themeName, majorStyle);
        this.logoPath = `app/for-external/assets/img/logo-${JigsawTheme.majorStyle}.png`;
    }

    public changeVersion(version: { label: string, url: string }) {
        window.location.href = version.url;
    }
}
