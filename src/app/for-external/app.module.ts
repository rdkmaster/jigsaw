import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import {
    JigsawFloatModule,
    JigsawListLiteModule,
    JigsawRootModule,
    JigsawTreeExtModule,
    JigsawButtonBarModule,
    SupportedTheme,
    JigsawCheckBoxModule,
    JigsawNumericInputModule,
    JigsawSelectModule,
    MajorStyle,
    JigsawButtonModule,
    JigsawSearchInputModule, JigsawThemeService,
} from "jigsaw/public_api";
import { AppComponent } from "./app.component";
import { AjaxInterceptor } from "../libs/app.interceptor";
import { routerConfig } from "./router-config";
import { AlertDemoModule } from "./demo/alert/demo.module";
import { HeaderDemoModule } from "./demo/header/demo.module";
import { BreadcrumbDemoModule } from "./demo/breadcrumb/demo.module";
import { ButtonDemoModule } from "./demo/button/demo.module";
import { CheckBoxDemoModule } from "./demo/checkbox/demo.module";
import { ButtonBarDemoModule } from "./demo/button-bar/demo.module";
import { BadgeDemoModule } from "./demo/badge/demo.module";
import { RibbonDemoModule } from "./demo/ribbon/demo.module";
import { RadioGroupDemoModule } from "./demo/radio/demo.module";
import { CascadeAllModule } from "./demo/cascade/demo.module";
import { IconDemoModule } from "./demo/icon/demo.module";
import { DrawerDemoModule } from "./demo/drawer/demo.module";
import { SwitchDemoModule } from "./demo/switch/demo.module";
import { InputDemoModule } from "./demo/input/demo.module";
import { MenuDemoModule } from "./demo/menu/demo.module";
import { SearchInputDemoModule } from "./demo/search-input/demo.module";
import { NumericInputDemoModule } from "./demo/numeric-input/demo.module";
import { AutoCompleteInputDemoModule } from "./demo/auto-complete-input/demo.module";
import { FishBoneDemoModule } from "./demo/fish-bone/demo.module";
import { AlphabeticalIndexDemoModule } from "./demo/alphabetical-index/demo.module";
import { RateDemoModule } from "./demo/rate/demo.module";
import { StepsDemoModule } from "./demo/steps/demo.module";
import { TextareaDemoModule } from "./demo/textarea/demo.module";
import { PaginationDemoModule } from "./demo/pagination/demo.module";
import { ZtreeDemoModule } from "./demo/tree/demo.module";
import { ColorSelectDemoModule } from "./demo/color-select/demo.module";
import { ComboSelectDemoModule } from "./demo/combo-select/demo.module";
import { CollapseDemoModule } from "./demo/collapse/demo.module";
import { DialogDemoModule } from "./demo/dialog/demo.module";
import { UploadDemoModule } from "./demo/upload/demo.module";
import { LoadingDemoModule } from "./demo/loading/demo.module";
import { MovableDemoModule } from "./demo/movable/demo.module";
import { AdjustFontColorDemoModule } from "./demo/adjust-font-color/demo.module";
import { NavigationMenuDemoModule } from "./demo/navigation-menu/demo.module";
import { NotificationDemoModule } from "./demo/notification/demo.module";
import { ToastDemoModule } from "./demo/toast/demo.module";
import { TabsDemoModule } from "./demo/tab/demo.module";
import { ThemePropertiesDemoModule } from "./demo/theme-properties/demo.module";
import { TooltipDemoModule } from "./demo/tooltip/demo.module";
import { TagDemoModule } from "./demo/tag/demo.module";
import { ListDemoModule } from "./demo/list/demo.module";
import { ProgressDemoModule } from "./demo/progress/demo.module";
import { BoxDemoModule } from "./demo/box/demo.module";
import { ListLiteDemoModule } from "./demo/list-lite/demo.module";
import { TileSelectDemoModule } from "./demo/tile/demo.module";
import { ProcessStatusDemoModule } from "./demo/process-status/demo.module";
import { SliderAllDemoModule } from "./demo/slider/demo.module";
import { TrustedHtmlDemoModule } from "./demo/trusted-html/demo.module";
import { TransferDemoModule } from "./demo/transfer/demo.module";
import { TimeSectionDemoModule } from "./demo/time-section/demo.module";
import { ChartIconDemoModule } from "./demo/chart-icon/demo.module";
import { TimePickerDemoModule } from "./demo/time-picker/demo.module";
import { SelectDemoModule } from "./demo/select/demo.module";
import { DragDropDemoModule } from "./demo/drag-drop/demo.module";
import { PopupDemoModule } from "./demo/popup/demo.module";
import { DataEncapsulationDemoModule } from "./demo/data-encapsulation/demo.module";
import { GraphDemoModule } from "./demo/graph/demo.module";
import { FloatDemoModule } from "./demo/float/demo.module";
import { RangeDateTimeDemoModule } from "./demo/range-date-time-picker/demo.module";
import { DatePickerDemoModule } from "./demo/date-picker/demo.module";
import { DateTimePickerDemoModule } from "./demo/date-time-picker/demo.module";
import { TableBasicDemoModule } from "./demo/table-basic/demo.module";
import { TableActionsDemoModule } from "./demo/table-actions/demo.module";
import { TableColumnDefinesDemoModule } from "./demo/table-column-defines/demo.module";
import { TableBigTableDemoModule } from "./demo/table-big-data/demo.module";
import { TableRendererDemoModule } from "./demo/table-renderer/demo.module";
import { HomeComponent } from "./ued/home.component";
import { TopMenuComponent } from "./ued/top-menu/top-menu.component";
import { PageNotFoundComponent } from "./ued/page-not-found/page-not-found.component";
import { ComponentMenuNavComponent } from "./ued/component-menu-nav/component-menu-nav.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { QuickStartDemoModule } from "./demo/quick-start/demo.module";
import { SpecificationComponent } from "./ued/design/specification";
import { PatternComponent } from "./ued/design/pattern";
import { ApiListDemoModule } from "./demo/api-list/demo.module";
import { IconsDemoComponent } from "./ued/icons/icons";
import { CommonModule } from "@angular/common";
import {InternalDemoModule} from "./demo/internal-demo/demo.module";
import { NavigationBarDemoModule } from "./demo/navigation-bar/demo.module";
import { TranslateDemoModule } from "./demo/translate/demo.module";

