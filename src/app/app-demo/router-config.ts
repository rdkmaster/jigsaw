import { ExampleDemoComponent } from './demo/example/demo.component';
import { AlertDemoComponent } from "./demo/alert/demo.component";
import { AutoCompleteInputDemoComponent } from "./demo/auto-complete-input/demo.component";
import { HeaderDemoComponent } from "./demo/header/demo.component";
import { BreadcrumbAllComponent } from "./demo/breadcrumb/demo.component";
import { BreadcrumbRouterList } from "./demo/breadcrumb/router/list/list";
import { BreadcrumbRouterDetail } from "./demo/breadcrumb/router/detail/detail";
import { BreadcrumbRouterBuy } from "./demo/breadcrumb/router/buy/buy";
import { MenuAllComponent } from "./demo/menu/demo.component";
import { BadgeAllComponent } from "./demo/badge/demo.component";
import { ButtonAllComponent } from "./demo/button/demo.component";
import { CheckBoxDemoComponent } from "./demo/checkbox/demo.componet";
import { ButtonBarAllComponent } from "./demo/button-bar/demo.component";
import { DrawerAllComponent } from "./demo/drawer/demo.component";
import { RadioGroupDemoComponent } from "./demo/radio/demo.component";
import { IconAllComponent } from "./demo/icon/demo.component";
import { FishBoneAllComponent } from "./demo/fish-bone/demo.component";
import { InputAllComponent } from "./demo/input/demo.component";
import { CascadeAllComponent } from "./demo/cascade/demo.component";
import { ComboSelectComponent } from "./demo/combo-select/demo.component";
import { SwitchDemoComponent } from "./demo/switch/demo.component";
import { SearchInputAllComponent } from "./demo/search-input/demo.component";
import { NumericInputAllComponent } from "./demo/numeric-input/demo.component";
import { TextareaAllComponent } from "./demo/textarea/demo.component";
import { PaginationAllComponent } from "./demo/pagination/demo.component";
import { StepsAllComponent } from "./demo/steps/demo.component";
import { AlphabeticalIndexDemoComponent } from "./demo/alphabetical-index/demo.component";
import { RateDemoComponent } from "./demo/rate/demo.component";
import { ColorSelectDemoComponent } from "./demo/color-select/demo.component";
import { ZtreeAllComponent } from "./demo/tree/demo.component";
import { UploadAllComponent } from "./demo/upload/demo.component";
import { CollapseDemoComponent } from "./demo/collapse/demo.component";
import { DialogDemoComponent } from "./demo/dialog/demo.component";
import { MovableAllComponent } from "./demo/movable/demo.component";
import { IconsDemoComponent } from "./demo/icons/demo.component";
import { LoadingDemoComponent } from "./demo/loading/demo.component";
import { ThemePropertiesAllComponent } from "./demo/theme-properties/demo.component";
import { AdjustFontColorAllDemoComponent } from "./demo/adjust-font-color/demo.component";
import { NavigationMenuAllDemoComponent } from "./demo/navigation-menu/demo.component";
import { NotificationDemoComponent } from "./demo/notification/demo.component";
import { ToastDemoComponent } from "./demo/toast/demo.component";
import { TabAllComponent } from "./demo/tab/demo.component";
import { BoxAllComponent } from "./demo/box/demo.component";
import { TooltipDemoComponent } from "./demo/tooltip/demo.component";
import { TagDemoComponent } from "./demo/tag/demo.component";
import { ListAllComponent } from "./demo/list/demo.component";
import { ListLiteAllComponent } from "./demo/list-lite/demo.component";
import { TileAllComponent } from "./demo/tile/demo.component";
import { ProgressDemoComponent } from "./demo/progress/demo.component";
import { ProcessStatusDemoComponent } from "./demo/process-status/demo.component";
import { SliderDemoComponent } from "./demo/slider/demo.component";
import { TrustedHtmlDemoComponent } from "./demo/trusted-html/demo.component";
import { TransferDemoComponent } from "./demo/transfer/demo.component";
import { TimeSectionDemoComponent } from "./demo/time-section/demo.component";
import { ChartIconDemoComponent } from "./demo/chart-icon/demo.component";
import { TimePickerDemoComponent } from "./demo/time-picker/demo.component";
import { SelectDemoComponent } from "./demo/select/demo.component";
import { DragDropDemoComponent } from "./demo/drag-drop/demo.component";
import { PopupDemoComponent } from "./demo/popup/demo.component";
import { DataEncapsulationDemoComponent } from "./demo/data-encapsulation/demo.component";
import { GraphDemoComponent } from "./demo/graph/demo.component";
import { FloatDemoComponent } from "./demo/float/demo.component";
import { RangeDataTimePickerAllComponent } from "./demo/range-date-time-picker/demo.component";
import { DatePickerAllComponent } from "./demo/date-picker/demo.component";
import { DateTimePickerAllComponent } from "./demo/date-time-picker/demo.component";
import { TableBasicAllComponent } from "./demo/table-basic/demo.component";
import {TableActionsAllComponent} from "./demo/table-actions/demo.component";
import {TableColumnDefinesAllComponent} from "./demo/table-column-defines/demo.component";
import {TableBigDataAllComponent} from "./demo/table-big-data/demo.component";

