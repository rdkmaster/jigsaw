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
        path: "pc/range-time",
        loadChildren: () => import('./demo/pc/range-time/demo-set.module').then(m => m.RangeTimeDemoModule),
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
        path: "pc/time",
        loadChildren: () => import('./demo/pc/time/demo-set.module').then(m => m.TimeDemoModule),
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
    }
];
export const routerConfigMobile = [
    {
        path: "mobile/alert",
        loadChildren: () => import('./demo/mobile/alert/demo-set.module').then(m => m.AlertMobileDemoModule),
    },
    {
        path: "mobile/button",
        loadChildren: () => import('./demo/mobile/button/demo-set.module').then(m => m.ButtonMobileDemoModule),
    },
    {
        path: "mobile/button-bar",
        loadChildren: () => import('./demo/mobile/button-bar/demo-set.module').then(m => m.ButtonBarMobileDemoModule),
    },

    {
        path: "mobile/checkbox",
        loadChildren: () => import('./demo/mobile/checkbox/demo-set.module').then(m => m.CheckBoxMobileDemoModule),
    },
    {
        path: "mobile/dialog",
        loadChildren: () => import('./demo/mobile/dialog/demo-set.module').then(m => m.DialogMobileDemoModule),
    },
    {
        path: "mobile/float",
        loadChildren: () => import('./demo/mobile/float/demo-set.module').then(m => m.FloatMobileDemoModule),
    },
    {
        path: "mobile/graph",
        loadChildren: () => import('./demo/mobile/graph/demo-set.module').then(m => m.GraphMobileDemoModule),
    },
    {
        path: "mobile/i18n",
        loadChildren: () => import('./demo/mobile/i18n/demo-set.module').then(m => m.I18nMobileDemoModule),
    },
    {
        path: "mobile/icon",
        loadChildren: () => import('./demo/mobile/icon/demo-set.module').then(m => m.IconMobileDemoModule),
    },
    {
        path: "mobile/input",
        loadChildren: () => import('./demo/mobile/input/demo-set.module').then(m => m.InputMobileDemoModule),
    },
    {
        path: "mobile/list",
        loadChildren: () => import('./demo/mobile/list/demo-set.module').then(m => m.ListMobileDemoModule),
    },
    {
        path: "mobile/list-lite",
        loadChildren: () => import('./demo/mobile/list-lite/demo-set.module').then(m => m.ListLiteMobileDemoModule),
    },
    {
        path: "mobile/loading",
        loadChildren: () => import('./demo/mobile/loading/demo-set.module').then(m => m.LoadingMobileDemoModule),
    },
    {
        path: "mobile/movable",
        loadChildren: () => import('./demo/mobile/movable/demo-set.module').then(m => m.MovableMobileDemoModule),
    },
    {
        path: "mobile/radio-group",
        loadChildren: () => import('./demo/mobile/radio-group/demo-set.module').then(m => m.RadioMobileDemoModule),
    },
    {
        path: "mobile/radio-lite",
        loadChildren: () => import('./demo/mobile/radio-lite/demo-set.module').then(m => m.RadioLiteMobileDemoModule),
    },
    {
        path: "mobile/rate",
        loadChildren: () => import('./demo/mobile/rate/demo-set.module').then(m => m.RateMobileDemoModule),
    },
    {
        path: "mobile/scrollbar",
        loadChildren: () => import('./demo/mobile/scrollbar/demo-set.module').then(m => m.ScrollbarMobileDemoModule),
    },
    {
        path: "mobile/slider",
        loadChildren: () => import('./demo/mobile/slider/demo-set.module').then(m => m.SliderMobileDemoModule),
    },

    {
        path: "mobile/switch",
        loadChildren: () => import('./demo/mobile/switch/demo-set.module').then(m => m.SwitchMobileDemoModule),
    },
    {
        path: "mobile/tab",
        loadChildren: () => import('./demo/mobile/tab/demo-set.module').then(m => m.TabsMobileDemoModule),
    },
    {
        path: "mobile/tag",
        loadChildren: () => import('./demo/mobile/tag/demo-set.module').then(m => m.TagMobileDemoModule),
    },
    {
        path: "mobile/tile",
        loadChildren: () => import('./demo/mobile/tile/demo-set.module').then(m => m.TileSelectMobileDemoModule),
    },
    {
        path: "mobile/tile-lite",
        loadChildren: () => import('./demo/mobile/tile-lite/demo-set.module').then(m => m.TileLiteMobileDemoModule),
    },
    {
        path: "mobile/trusted-html",
        loadChildren: () => import('./demo/mobile/trusted-html/demo-set.module').then(m => m.TrustedHtmlMobileDemoModule),
    },
];
export const routerConfig = [...routerConfigPC, ...routerConfigMobile];
