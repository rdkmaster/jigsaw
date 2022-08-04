import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {
    JigsawFloatModule,
    JigsawListLiteModule,
    JigsawRootModule,
    JigsawTheme,
    JigsawTreeExtModule,
    JigsawButtonBarModule,
    SupportedTheme,
    JigsawCheckBoxModule,
    JigsawNumericInputModule,
    JigsawSelectModule,
    MajorStyle
} from "jigsaw/public_api";
import {AppComponent} from './app.component';
import {AjaxInterceptor} from './app.interceptor';
import {routerConfig} from "./router-config";
import {PCDemoListComponent} from "./pc-demo-list.component";
import {MobileDemoListComponent} from "./mobile-demo-list.component";
import {SwitchDemoComponent} from "./switch-demo.component";
import {DemoCodeComponent} from "./demo-code.component";
import {ExampleDemoModule} from './demo/pc/example/demo.module';
import {AlertDemoModule} from "./demo/pc/alert/demo.module";
import {HeaderDemoModule} from "./demo/pc/header/demo.module";
import {BreadcrumbDemoModule} from "./demo/pc/breadcrumb/demo.module";
import {ButtonDemoModule} from "./demo/pc/button/demo.module";
import {CheckBoxDemoModule} from "./demo/pc/checkbox/demo.module";
import {ButtonBarDemoModule} from "./demo/pc/button-bar/demo.module";
import {BadgeDemoModule} from "./demo/pc/badge/demo.module";
import {RadioGroupDemoModule} from "./demo/pc/radio/demo.module";
import {CascadeAllModule} from "./demo/pc/cascade/demo.module";
import {IconDemoModule} from "./demo/pc/icon/demo.module";
import {DrawerDemoModule} from "./demo/pc/drawer/demo.module";
import {SwitchDemoModule} from "./demo/pc/switch/demo.module";
import {InputDemoModule} from "./demo/pc/input/demo.module";
import {MenuDemoModule} from "./demo/pc/menu/demo.module";
import {SearchInputDemoModule} from "./demo/pc/search-input/demo.module";
import {NumericInputDemoModule} from "./demo/pc/numeric-input/demo.module";
import {AutoCompleteInputDemoModule} from "./demo/pc/auto-complete-input/demo.module";
import {FishBoneDemoModule} from "./demo/pc/fish-bone/demo.module";
import {AlphabeticalIndexDemoModule} from "./demo/pc/alphabetical-index/demo.module";
import {RateDemoModule} from "./demo/pc/rate/demo.module";
import {StepsDemoModule} from "./demo/pc/steps/demo.module";
import {TextareaDemoModule} from "./demo/pc/textarea/demo.module";
import {PaginationDemoModule} from "./demo/pc/pagination/demo.module";
import {ZtreeDemoModule} from "./demo/pc/tree/demo.module";
import {ColorSelectDemoModule} from "./demo/pc/color-select/demo.module";
import {ComboSelectDemoModule} from "./demo/pc/combo-select/demo.module";
import {CollapseDemoModule} from "./demo/pc/collapse/demo.module";
import {DialogDemoModule} from "./demo/pc/dialog/demo.module";
import {UploadDemoModule} from "./demo/pc/upload/demo.module";
import {IconsDemoModule} from "./demo/pc/icons/demo.module";
import {LoadingDemoModule} from "./demo/pc/loading/demo.module";
import {MovableDemoModule} from "./demo/pc/movable/demo.module";
import {AdjustFontColorDemoModule} from "./demo/pc/adjust-font-color/demo.module";
import {NavigationMenuDemoModule} from "./demo/pc/navigation-menu/demo.module";
import {NotificationDemoModule} from "./demo/pc/notification/demo.module";
import {ToastDemoModule} from "./demo/pc/toast/demo.module";
import {TabsDemoModule} from "./demo/pc/tab/demo.module";
import {ThemePropertiesDemoModule} from "./demo/pc/theme-properties/demo.module";
import {TooltipDemoModule} from "./demo/pc/tooltip/demo.module";
import {TagDemoModule} from "./demo/pc/tag/demo.module";
import {ListDemoModule} from "./demo/pc/list/demo.module";
import {ProgressDemoModule} from "./demo/pc/progress/demo.module";
import {BoxDemoModule} from "./demo/pc/box/demo.module";
import {TileSelectDemoModule} from "./demo/pc/tile/demo.module";
import {ProcessStatusDemoModule} from "./demo/pc/process-status/demo.module";
import {SliderAllDemoModule} from "./demo/pc/slider/demo.module";
import {TrustedHtmlDemoModule} from "./demo/pc/trusted-html/demo.module";
import {TransferDemoModule} from "./demo/pc/transfer/demo.module";
import {TimeSectionDemoModule} from "./demo/pc/time-section/demo.module";
import {ChartIconDemoModule} from "./demo/pc/chart-icon/demo.module";
import {TimePickerDemoModule} from "./demo/pc/time-picker/demo.module";
import {SelectDemoModule} from "./demo/pc/select/demo.module";
import {DragDropDemoModule} from "./demo/pc/drag-drop/demo.module";
import {PopupDemoModule} from "./demo/pc/popup/demo.module";
import {DataEncapsulationDemoModule} from "./demo/pc/data-encapsulation/demo.module";
import {GraphDemoModule} from "./demo/pc/graph/demo.module";