export const routerConfigPC = [
    { path: "pc/example", component: ExampleDemoComponent },
    { path: "pc/alert", component: AlertDemoComponent },
    {
        path: "pc/breadcrumb", component: BreadcrumbAllComponent,
        children: [
            {
                path: 'list/:typeId', component: BreadcrumbRouterList
            },
            {
                path: 'detail/:id', component: BreadcrumbRouterDetail
            },
            {
                path: 'buy/:id', component: BreadcrumbRouterBuy
            }
        ]
    },
    { path: "pc/combo-select", component: ComboSelectComponent },
    { path: "pc/auto-complete-input", component: AutoCompleteInputDemoComponent },
    { path: "pc/badge", component: BadgeAllComponent },
    { path: "pc/button-bar", component: ButtonBarAllComponent },
    { path: "pc/button", component: ButtonAllComponent },
    { path: "pc/cascade", component: CascadeAllComponent },
    { path: "pc/fish-bone", component: FishBoneAllComponent },
    { path: "pc/header", component: HeaderDemoComponent },
    { path: "pc/checkbox", component: CheckBoxDemoComponent },
    { path: "pc/drawer", component: DrawerAllComponent },
    { path: "pc/icon", component: IconAllComponent },
    { path: "pc/input", component: InputAllComponent },
    { path: "pc/menu", component: MenuAllComponent },
    { path: "pc/pagination", component: PaginationAllComponent },
    { path: "pc/numeric-input", component: NumericInputAllComponent },
    { path: "pc/search-input", component: SearchInputAllComponent },
    { path: "pc/steps", component: StepsAllComponent },
    { path: "pc/textarea", component: TextareaAllComponent },
    { path: "pc/tree", component: ZtreeAllComponent },
    { path: "pc/upload", component: UploadAllComponent },
    { path: "pc/adjust-font-color", component: AdjustFontColorAllDemoComponent },
    { path: "pc/theme-properties", component: ThemePropertiesAllComponent },
    { path: "pc/movable", component: MovableAllComponent },
    { path: "pc/tab", component: TabAllComponent },
    { path: "pc/box", component: BoxAllComponent },
    { path: "pc/tile", component: TileAllComponent },
    { path: "pc/list", component: ListAllComponent },
    { path: "pc/list-lite", component: ListLiteAllComponent },
    { path: "pc/range-date-time-picker", component: RangeDataTimePickerAllComponent },
    { path: "pc/date-picker", component: DatePickerAllComponent },
    { path: "pc/data-time-picker", component: DateTimePickerAllComponent },
    { path: "pc/table-basic", component: TableBasicAllComponent },
    { path: "pc/radio-group", component: RadioGroupDemoComponent },
    { path: "pc/switch", component: SwitchDemoComponent },
    { path: "pc/alphabetical-index", component: AlphabeticalIndexDemoComponent },
    { path: "pc/rate", component: RateDemoComponent },
    { path: "pc/color-select", component: ColorSelectDemoComponent },
    { path: "pc/collapse", component: CollapseDemoComponent },
    { path: "pc/dialog", component: DialogDemoComponent },
    { path: "pc/icons", component: IconsDemoComponent },
    { path: "pc/loading", component: LoadingDemoComponent },
    { path: "pc/navigation-menu", component: NavigationMenuAllDemoComponent },
    { path: "pc/notification", component: NotificationDemoComponent },
    { path: "pc/toast", component: ToastDemoComponent },
    { path: "pc/tooltip", component: TooltipDemoComponent },
    { path: "pc/tag", component: TagDemoComponent },
    { path: "pc/progress", component: ProgressDemoComponent },
    { path: "pc/process-status", component: ProcessStatusDemoComponent },
    { path: "pc/slider", component: SliderDemoComponent },
    { path: "pc/trusted-html", component: TrustedHtmlDemoComponent },
    { path: "pc/transfer", component: TransferDemoComponent },
    { path: "pc/time-section", component: TimeSectionDemoComponent },
    { path: "pc/chart-icon", component: ChartIconDemoComponent },
    { path: "pc/time-picker", component: TimePickerDemoComponent },
    { path: "pc/select", component: SelectDemoComponent },
    { path: "pc/drag-drop", component: DragDropDemoComponent },
    { path: "pc/popup", component: PopupDemoComponent },
    { path: "pc/data-encapsulation", component: DataEncapsulationDemoComponent },
    { path: "pc/graph", component: GraphDemoComponent },
    { path: "pc/float", component: FloatDemoComponent },
    { path: "pc/table-actions", component: TableActionsAllComponent},
    { path: "pc/table-column-defines", component: TableColumnDefinesAllComponent},
    { path: "pc/table-big-data", component: TableBigDataAllComponent}

];
export const routerConfigMobile = [];
export const routerConfig = [...routerConfigPC, ...routerConfigMobile];
