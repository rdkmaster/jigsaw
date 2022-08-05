import {ExampleDemoComponent} from './demo/pc/example/demo.component';
import {AlertDemoComponent} from "./demo/pc/alert/demo.component";
import {AutoCompleteInputDemoComponent} from "./demo/pc/auto-complete-input/demo.component";
import {HeaderDemoComponent} from "./demo/pc/header/demo.component";
import {BreadcrumbAllComponent} from "./demo/pc/breadcrumb/demo.component";
import {BreadcrumbRouterList} from "./demo/pc/breadcrumb/router/list/list";
import {BreadcrumbRouterDetail} from "./demo/pc/breadcrumb/router/detail/detail";
import {BreadcrumbRouterBuy} from "./demo/pc/breadcrumb/router/buy/buy";
import {MenuAllComponent} from "./demo/pc/menu/demo.component";
import {BadgeAllComponent} from "./demo/pc/badge/demo.component";
import {ButtonAllComponent} from "./demo/pc/button/demo.component";
import {CheckBoxDemoComponent} from "./demo/pc/checkbox/demo.componet";
import {ButtonBarAllComponent} from "./demo/pc/button-bar/demo.component";
import {DrawerAllComponent} from "./demo/pc/drawer/demo.component";
import {RadioGroupDemoComponent} from "./demo/pc/radio/demo.component";
import {IconAllComponent} from "./demo/pc/icon/demo.component";
import {FishBoneAllComponent} from "./demo/pc/fish-bone/demo.component";
import {InputAllComponent} from "./demo/pc/input/demo.component";
import {CascadeAllComponent} from "./demo/pc/cascade/demo.component";
import {ComboSelectComponent} from "./demo/pc/combo-select/demo.component";
import {SwitchDemoComponent} from "./demo/pc/switch/demo.component";
import {SearchInputAllComponent} from "./demo/pc/search-input/demo.component";
import {NumericInputAllComponent} from "./demo/pc/numeric-input/demo.component";
import {TextareaAllComponent} from "./demo/pc/textarea/demo.component";
import {PaginationAllComponent} from "./demo/pc/pagination/demo.component";
import {StepsAllComponent} from "./demo/pc/steps/demo.component";
import {AlphabeticalIndexDemoComponent} from "./demo/pc/alphabetical-index/demo.component";
import {RateDemoComponent} from "./demo/pc/rate/demo.component";
import {ColorSelectDemoComponent} from "./demo/pc/color-select/demo.component";
import {ZtreeAllComponent} from "./demo/pc/tree/demo.component";
import {UploadAllComponent} from "./demo/pc/upload/demo.component";
import {CollapseDemoComponent} from "./demo/pc/collapse/demo.component";
import {DialogDemoComponent} from "./demo/pc/dialog/demo.component";
import {MovableAllComponent} from "./demo/pc/movable/demo.component";
import {IconsDemoComponent} from "./demo/pc/icons/demo.component";
import {LoadingDemoComponent} from "./demo/pc/loading/demo.component";
import {ThemePropertiesAllComponent} from "./demo/pc/theme-properties/demo.component";
import {AdjustFontColorAllDemoComponent} from "./demo/pc/adjust-font-color/demo.component";
import {NavigationMenuAllDemoComponent} from "./demo/pc/navigation-menu/demo.component";
import {NotificationDemoComponent} from "./demo/pc/notification/demo.component";
import {ToastDemoComponent} from "./demo/pc/toast/demo.component";
import {TabAllComponent} from "./demo/pc/tab/demo.component";
import {BoxAllComponent} from "./demo/pc/box/demo.component";
import {TooltipDemoComponent} from "./demo/pc/tooltip/demo.component";
import {TagDemoComponent} from "./demo/pc/tag/demo.component";
import {ListAllComponent} from "./demo/pc/list/demo.component";
import {ListLiteAllComponent} from "./demo/pc/list-lite/demo.component";
import {TileAllComponent} from "./demo/pc/tile/demo.component";
import {ProgressDemoComponent} from "./demo/pc/progress/demo.component";
import {ProcessStatusDemoComponent} from "./demo/pc/process-status/demo.component";
import {SliderDemoComponent} from "./demo/pc/slider/demo.component";
import {TrustedHtmlDemoComponent} from "./demo/pc/trusted-html/demo.component";
import {TransferDemoComponent} from "./demo/pc/transfer/demo.component";
import {TimeSectionDemoComponent} from "./demo/pc/time-section/demo.component";
import {ChartIconDemoComponent} from "./demo/pc/chart-icon/demo.component";
import {TimePickerDemoComponent} from "./demo/pc/time-picker/demo.component";
import {SelectDemoComponent} from "./demo/pc/select/demo.component";
import {DragDropDemoComponent} from "./demo/pc/drag-drop/demo.component";
import {PopupDemoComponent} from "./demo/pc/popup/demo.component";
import {DataEncapsulationDemoComponent} from "./demo/pc/data-encapsulation/demo.component";
import {GraphDemoComponent} from "./demo/pc/graph/demo.component";