@NgModule({
    declarations: [AppComponent, HomeComponent, TopMenuComponent, PageNotFoundComponent, ComponentMenuNavComponent, IconsDemoComponent],
    imports: [
        RouterModule.forRoot(
            [
                { path: "", redirectTo: 'home', pathMatch: 'full' },
                { path: "home", component: HomeComponent },
                { path: "icons", component: IconsDemoComponent },
                { path: "specification", component: SpecificationComponent },
                { path: "pattern", component: PatternComponent },
                {
                    path: 'components', component: ComponentMenuNavComponent,
                    children: routerConfig
                },
                { path: "**", component: PageNotFoundComponent }
            ],
            { useHash: true }
        ),
        TranslateModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        DrawerDemoModule,
        IconDemoModule,
        InputDemoModule,
        MenuDemoModule,
        NumericInputDemoModule,
        PaginationDemoModule,
        SearchInputDemoModule,
        StepsDemoModule,
        TextareaDemoModule,
        ZtreeDemoModule,
        UploadDemoModule,
        AdjustFontColorDemoModule,
        ThemePropertiesDemoModule,
        MovableDemoModule,
        TabsDemoModule,
        BoxDemoModule,
        TileSelectDemoModule,
        ListDemoModule,
        ListLiteDemoModule,
        RangeDateTimeDemoModule,
        DatePickerDemoModule,
        JigsawRootModule,
        CheckBoxDemoModule,
        JigsawFloatModule,
        JigsawListLiteModule,
        JigsawTreeExtModule,
        JigsawButtonBarModule,
        JigsawCheckBoxModule,
        JigsawNumericInputModule,
        JigsawSelectModule,
        CascadeAllModule,
        AlertDemoModule,
        HeaderDemoModule,
        AutoCompleteInputDemoModule,
        FishBoneDemoModule,
        AlphabeticalIndexDemoModule,
        RateDemoModule,
        ColorSelectDemoModule,
        CollapseDemoModule,
        BadgeDemoModule,
        RibbonDemoModule,
        DialogDemoModule,
        ComboSelectDemoModule,
        LoadingDemoModule,
        NavigationMenuDemoModule,
        NotificationDemoModule,
        ToastDemoModule,
        TooltipDemoModule,
        TagDemoModule,
        ProgressDemoModule,
        ProcessStatusDemoModule,
        SliderAllDemoModule,
        TrustedHtmlDemoModule,
        TransferDemoModule,
        TimeSectionDemoModule,
        ChartIconDemoModule,
        TimePickerDemoModule,
        SelectDemoModule,
        DragDropDemoModule,
        PopupDemoModule,
        DataEncapsulationDemoModule,
        GraphDemoModule,
        FloatDemoModule,
        DateTimePickerDemoModule,
        TableBasicDemoModule,
        TableActionsDemoModule,
        BreadcrumbDemoModule,
        ButtonDemoModule,
        ButtonBarDemoModule,
        RadioGroupDemoModule,
        SwitchDemoModule,
        TableColumnDefinesDemoModule,
        TableBigTableDemoModule,
        TableRendererDemoModule,
        JigsawSelectModule,
        JigsawButtonModule,
        PerfectScrollbarModule,
        QuickStartDemoModule,
        ApiListDemoModule,
        InternalDemoModule,
        JigsawSearchInputModule,
        CommonModule,
        NavigationBarDemoModule,
        TranslateDemoModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AjaxInterceptor,
            multi: true,
        },
        TranslateService,
        JigsawThemeService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private _themeService: JigsawThemeService) {
        let themeName: SupportedTheme, majorStyle: MajorStyle;
        const themeString = localStorage.getItem("jigsawDemoTheme");
        if (themeString === null) {
            themeName = "paletx-pro";
            majorStyle = "light";
        } else {
            const themeData = JSON.parse(themeString);
            themeName = themeData.name;
            majorStyle = themeData.majorStyle;
        }
        this._themeService.changeTheme(themeName, majorStyle);
    }
}
