import { AlertDemoComponent } from "./demo/alert/demo.component";
import { AutoCompleteInputDemoComponent } from "./demo/auto-complete-input/demo.component";
import { HeaderDemoComponent } from "./demo/header/demo.component";
import { BreadcrumbAllComponent } from "./demo/breadcrumb/demo.component";
import { BreadcrumbRouterList } from "./demo/breadcrumb/router/list/list";
import { BreadcrumbRouterDetail } from "./demo/breadcrumb/router/detail/detail";
import { BreadcrumbRouterBuy } from "./demo/breadcrumb/router/buy/buy";
import { MenuAllComponent } from "./demo/menu/demo.component";
import { BadgeAllComponent } from "./demo/badge/demo.component";
import { RibbonAllComponent } from "./demo/ribbon/demo.component";
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
import { IntroduceComponent } from "./ued/introduce/introduce";
import { QuickStartDemoComponent } from "./demo/quick-start/demo.component";
import { ApiListComponent } from "./demo/api-list/demo.component";
import {InternalDemoComponent} from "./demo/internal-demo/demo.component";
import { NavigationBarAllDemoComponent } from "./demo/navigation-bar/demo.component";
import { TranslateDemoComponent } from "./demo/translate/demo.component";

export const componentGroup = {
    start: '开始',
    general: '通用',
    entry: '数据输入',
    display: '数据呈现',
    navigation: '导航',
    message: '消息与反馈',
    container: '容器',
    layout: '布局',
    directive: '指令',
    service: '服务',
    other: '其他'
}