export const routerConfigPC = [
    {path: "pc/example", component: ExampleDemoComponent},
    {path: "pc/alert", component: AlertDemoComponent},
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
    { path: "pc/combo-select", component: ComboSelectComponent},
    { path: "pc/auto-complete-input", component: AutoCompleteInputDemoComponent},
    { path: "pc/badge", component: BadgeAllComponent},
    { path: "pc/button-bar", component: ButtonBarAllComponent },
    { path: "pc/button", component: ButtonAllComponent },
    { path: "pc/cascade", component: CascadeAllComponent},
    { path: "pc/fish-bone", component: FishBoneAllComponent},
    { path: "pc/header", component: HeaderDemoComponent },
    { path: "pc/checkbox", component: CheckBoxDemoComponent },
    { path: "pc/drawer", component: DrawerAllComponent},
    { path: "pc/icon", component: IconAllComponent},
    { path: "pc/input", component: InputAllComponent},
    { path: "pc/menu", component: MenuAllComponent},
    { path: "pc/pagination", component: PaginationAllComponent},
    { path: "pc/numeric-input", component: NumericInputAllComponent},
    { path: "pc/search-input", component: SearchInputAllComponent},
    { path: "pc/steps", component: StepsAllComponent},
    { path: "pc/textarea", component: TextareaAllComponent},
    { path: "pc/tree", component: ZtreeAllComponent},
    { path: "pc/upload", component: UploadAllComponent},
    { path: "pc/adjust-font-color", component: AdjustFontColorAllDemoComponent},
    { path: "pc/theme-properties", component: ThemePropertiesAllComponent},
    { path: "pc/movable", component: MovableAllComponent},
    { path: "pc/tab", component: TabAllComponent},
    { path: "pc/box", component: BoxAllComponent},
    { path: "pc/tile", component: TileAllComponent},
    { path: "pc/list", component: ListAllComponent},
    { path: "pc/list-lite", component: ListLiteAllComponent},
    {path: "pc/radio-group", component: RadioGroupDemoComponent},
    {path: "pc/switch", component: SwitchDemoComponent},
    {path: "pc/alphabetical-index", component: AlphabeticalIndexDemoComponent},
    {path: "pc/rate", component: RateDemoComponent},
    {path: "pc/color-select", component: ColorSelectDemoComponent},
    {path: "pc/collapse", component: CollapseDemoComponent},
    {path: "pc/dialog", component: DialogDemoComponent},
    {path: "pc/icons", component: IconsDemoComponent},
    {path: "pc/loading", component: LoadingDemoComponent},
    {path: "pc/navigation-menu", component: NavigationMenuAllDemoComponent},
    {path: "pc/notification", component: NotificationDemoComponent},
    {path: "pc/toast", component: ToastDemoComponent},
    {path: "pc/tooltip", component: TooltipDemoComponent},
    {path: "pc/tag", component: TagDemoComponent},
    {path: "pc/progress", component: ProgressDemoComponent},
    {path: "pc/process-status" , component: ProcessStatusDemoComponent },
    {path: "pc/slider", component: SliderDemoComponent},
    {path: "pc/trusted-html", component: TrustedHtmlDemoComponent},
    {path: "pc/transfer", component: TransferDemoComponent},
    {path: "pc/time-section", component: TimeSectionDemoComponent},
    {path: "pc/chart-icon", component: ChartIconDemoComponent},
    {path: "pc/time-picker", component: TimePickerDemoComponent},
    {path: "pc/select", component: SelectDemoComponent},
    {path: "pc/drag-drop", component: DragDropDemoComponent},
    {path: "pc/popup", component: PopupDemoComponent},
    {path: "pc/data-encapsulation", component: DataEncapsulationDemoComponent},
    {path: "pc/graph", component: GraphDemoComponent},

];
export const routerConfigMobile = [];
export const routerConfig = [...routerConfigPC, ...routerConfigMobile];
