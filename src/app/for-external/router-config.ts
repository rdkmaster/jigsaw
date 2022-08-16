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
import {TableRendererAllComponent} from "./demo/table-renderer/demo.component";

export const routerConfigPC = [
    { path: "demo/example", component: ExampleDemoComponent },
    { path: "demo/alert", component: AlertDemoComponent },
    {
        path: "demo/breadcrumb", component: BreadcrumbAllComponent,
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
    { path: "demo/combo-select", component: ComboSelectComponent },
    { path: "demo/auto-complete-input", component: AutoCompleteInputDemoComponent },
    { path: "demo/badge", component: BadgeAllComponent },
    { path: "demo/button-bar", component: ButtonBarAllComponent },
    { path: "demo/button", component: ButtonAllComponent },
    { path: "demo/cascade", component: CascadeAllComponent },
    { path: "demo/fish-bone", component: FishBoneAllComponent },
    { path: "demo/header", component: HeaderDemoComponent },
    { path: "demo/checkbox", component: CheckBoxDemoComponent },
    { path: "demo/drawer", component: DrawerAllComponent },
    { path: "demo/icon", component: IconAllComponent },
    { path: "demo/input", component: InputAllComponent },
    { path: "demo/menu", component: MenuAllComponent },
    { path: "demo/pagination", component: PaginationAllComponent },
    { path: "demo/numeric-input", component: NumericInputAllComponent },
    { path: "demo/search-input", component: SearchInputAllComponent },
    { path: "demo/steps", component: StepsAllComponent },
    { path: "demo/textarea", component: TextareaAllComponent },
    { path: "demo/tree", component: ZtreeAllComponent },
    { path: "demo/upload", component: UploadAllComponent },
    { path: "demo/adjust-font-color", component: AdjustFontColorAllDemoComponent },
    { path: "demo/theme-properties", component: ThemePropertiesAllComponent },
    { path: "demo/movable", component: MovableAllComponent },
    { path: "demo/tab", component: TabAllComponent },
    { path: "demo/box", component: BoxAllComponent },
    { path: "demo/tile", component: TileAllComponent },
    { path: "demo/list", component: ListAllComponent },
    { path: "demo/list-lite", component: ListLiteAllComponent },
    { path: "demo/range-date-time-picker", component: RangeDataTimePickerAllComponent },
    { path: "demo/date-picker", component: DatePickerAllComponent },
    { path: "demo/data-time-picker", component: DateTimePickerAllComponent },
    { path: "demo/table-basic", component: TableBasicAllComponent },
    { path: "demo/radio", component: RadioGroupDemoComponent },
    { path: "demo/switch", component: SwitchDemoComponent },
    { path: "demo/alphabetical-index", component: AlphabeticalIndexDemoComponent },
    { path: "demo/rate", component: RateDemoComponent },
    { path: "demo/color-select", component: ColorSelectDemoComponent },
    { path: "demo/collapse", component: CollapseDemoComponent },
    { path: "demo/dialog", component: DialogDemoComponent },
    { path: "demo/icons", component: IconsDemoComponent },
    { path: "demo/loading", component: LoadingDemoComponent },
    { path: "demo/navigation-menu", component: NavigationMenuAllDemoComponent },
    { path: "demo/notification", component: NotificationDemoComponent },
    { path: "demo/toast", component: ToastDemoComponent },
    { path: "demo/tooltip", component: TooltipDemoComponent },
    { path: "demo/tag", component: TagDemoComponent },
    { path: "demo/progress", component: ProgressDemoComponent },
    { path: "demo/process-status", component: ProcessStatusDemoComponent },
    { path: "demo/slider", component: SliderDemoComponent },
    { path: "demo/trusted-html", component: TrustedHtmlDemoComponent },
    { path: "demo/transfer", component: TransferDemoComponent },
    { path: "demo/time-section", component: TimeSectionDemoComponent },
    { path: "demo/chart-icon", component: ChartIconDemoComponent },
    { path: "demo/time-picker", component: TimePickerDemoComponent },
    { path: "demo/select", component: SelectDemoComponent },
    { path: "demo/drag-drop", component: DragDropDemoComponent },
    { path: "demo/popup", component: PopupDemoComponent },
    { path: "demo/data-encapsulation", component: DataEncapsulationDemoComponent },
    { path: "demo/graph", component: GraphDemoComponent },
    { path: "demo/float", component: FloatDemoComponent },
    { path: "demo/table-actions", component: TableActionsAllComponent},
    { path: "demo/table-column-defines", component: TableColumnDefinesAllComponent},
    { path: "demo/table-big-data", component: TableBigDataAllComponent},
    { path: "demo/table-renderer", component: TableRendererAllComponent}

];
export const routerConfigMobile = [];
export const routerConfig = [...routerConfigPC, ...routerConfigMobile];

