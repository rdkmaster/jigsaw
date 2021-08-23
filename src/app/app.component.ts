import {AfterContentInit, Component, ViewEncapsulation,ChangeDetectorRef} from "@angular/core";
import {ArrayCollection} from "../jigsaw/common/core/data/array-collection";
import {JigsawTheme} from "../jigsaw/common/core/theming/theme";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./live-demo-wrapper.css', './app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterContentInit {
    public demoCodePage = location.hash.split('/').find(item => item === 'demo-code');
    ngAfterContentInit() {
        this.themeInit();
    }

    selectedTheme: any[];
    themes = new ArrayCollection([
        { label: "Paletx Pro Light", name: 'paletx-pro', majorStyle: 'light' },
        { label: "Paletx Pro Dark", name: 'paletx-pro', majorStyle: 'dark' },
        { label: "Vmax Pro Light", name: 'vmax-pro', majorStyle: 'light' }
    ]);

    themeSelectChange(themeArr: ArrayCollection<any>) {
        const themeName = themeArr[0].name, majorStyle = themeArr[0].majorStyle;
        localStorage.setItem("jigsawDemoTheme", JSON.stringify({name: themeName, majorStyle: majorStyle}));
        JigsawTheme.changeTheme(themeName, majorStyle);
    }

    themeInit() {
        const themeString = localStorage.getItem("jigsawDemoTheme");
        if (themeString === null) {
            this.selectedTheme = [{ name: "paletx-pro", majorStyle: 'light' }];
        } else {
            const themeData = JSON.parse(themeString);
            this.selectedTheme = [themeData];
            JigsawTheme.changeTheme(themeData.name, themeData.majorStyle);
        }
    }
}