export const routerConfigPC = [
    { path: "", component: IntroduceComponent },
    {
        path: "breadcrumb", component: BreadcrumbAllComponent,
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
        group: componentGroup.navigation,
        label: 'Breadcrumb 面包屑'
    },
    { path: "alert", component: AlertDemoComponent, group: componentGroup.message, label: 'Alert 警示框' },
    { path: "combo-select", component: ComboSelectComponent, group: componentGroup.container },
    { path: "auto-complete-input", component: AutoCompleteInputDemoComponent, group: componentGroup.entry },
    { path: "badge", component: BadgeAllComponent, group: componentGroup.directive },
    { path: "ribbon", component: RibbonAllComponent, group: componentGroup.directive },
    { path: "button-bar", component: ButtonBarAllComponent, group: componentGroup.general },
    { path: "button", component: ButtonAllComponent, group: componentGroup.general },
    { path: "cascade", component: CascadeAllComponent, group: componentGroup.container },
    { path: "fish-bone", component: FishBoneAllComponent, group: componentGroup.display },
    { path: "header", component: HeaderDemoComponent, group: componentGroup.navigation },
    { path: "checkbox", component: CheckBoxDemoComponent, group: componentGroup.general },
    { path: "drawer", component: DrawerAllComponent, group: componentGroup.container },
    { path: "icon", component: IconAllComponent, group: componentGroup.general },
    { path: "input", component: InputAllComponent, group: componentGroup.entry },
    { path: "menu", component: MenuAllComponent, group: componentGroup.directive },
    { path: "pagination", component: PaginationAllComponent, group: componentGroup.navigation },
    { path: "numeric-input", component: NumericInputAllComponent, group: componentGroup.entry },
    { path: "search-input", component: SearchInputAllComponent, group: componentGroup.entry },
    { path: "steps", component: StepsAllComponent, group: componentGroup.navigation },
    { path: "textarea", component: TextareaAllComponent, group: componentGroup.entry },
    { path: "tree", component: ZtreeAllComponent, group: componentGroup.display },
    { path: "upload", component: UploadAllComponent, group: componentGroup.directive },
    { path: "adjust-font-color", component: AdjustFontColorAllDemoComponent, group: componentGroup.service },
    { path: "theme-properties", component: ThemePropertiesAllComponent, group: componentGroup.service },
    { path: "movable", component: MovableAllComponent, group: componentGroup.directive },
    { path: "tab", component: TabAllComponent, group: componentGroup.container },
    { path: "box", component: BoxAllComponent, group: componentGroup.layout },
    { path: "tile", component: TileAllComponent, group: componentGroup.general },
    { path: "list", component: ListAllComponent, group: componentGroup.general },
    { path: "list-lite", component: ListLiteAllComponent, group: componentGroup.general },
    { path: "range-date-time-picker", component: RangeDataTimePickerAllComponent, group: componentGroup.general },
    { path: "date-picker", component: DatePickerAllComponent, group: componentGroup.general },
    { path: "date-time-picker", component: DateTimePickerAllComponent, group: componentGroup.general },
    { path: "table-basic", component: TableBasicAllComponent, group: componentGroup.display },
    { path: "radio", component: RadioGroupDemoComponent, group: componentGroup.general },
    { path: "switch", component: SwitchDemoComponent, group: componentGroup.general },
    { path: "alphabetical-index", component: AlphabeticalIndexDemoComponent, group: componentGroup.general },
    { path: "rate", component: RateDemoComponent, group: componentGroup.general },
    { path: "color-select", component: ColorSelectDemoComponent, group: componentGroup.general },
    { path: "collapse", component: CollapseDemoComponent, group: componentGroup.container },
    { path: "dialog", component: DialogDemoComponent, group: componentGroup.message },
    { path: "loading", component: LoadingDemoComponent, group: componentGroup.service },
    { path: "navigation-menu", component: NavigationMenuAllDemoComponent, group: componentGroup.navigation },
    { path: "navigation-bar", component: NavigationBarAllDemoComponent, group: componentGroup.navigation },
    { path: "notification", component: NotificationDemoComponent, group: componentGroup.message },
    { path: "toast", component: ToastDemoComponent, group: componentGroup.message },
    { path: "tooltip", component: TooltipDemoComponent, group: componentGroup.directive },
    { path: "tag", component: TagDemoComponent, group: componentGroup.general },
    { path: "progress", component: ProgressDemoComponent, group: componentGroup.display },
    { path: "process-status", component: ProcessStatusDemoComponent, group: componentGroup.general },
    { path: "slider", component: SliderDemoComponent, group: componentGroup.general },
    { path: "trusted-html", component: TrustedHtmlDemoComponent, group: componentGroup.directive },
    { path: "transfer", component: TransferDemoComponent, group: componentGroup.general },
    { path: "time-section", component: TimeSectionDemoComponent, group: componentGroup.general },
    { path: "chart-icon", component: ChartIconDemoComponent, group: componentGroup.display },
    { path: "time-picker", component: TimePickerDemoComponent, group: componentGroup.general },
    { path: "select", component: SelectDemoComponent, group: componentGroup.entry },
    { path: "drag-drop", component: DragDropDemoComponent, group: componentGroup.directive },
    { path: "popup", component: PopupDemoComponent, group: componentGroup.service },
    { path: "data-encapsulation", component: DataEncapsulationDemoComponent, group: componentGroup.service },
    { path: "graph", component: GraphDemoComponent, group: componentGroup.display },
    { path: "float", component: FloatDemoComponent, group: componentGroup.directive },
    { path: "table-actions", component: TableActionsAllComponent, group: componentGroup.display },
    { path: "table-column-defines", component: TableColumnDefinesAllComponent, group: componentGroup.display },
    { path: "table-big-data", component: TableBigDataAllComponent, group: componentGroup.display },
    { path: "table-renderer", component: TableRendererAllComponent, group: componentGroup.display },
    { path: "quick-start", component: QuickStartDemoComponent, group: componentGroup.start },
    { path: "api-list", component: ApiListComponent, group: componentGroup.other },
    { path: "internal-demo", component: InternalDemoComponent, group: componentGroup.other },
    { path: "translate", component: TranslateDemoComponent, group: componentGroup.service },
];
export const routerConfig = routerConfigPC;