@NgModule({
    declarations: [
        AppComponent, PCDemoListComponent, MobileDemoListComponent, SwitchDemoComponent, DemoCodeComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, HttpClientModule, DrawerDemoModule, IconDemoModule, InputDemoModule,
        MenuDemoModule, NumericInputDemoModule, PaginationDemoModule, SearchInputDemoModule, StepsDemoModule, TextareaDemoModule,
        ZtreeDemoModule, UploadDemoModule, AdjustFontColorDemoModule, ThemePropertiesDemoModule, MovableDemoModule, TabsDemoModule,
        BoxDemoModule, TileSelectDemoModule, ListDemoModule,
        RouterModule.forRoot([
            ...routerConfig,
            {path: '', component: SwitchDemoComponent},
            {path: 'pc', component: PCDemoListComponent},
            {path: 'mobile', component: MobileDemoListComponent},
            {
                path: 'demo-code', component: DemoCodeComponent, children: [
                    {path: '**', component: DemoCodeComponent}
                ]
            },
            { path: '**', redirectTo: '/' }
        ], { useHash: true }),
        JigsawRootModule, CheckBoxDemoModule, JigsawFloatModule, JigsawListLiteModule, JigsawTreeExtModule, JigsawButtonBarModule,
        JigsawCheckBoxModule, JigsawNumericInputModule, JigsawSelectModule, ExampleDemoModule, CascadeAllModule, AlertDemoModule,
        HeaderDemoModule, AutoCompleteInputDemoModule, FishBoneDemoModule, AlphabeticalIndexDemoModule, RateDemoModule,
        ColorSelectDemoModule, CollapseDemoModule, BadgeDemoModule, DialogDemoModule, ComboSelectDemoModule, IconsDemoModule,
        LoadingDemoModule, NavigationMenuDemoModule, NotificationDemoModule, ToastDemoModule, TooltipDemoModule, TagDemoModule,
        ProgressDemoModule, ProcessStatusDemoModule, SliderAllDemoModule, TrustedHtmlDemoModule, TransferDemoModule, TimeSectionDemoModule,
        ChartIconDemoModule, TimePickerDemoModule, SelectDemoModule, DragDropDemoModule, PopupDemoModule, DataEncapsulationDemoModule,
        GraphDemoModule,
        TranslateModule.forRoot(), BreadcrumbDemoModule, ButtonDemoModule, ButtonBarDemoModule, RadioGroupDemoModule, SwitchDemoModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AjaxInterceptor,
            multi: true,
        },
        TranslateService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        let themeName: SupportedTheme, majorStyle: MajorStyle;
        const themeString = localStorage.getItem("jigsawDemoTheme");
        if (themeString === null) {
            themeName = 'paletx-pro';
            majorStyle = 'light';
        } else {
            const themeData = JSON.parse(themeString);
            themeName = themeData.name;
            majorStyle = themeData.majorStyle;
        }
        JigsawTheme.changeTheme(themeName, majorStyle);
    }
}

