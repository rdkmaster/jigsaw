import { AfterContentInit, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { PopupPositionType } from "jigsaw/public_api";
import { ThemeService } from "../service/theme-service";

@Component({
    selector: "ued-top-menu",
    templateUrl: "./top-menu.component.html",
    styleUrls: ["./top-menu.component.scss"],
    providers: [ThemeService],
    encapsulation: ViewEncapsulation.None,
})
export class TopMenuComponent implements OnInit, AfterContentInit {
    public logoPath = `app/for-external/assets/img/logo-${this._themeService.service.majorStyle}.png`;
    public positionType = PopupPositionType.fixed;
    public showThemeSelect: boolean = false;
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
            data: [
                { label: "OES Dark", name: "paletx-pro", style: "dark" },
                { label: "VMax Dark", name: "vmax-pro", style: "dark" }
            ],
        },
    ];
    public selectedTheme = [{ groupName: "亮色主题", data: [{ label: "VMax Light", name: "vmax-pro", style: "light" }] }];

    public versionData = [
        { label: 'latest', url: '/latest/#/' },
        { label: 'v9.3', url: '/v9.3/#/' },
        { label: 'v8.0', url: '/v8.0/#/' },
        { label: 'v5.0', url: '/v5.0/#/' },
        { label: 'v1.1', url: '/v1.1/#/' }
    ];

    public themeChange(theme) {
        const themeData = theme[0].data[0];
        const themeName = themeData.name;
        const majorStyle = themeData.style;
        this._themeService.changeTheme(themeName, majorStyle);
        localStorage.setItem("jigsawExternalDemoTheme", JSON.stringify([{ groupName: majorStyle === 'light' ? '亮色主题' : '深色主题', data: [themeData] }]));
    }

    private _themeInit() {
        const themeString = localStorage.getItem("jigsawExternalDemoTheme");
        if (themeString === null) {
            return;
        }
        this.selectedTheme = JSON.parse(themeString);
    }

    public changeVersion(version: { label: string, url: string }) {
        window.location.href = version.url;
    }

    constructor(private _router: Router, private _themeService: ThemeService) {
        _router.events.subscribe((route) => {
            if (route instanceof NavigationEnd) {
                this.showThemeSelect = route.url.startsWith('/components')
            }
        });
    }

    ngOnInit(): void {
        this._themeService.themeChange.subscribe(() => {
            this.logoPath = `app/for-external/assets/img/logo-${this._themeService.service.majorStyle}.png`;
        })
    }

    ngAfterContentInit(): void {
        this._themeInit();
    }
}
