import {AfterContentInit, Component, ViewEncapsulation} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {ArrayCollection} from "../jigsaw/common/core/data/array-collection";
import {JigsawTheme} from "../jigsaw/common/core/theming/theme";
import {TranslateHelper} from "../jigsaw/common/core/utils/translate-helper";
import {JigsawNotification} from "../jigsaw/pc-components/notification/notification";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./live-demo-wrapper.css', './app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterContentInit {
    public demoCodePage = location.hash.split('/').find(item => item === 'demo-code');
    public selectedTheme: any[];
    public themes = new ArrayCollection([
        { label: "Paletx Pro Light", name: 'paletx-pro', majorStyle: 'light' },
        { label: "Paletx Pro Dark", name: 'paletx-pro', majorStyle: 'dark' },
        { label: "Vmax Pro Light", name: 'vmax-pro', majorStyle: 'light' },
        { label: "IDEA Light", name: 'idea', majorStyle: 'light' }
    ]);

    constructor(private _translateService: TranslateService) {
    }

    ngAfterContentInit() {
        this.themeInit();
    }

    changeLanguage(lang: { value: 'zh' | 'en' }) {
        TranslateHelper.changeLanguage(this._translateService, lang.value);
        // 这里别用showInfo，因为notification自身的语言此时还未被加载，导致标题发生错误
        JigsawNotification.show('提示：Jigsaw的几乎所有demo本身，包括一些通过Input属性传给组件的文本（如placeholder），' +
            '都未支持中英双语切换。这个切换语言动作只能影响到封装在组件内部的词条，可用于测试这些词条在中英双语下的表现。');
    }

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
