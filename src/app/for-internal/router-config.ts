export const routerConfigPC = [
    {
        path: "pc/alert",
        loadChildren: () => import('./demo/pc/alert/demo-set.module').then(m => m.AlertDemoModule),
    },
    {
        path: "pc/auto-complete-input",
        loadChildren: () => import('./demo/pc/auto-complete-input/demo-set.module').then(m => m.AutoCompleteInputDemoModule),
    },
    {
        path: "pc/data-encapsulation",
        loadChildren: () => import('./demo/pc/data-encapsulation/demo-set.module').then(m => m.DataEncapsulationDemoModule),
    },
    {
        path: "pc/box",
        loadChildren: () => import('./demo/pc/box/demo-set.module').then(m => m.BoxDemoModule),
    },
    {
        path: "pc/button",
        loadChildren: () => import('./demo/pc/button/demo-set.module').then(m => m.ButtonDemoModule),
    },
    {
        path: "pc/button-bar",
        loadChildren: () => import('./demo/pc/button-bar/demo-set.module').then(m => m.ButtonBarDemoModule),
    },
    {
        path: "pc/cascade",
        loadChildren: () => import('./demo/pc/cascade/demo-set.module').then(m => m.CascadeDemoModule),
    },
    {
        path: "pc/checkbox",
        loadChildren: () => import('./demo/pc/checkbox/demo-set.module').then(m => m.CheckBoxDemoModule),
    },
    {
        path: "pc/collapse",
        loadChildren: () => import('./demo/pc/collapse/demo-set.module').then(m => m.CollapseDemoModule),
    },
    {
        path: "pc/combo-select",
        loadChildren: () => import('./demo/pc/combo-select/demo-set.module').then(m => m.ComboSelectDemoModule),
    },
    {
        path: "pc/dialog",
        loadChildren: () => import('./demo/pc/dialog/demo-set.module').then(m => m.DialogDemoModule),
    },
    {
        path: "pc/drag-drop",
        loadChildren: () => import('./demo/pc/drag-drop/demo-set.module').then(m => m.DragDropDemoModule),
    },
    {
        path: "pc/drawer",
        loadChildren: () => import('./demo/pc/drawer/demo-set.module').then(m => m.DrawerDemoModule),
    },
    {
        path: "pc/fish-bone",
        loadChildren: () => import('./demo/pc/fish-bone/demo-set.module').then(m => m.FishBoneDemoModule),
    },
    {
        path: "pc/float",
        loadChildren: () => import('./demo/pc/float/demo-set.module').then(m => m.FloatDemoModule),
    },
    {
        path: "pc/form",
        loadChildren: () => import('./demo/pc/form/demo-set.module').then(m => m.FormDemoModule),
    },
    {
        path: "pc/graph",
        loadChildren: () => import('./demo/pc/graph/demo-set.module').then(m => m.GraphDemoModule),
    },
    {
        path: "pc/modeled-graph",
        loadChildren: () => import('./demo/pc/modeled-graph/demo-set.module').then(m => m.ModeledGraphDemoModule),
    },
    {
        path: "pc/i18n",
        loadChildren: () => import('./demo/pc/i18n/demo-set.module').then(m => m.I18nDemoModule),
    },
    {
        path: "pc/input",
        loadChildren: () => import('./demo/pc/input/demo-set.module').then(m => m.InputDemoModule),
    },
    {
        path: "pc/numeric-input",
        loadChildren: () => import('./demo/pc/numeric-input/demo-set.module').then(m => m.NumericInputDemoModule),
    },
    {
        path: "pc/search-input",
        loadChildren: () => import('./demo/pc/search-input/demo-set.module').then(m => m.SearchInputDemoModule),
    },
    {
        path: "pc/list",
        loadChildren: () => import('./demo/pc/list/demo-set.module').then(m => m.ListDemoModule),
    },
    {
        path: "pc/list-lite",
        loadChildren: () => import('./demo/pc/list-lite/demo-set.module').then(m => m.ListLiteDemoModule),
    },
    {
        path: "pc/loading",
        loadChildren: () => import('./demo/pc/loading/demo-set.module').then(m => m.LoadingDemoModule),
    },
    {
        path: "pc/misc",
        loadChildren: () => import('./demo/pc/misc/demo-set.module').then(m => m.MiscDemoModule),
    },
    {
        path: "pc/movable",
        loadChildren: () => import('./demo/pc/movable/demo-set.module').then(m => m.MovableDemoModule),
    },
    {
        path: "pc/notification",
        loadChildren: () => import('./demo/pc/notification/demo-set.module').then(m => m.NotificationDemoModule),
    },
    {
        path: "pc/pagination",
        loadChildren: () => import('./demo/pc/pagination/demo-set.module').then(m => m.PaginationDemoModule),
    },
    {
        path: "pc/popup",
        loadChildren: () => import('./demo/pc/popup/demo-set.module').then(m => m.PopupServiceModule),
    },
    {
        path: "pc/radio-group",
        loadChildren: () => import('./demo/pc/radio-group/demo-set.module').then(m => m.RadioDemoModule),
    },
    {
        path: "pc/radio-lite",
        loadChildren: () => import('./demo/pc/radio-lite/demo-set.module').then(m => m.RadioLiteDemoModule),
    },
    {
        path: "pc/rate",
        loadChildren: () => import('./demo/pc/rate/demo-set.module').then(m => m.RateDemoModule),
    },
    {
        path: "pc/scrollbar",
        loadChildren: () => import('./demo/pc/scrollbar/demo-set.module').then(m => m.ScrollbarDemoModule),
    },
    {
        path: "pc/select",
        loadChildren: () => import('./demo/pc/select/demo-set.module').then(m => m.SelectDemoModule),
    },
    {
        path: "pc/select-group",
        loadChildren: () => import('./demo/pc/select-group/demo-set.module').then(m => m.SelectGroupDemoSetModule),
    },
    {
        path: "pc/select-collapse",
        loadChildren: () => import('./demo/pc/select-collapse/demo-set.module').then(m => m.SelectCollapseDemoSetModule),
    },
    {
        path: "pc/slider",
        loadChildren: () => import('./demo/pc/slider/demo-set.module').then(m => m.SliderDemoModule),
    },
    {
        path: "pc/steps",
        loadChildren: () => import('./demo/pc/steps/demo-set.module').then(m => m.StepsDemoModule),
    },
    {
        path: "pc/switch",
        loadChildren: () => import('./demo/pc/switch/demo-set.module').then(m => m.SwitchDemoModule),
    },
    {
        path: "pc/table",
        loadChildren: () => import('./demo/pc/table/demo-set.module').then(m => m.TableDemoModule),
    },
    {
        path: "pc/tab",
        loadChildren: () => import('./demo/pc/tab/demo-set.module').then(m => m.TabsDemoModule),
    },
    {
        path: "pc/tab-bar",
        loadChildren: () => import('./demo/pc/tab-bar/demo-set.module').then(m => m.TabBarDemoModule),
    },
    {
        path: "pc/tag",
        loadChildren: () => import('./demo/pc/tag/demo-set.module').then(m => m.TagDemoModule),
    },
    {
        path: "pc/textarea",
        loadChildren: () => import('./demo/pc/textarea/demo-set.module').then(m => m.TextareaDemoModule),
    },
    {
        path: "pc/tile",
        loadChildren: () => import('./demo/pc/tile/demo-set.module').then(m => m.TileSelectDemoModule),
    },
    {
        path: "pc/tile-lite",
        loadChildren: () => import('./demo/pc/tile-lite/demo-set.module').then(m => m.TileLiteDemoModule),
    },
    {
        path: "pc/tooltip",
        loadChildren: () => import('./demo/pc/tooltip/demo-set.module').then(m => m.TooltipDemoModule),
    },
    {
        path: "pc/tree",
        loadChildren: () => import('./demo/pc/tree/demo-set.module').then(m => m.ZtreeDemoModule),
    },
    {
        path: "pc/trusted-html",
        loadChildren: () => import('./demo/pc/trusted-html/demo-set.module').then(m => m.TrustedHtmlDemoModule),
    },
    {
        path: "pc/upload",
        loadChildren: () => import('./demo/pc/upload/demo-set.module').then(m => m.UploadDemoModule),
    },
    {
        path: "pc/icon",
        loadChildren: () => import('./demo/pc/icon/demo-set.module').then(m => m.IconDemoModule),
    },
    {
        path: "pc/transfer",
        loadChildren: () => import('./demo/pc/transfer/demo-set.module').then(m => m.TransferDemoModule),
    },
    {
        path: "pc/breadcrumb",
        loadChildren: () => import('./demo/pc/breadcrumb/demo-set.module').then(m => m.BreadcrumbDemoModule),
    },
    {
        path: "pc/menu",
        loadChildren: () => import('./demo/pc/menu/demo-set.module').then(m => m.MenuDemoModule),
    },
    {
        path: "pc/navigation-bar",
        loadChildren: () => import('./demo/pc/navigation-bar/demo-set.module').then(m => m.NavigationBarDemoModule),
    },
    {
        path: "pc/date-picker",
        loadChildren: () => import('./demo/pc/date-picker/demo-set.module').then(m => m.DatePickerDemoModule),
    },
    {
        path: "pc/time-picker",
        loadChildren: () => import('./demo/pc/time-picker/demo-set.module').then(m => m.TimePickerDemoModule),
    },
    {
        path: "pc/date-time-picker",
        loadChildren: () => import('./demo/pc/date-time-picker/demo-set.module').then(m => m.DateTimePickerDemoModule),
    },
    {
        path: "pc/range-date-time-picker",
        loadChildren: () => import('./demo/pc/range-date-time-picker/demo-set.module').then(m => m.RangeDateTimeDemoModule),
    },
    {
        path: "pc/progress",
        loadChildren: () => import('./demo/pc/progress/demo-set.module').then(m => m.ProgressDemoModule),
    },
    {
        path: "pc/color-select",
        loadChildren: () => import('./demo/pc/color-select/demo-set.module').then(m => m.ColorSelectDemoModule),
    },
    {
        path: "pc/badge",
        loadChildren: () => import('./demo/pc/badge/demo-set.module').then(m => m.BadgeDemoModule),
    },
    {
        path: "pc/time-section",
        loadChildren: () => import('./demo/pc/time-section/demo-set.module').then(m => m.TimeSectionDemoModule),
    },
    {
        path: "pc/alphabetical-index",
        loadChildren: () => import('./demo/pc/alphabetical-index/demo-set.module').then(m => m.IndexDemoModule),
    },
    {
        path: "pc/header",
        loadChildren: () => import('./demo/pc/header/demo-set.module').then(m => m.HeaderDemoModule),
    },
    {
        path: "pc/ribbon",
        loadChildren: () => import('./demo/pc/ribbon/demo-set.module').then(m => m.RibbonDemoModule),
    },
    {
        path: "pc/theme",
        loadChildren: () => import('./demo/pc/theme/demo-set.module').then(m => m.ThemeDemoModule),
    },
    {
        path: "pc/process-status",
        loadChildren: () => import('./demo/pc/process-status/demo-set.module').then(m => m.ProcessStatusDemoModule),
    },
    {
        path: "pc/toast",
        loadChildren: () => import('./demo/pc/toast/demo-set.module').then(m => m.ToastDemoModule),
    },
    {
        path: "pc/novice-guide",
        loadChildren: () => import('./demo/pc/novice-guide/demo-set.module').then(m => m.NoviceGuideDemoModule),
    },
    {
        path: "pc/chart-icon",
        loadChildren: () => import('./demo/pc/chart-icon/demo-set.module').then(m => m.ChartIconDemoModule),
    },
    {
        path: "pc/large-text",
        loadChildren: () => import('./demo/pc/large-text/demo-set.module').then(m => m.LargeTextDemoModule),
    },
    {
        path: "pc/form-display",
        loadChildren: () => import('./demo/pc/form-display/demo-set-module').then(m => m.FormDisplayDemoModule),
    },
    {
        path: "pc/auto-display",
        loadChildren: () => import('./demo/pc/auto-display/demo-set.module').then(m => m.AutoDisplayDemoModule),
    },
    {
        path: "pc/system-prompt",
        loadChildren: () => import('./demo/pc/system-prompt/demo-set.module').then(m => m.SystemPromptDemoModule),
    }
];
export const routerConfigMobile = [
    {
        path: "mobile/button",
        loadChildren: () => import('./demo/mobile/button/demo-set.module').then(m => m.ButtonMobileDemoModule),
    }
];
export const routerConfig = [...routerConfigPC, ...routerConfigMobile];
