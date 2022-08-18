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
import { TableActionsAllComponent } from "./demo/table-actions/demo.component";
import { TableColumnDefinesAllComponent } from "./demo/table-column-defines/demo.component";
import { TableBigDataAllComponent } from "./demo/table-big-data/demo.component";
import { TableRendererAllComponent } from "./demo/table-renderer/demo.component";

export const componentGroup = {
    general: '通用',
    entry: '数据输入',
    display: '数据呈现',
    navigation: '导航',
    message: '消息与反馈',
    container: '容器',
    layout: '布局',
    schema: '模式',
    other: '其他'
}

export const routerConfigPC = [
    { path: "demo/alert", component: AlertDemoComponent, group: componentGroup.message },
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
        ],
        group: componentGroup.navigation
    },
    { path: "demo/combo-select", component: ComboSelectComponent, group: componentGroup.schema },
    { path: "demo/auto-complete-input", component: AutoCompleteInputDemoComponent, group: componentGroup.entry },
    { path: "demo/badge", component: BadgeAllComponent, group: componentGroup.message },
    { path: "demo/button-bar", component: ButtonBarAllComponent, group: componentGroup.general },
    { path: "demo/button", component: ButtonAllComponent, group: componentGroup.general },
    { path: "demo/cascade", component: CascadeAllComponent, group: componentGroup.container },
    { path: "demo/fish-bone", component: FishBoneAllComponent, group: componentGroup.display },
    { path: "demo/header", component: HeaderDemoComponent, group: componentGroup.navigation },
    { path: "demo/checkbox", component: CheckBoxDemoComponent, group: componentGroup.general },
    { path: "demo/drawer", component: DrawerAllComponent, group: componentGroup.container },
    { path: "demo/icon", component: IconAllComponent, group: componentGroup.general },
    { path: "demo/input", component: InputAllComponent, group: componentGroup.entry },
    { path: "demo/menu", component: MenuAllComponent, group: componentGroup.navigation },
    { path: "demo/pagination", component: PaginationAllComponent, group: componentGroup.navigation },
    { path: "demo/numeric-input", component: NumericInputAllComponent, group: componentGroup.entry },
    { path: "demo/search-input", component: SearchInputAllComponent, group: componentGroup.entry },
    { path: "demo/steps", component: StepsAllComponent, group: componentGroup.navigation },
    { path: "demo/textarea", component: TextareaAllComponent, group: componentGroup.entry },
    { path: "demo/tree", component: ZtreeAllComponent, group: componentGroup.display },
    { path: "demo/upload", component: UploadAllComponent, group: componentGroup.general },
    { path: "demo/adjust-font-color", component: AdjustFontColorAllDemoComponent, group: componentGroup.schema },
    { path: "demo/theme-properties", component: ThemePropertiesAllComponent, group: componentGroup.schema },
    { path: "demo/movable", component: MovableAllComponent, group: componentGroup.schema },
    { path: "demo/tab", component: TabAllComponent, group: componentGroup.container },
    { path: "demo/box", component: BoxAllComponent, group: componentGroup.layout },
    { path: "demo/tile", component: TileAllComponent, group: componentGroup.general },
    { path: "demo/list", component: ListAllComponent, group: componentGroup.general },
    { path: "demo/list-lite", component: ListLiteAllComponent, group: componentGroup.general },
    { path: "demo/range-date-time-picker", component: RangeDataTimePickerAllComponent, group: componentGroup.general },
    { path: "demo/date-picker", component: DatePickerAllComponent, group: componentGroup.general },
    { path: "demo/date-time-picker", component: DateTimePickerAllComponent, group: componentGroup.general },
    { path: "demo/table-basic", component: TableBasicAllComponent, group: componentGroup.display },
    { path: "demo/radio", component: RadioGroupDemoComponent, group: componentGroup.general },
    { path: "demo/switch", component: SwitchDemoComponent, group: componentGroup.general },
    { path: "demo/alphabetical-index", component: AlphabeticalIndexDemoComponent, group: componentGroup.general },
    { path: "demo/rate", component: RateDemoComponent, group: componentGroup.general },
    { path: "demo/color-select", component: ColorSelectDemoComponent, group: componentGroup.general },
    { path: "demo/collapse", component: CollapseDemoComponent, group: componentGroup.container },
    { path: "demo/dialog", component: DialogDemoComponent, group: componentGroup.message },
    { path: "demo/icons", component: IconsDemoComponent, group: componentGroup.schema },
    { path: "demo/loading", component: LoadingDemoComponent, group: componentGroup.other },
    { path: "demo/navigation-menu", component: NavigationMenuAllDemoComponent, group: componentGroup.navigation },
    { path: "demo/notification", component: NotificationDemoComponent, group: componentGroup.message },
    { path: "demo/toast", component: ToastDemoComponent, group: componentGroup.message },
    { path: "demo/tooltip", component: TooltipDemoComponent, group: componentGroup.message },
    { path: "demo/tag", component: TagDemoComponent, group: componentGroup.general },
    { path: "demo/progress", component: ProgressDemoComponent, group: componentGroup.other },
    { path: "demo/process-status", component: ProcessStatusDemoComponent, group: componentGroup.other },
    { path: "demo/slider", component: SliderDemoComponent, group: componentGroup.general },
    { path: "demo/trusted-html", component: TrustedHtmlDemoComponent, group: componentGroup.schema },
    { path: "demo/transfer", component: TransferDemoComponent, group: componentGroup.general },
    { path: "demo/time-section", component: TimeSectionDemoComponent, group: componentGroup.general },
    { path: "demo/chart-icon", component: ChartIconDemoComponent, group: componentGroup.display },
    { path: "demo/time-picker", component: TimePickerDemoComponent, group: componentGroup.general },
    { path: "demo/select", component: SelectDemoComponent, group: componentGroup.entry },
    { path: "demo/drag-drop", component: DragDropDemoComponent, group: componentGroup.other },
    { path: "demo/popup", component: PopupDemoComponent, group: componentGroup.schema },
    { path: "demo/data-encapsulation", component: DataEncapsulationDemoComponent, group: componentGroup.schema },
    { path: "demo/graph", component: GraphDemoComponent, group: componentGroup.display },
    { path: "demo/float", component: FloatDemoComponent, group: componentGroup.schema },
    { path: "demo/table-actions", component: TableActionsAllComponent, group: componentGroup.display },
    { path: "demo/table-column-defines", component: TableColumnDefinesAllComponent, group: componentGroup.display },
    { path: "demo/table-big-data", component: TableBigDataAllComponent, group: componentGroup.display },
    { path: "demo/table-renderer", component: TableRendererAllComponent, group: componentGroup.display }
];
export const routerConfigMobile = [];
export const routerConfig = [...routerConfigPC, ...routerConfigMobile];

