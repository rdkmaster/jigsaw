
export const liveDemoNavInfo = {
    title: 'Live Demo',
    navList: [
        {
            group: 'Basic Controls',
            demos: [
                {
                    label: 'button',
                    url: '/button/button-full'
                },
                {
                    label: 'checkbox',
                    url: '/checkbox/checkbox-full'
                },
                {
                    label: 'input',
                    url: '/input/input-full'
                },
                {
                    label: 'select',
                    url: '/select/select-full'
                },
                {
                    label: 'list',
                    url: '/list/list-full'
                },
                {
                    label: 'radio',
                    url: '/radio/radio-full'
                },
                {
                    label: 'tile',
                    url: '/tile/tile-full'
                },
            ]
        },
        {
            group: 'Combo Select',
            demos: [
                {
                    label: 'combo-full',
                    url: '/combo-select/combo-select-full'
                },
                {
                    label: 'searchable',
                    url: '/combo-select/combo-select-searchable'
                },
            ]
        },
        {
            group: 'Date and Time',
            demos: [
                {
                    label: 'time',
                    url: '/time/time-full'
                },
                {
                    label: 'range-time',
                    url: '/range-time/range-time-full'
                },
            ]
        },
        {
            group: 'Graph',
            demos: [
                {
                    label: 'fish-bone',
                    url: '/fish-bone/fish-bone-full'
                },
            ]
        },
        {
            group: 'Table',
            demos: [
                {
                    label: 'renderer',
                    url: '/table/table-renderer'
                },
            ]
        },
        {
            group: 'Collapse',
            demos: [
                {
                    label: 'collapse',
                    url: '/collapse/collapse-full'
                },
            ]
        },
        {
            group: 'Directives',
            demos: [
                {
                    label: 'trustedHtml',
                    url: '/trusted-html/full'
                },
            ]
        },
    ]
};

export const navInfo = [
    {
        title: 'Alert',
        path: "alert",
        loadChildren: "./alert/demo.module#AlertDemoModule",
        navList: [
            {
                label: 'in-dom',
                url: '/alert/in-dom'
            },
            {
                label: 'popup',
                url: '/alert/popup'
            },
            {
                label: 'customized',
                url: '/alert/customized'
            }
        ]
    },
    {
        title: 'ArrayCollection',
        path: "array-collection",
        loadChildren: "./array-collection/demo.module#ArrayCollectionDemoModule",
        navList: [
            {
                label: 'ajax',
                url: '/array-collection/ajax'
            },
            {
                label: 'basic',
                url: '/array-collection/basic'
            },
            {
                label: 'server side pagination',
                url: '/array-collection/server-side-pagination'
            }
        ]
    },
    {
        title: 'Button',
        path: "button",
        loadChildren: "./button/demo.module#ButtonDemoModule",
        navList: [
            {
                label: 'basic',
                url: '/button/basic'
            },
            {
                label: 'disable',
                url: '/button/disabled'
            },
            {
                label: 'width_height',
                url: '/button/width_height'
            },
            {
                label: 'preset',
                url: '/button/preset'
            },
            {
                label: 'with-loading-inside',
                url: '/button/with-loading'
            },
            {
                label: 'with-loading-outside',
                url: '/loading/domInner'
            }
        ]
    },
    {
        title: 'CheckBox',
        path: "checkbox",
        loadChildren: "./checkbox/demo.module#CheckBoxDemoModule",
        navList: [
            {
                label: 'basic',
                url: '/checkbox/basic'
            },
            {
                label: 'disable',
                url: '/checkbox/disabled'
            }
        ]
    },
    {
        title: 'Loading',
        path: "loading",
        loadChildren: "./loading/demo.module#LoadingDemoModule",
        navList: [
            {
                label: 'loading-full',
                url: '/loading/full'
            },
            {
                label: 'bubbleLoading',
                url: '/loading/bubbleLoading'
            },
            {
                label: 'fontLoading',
                url: '/loading/fontLoading'
            },
            {
                label: 'ballLoading',
                url: '/loading/ballLoading'
            },
            {
                label: 'userDefined',
                url: '/loading/userDefined'
            },
            {
                label: 'with-loading-inside',
                url: '/button/with-loading'
            },
            {
                label: 'with-loading-outside',
                url: '/loading/domInner'
            },
            {
                label: 'color',
                url: '/loading/color'
            },
        ]
    },
    {
        title: 'Switch',
        path: "switch",
        loadChildren: "./switch/switch-demo.module#SwitchDemoModule",
        navList: [
            {
                label: 'basic',
                url: '/switch/basic'
            }
        ]
    },
    {
        title: 'Table',
        path: "table",
        loadChildren: "./table/demo.module#TableDemoModule",
        navList: [
            {
                label: 'basic',
                url: '/table/basic'
            },
            {
                label: 'renderer',
                url: '/table/renderer'
            },
            {
                label: 'performs',
                url: '/table/performs'
            },
            {
                label: 'setColumnWidth',
                url: '/table/setColumnWidth'
            },
            {
                label: 'setColumnVisible',
                url: '/table/setColumnVisible'
            },
            {
                label: 'setHeaderRender',
                url: '/table/setHeaderRender'
            },
            {
                label: 'setHeaderClass',
                url: '/table/setHeaderClass'
            },
            {
                label: 'setHeaderSort',
                url: '/table/setHeaderSort'
            },
            {
                label: 'setCellRender',
                url: '/table/setCellRender'
            },
            {
                label: 'setCellClass',
                url: '/table/setCellClass'
            },
            {
                label: 'setCellEditable',
                url: '/table/setCellEditable'
            },
            {
                label: 'setColumnGroup',
                url: '/table/setColumnGroup'
            },
            {
                label: 'addColumn',
                url: '/table/addColumn'
            },
            {
                label: 'addIDColumn',
                url: '/table/addIDColumn'
            },
            {
                label: 'addCheckboxColumn',
                url: '/table/addCheckboxColumn'
            },
            {
                label: 'fixedHead',
                url: '/table/fixedHead'
            },
            {
                label: 'pageable',
                url: '/table/pageable'
            },
            {
                label: 'dataFromAjax',
                url: '/table/dataFromAjax'
            },
            {
                label: 'scrollAmount',
                url: '/table/scrollAmount'
            },
            {
                label: 'withPopup',
                url: '/table/withPopup'
            },
            {
                label: 'dataChange',
                url: '/table/dataChange'
            },
            {
                label: 'addIDWithPaging',
                url: '/table/addIDWithPaging'
            },
            {
                label: 'addIDWithDebouncePaging',
                url: '/table/addIDWithDebouncePaging'
            },
            {
                label: 'rendererOfTemplateRef',
                url: '/table/rendererOfTemplateRef'
            },
            {
                label: 'lineEllipsis',
                url: '/table/lineEllipsis'
            },
            {
                label: 'localPaging',
                url: '/table/localPagingData'
            },
            {
                label: 'swimLaneDiagram',
                url: '/table/swimLaneDiagram'
            },
            {
                label: 'hideHead',
                url: '/table/hideHead'
            },
            {
                label: 'selectRow',
                url: '/table/selectRow'
            },
        ]
    },
    {
        title: 'Dialog',
        path: "dialog",
        loadChildren: "./dialog/demo.module#DialogDemoModule",
        navList: [
            {
                label: 'title',
                url: '/dialog/title'
            },
            {
                label: 'buttons',
                url: '/dialog/buttons'
            },
            {
                label: 'top',
                url: '/dialog/top'
            },
            {
                label: 'popOption',
                url: '/dialog/popupOption'
            },
            {
                label: 'in-dom',
                url: '/dialog/in-dom'
            },
            {
                label: 'misc',
                url: '/dialog/misc'
            }
        ]
    },
    {
        title: 'Popup',
        path: "popup",
        loadChildren: "./popup/demo.module#PopupDemoModule",
        navList: [
            {
                label: 'alert-popup',
                url: '/alert/popup'
            },
            {
                label: 'dialog-popOption',
                url: '/dialog/popupOption'
            },
            {
                label: 'dialog-misc',
                url: '/dialog/misc'
            },
            {
                label: 'tooltip-dialog',
                url: '/tooltip/dialog'
            }
        ]
    },
    {
        title: 'Input',
        path: "input",
        loadChildren: "./input/demo.module#InputDemoModule",
        navList: [
            {
                label: 'basic',
                url: '/input/basic'
            },
            {
                label: 'valueChange',
                url: '/input/valueChange'
            },
            {
                label: 'focus',
                url: '/input/focus'
            },
            {
                label: 'prefixIcon',
                url: '/input/prefixIcon'
            }
        ]
    },
    {
        title: 'Scrollbar',
        path: "scrollbar",
        loadChildren: "./scrollbar/demo.module#ScrollbarDemoModule",
        navList: [
            {
                label: 'basic',
                url: '/scrollbar/basic'
            },
            {
                label: 'user-define',
                url: '/scrollbar/user-define'
            },
            {
                label: 'setOptions',
                url: '/scrollbar/setOptions'
            },
        ]
    },
    {
        title: 'Select',
        path: "select",
        loadChildren: "./select/demo.module#SelectDemoModule",
        navList: [
            {
                label: 'basic',
                url: '/select/basic'
            },
            {
                label: 'scroll',
                url: '/select/scroll'
            },
            /*{
                label: 'checkbox',
                url: '/select/checkbox'
            },*/
        ]
    },
    {
        title: 'Radio',
        path: "radio",
        loadChildren: "./radio/radio-demo.module#RadioDemoModule",
        navList: [
            {
                label: 'basic',
                url: '/radio/basic'
            },
            {
                label: 'trackItemBy',
                url: '/radio/trackItemBy'
            },
        ]
    },
    {
        title: 'Graph',
        path: "graph",
        loadChildren: "./graph/graph-demo.module#GraphDemoModule",
        navList: [
            {
                label: 'basic',
                url: '/graph/basic'
            },
            {
                label: 'resize',
                url: '/graph/resize'
            },
            {
                label: 'line-bar-graph-basic',
                url: '/graph/line-bar-graph-basic'
            },
            {
                label: 'line-bar-graph-ajax',
                url: '/graph/line-bar-graph-ajax'
            },
            {
                label: 'pie-graph-basic',
                url: '/graph/pie'
            },
            {
                label: 'noData',
                url: '/graph/no-data'
            },
        ]
    },
    {
        title: 'Tile',
        path: "tile",
        loadChildren: "./tile/tile-demo.module#TileSelectDemoModule",
        navList: [
            {
                label: 'SelectedItems',
                url: '/tile/selectedItems'
            },
            {
                label: 'MultipleSelect',
                url: '/tile/multipleSelect'
            },
            {
                label: 'TileOptionWidth',
                url: '/tile/tileOptionWidth'
            },
            {
                label: 'LabelField',
                url: '/tile/labelField'
            },
            {
                label: 'ItemsChange',
                url: '/tile/selectedItemsChange'
            },
            {
                label: 'TrackItemBy',
                url: '/tile/trackitemby'
            },
        ]
    },
    {
        title: 'Time',
        path: "time",
        loadChildren: "./time/time-demo.module#TimeDemoModule",
        navList: [
            {
                label: 'basic',
                url: '/time/basic'
            },
            {
                label: 'limitEnd',
                url: '/time/limitEnd'
            },
            {
                label: 'limitStart',
                url: '/time/limitStart'
            },
            {
                label: 'weekStart',
                url: '/time/weekStart'
            },
            {
                label: 'gr',
                url: '/time/gr'
            },
            {
                label: 'recommended',
                url: '/time/recommended'
            },
            {
                label: 'grItems',
                url: '/time/grItems'
            },
            {
                label: 'refreshInterval',
                url: '/time/refreshInterval'
            },
            {
                label: 'withComboSelect',
                url: '/time/comboSelect'
            },
        ]
    },
    {
        title: 'RangeTime',
        path: "range-time",
        loadChildren: "./range-time/range-time-demo.module#RangeTimeDemoModule",
        navList: [
            {
                label: 'basic',
                url: '/range-time/basic'
            },
            {
                label: 'limitEnd',
                url: '/range-time/limitEnd'
            },
            {
                label: 'limitStart',
                url: '/range-time/limitStart'
            },
            {
                label: 'weekStart',
                url: '/range-time/weekStart'
            },
            {
                label: 'gr',
                url: '/range-time/gr'
            },
            {
                label: 'recommended',
                url: '/range-time/recommended'
            },
            {
                label: 'grItems',
                url: '/range-time/grItems'
            },
            {
                label: 'refreshInterval',
                url: '/range-time/refreshInterval'
            },
        ]
    },
    {
        title: 'Pagination',
        path: "pagination",
        loadChildren: "./pagination/pagination-demo.module#PaginationDemoModule",
        navList: [
            {
                label: 'basic',
                url: '/pagination/basic'
            },
            {
                label: 'with-table-data',
                url: '/pagination/with-table-data'
            },
        ]
    },
    {
        title: 'Tag',
        path: "tag",
        loadChildren: "./tag/tag-demo.module#TagDemoModule",
        navList: [
            {
                label: 'basic',
                url: '/tag/basic'
            }
        ]
    },
    {
        title: 'Tabs',
        path: "tabs",
        loadChildren: "./tabs/tabs-demo.module#TabsDemoModule",
        navList: [
            {
                label: 'basic',
                url: '/tabs/basic'
            },
            {
                label: 'tabApi',
                url: '/tabs/tabApi'
            },
            {
                label: 'withInputAndTable',
                url: '/tabs/withInput'
            },
            {
                label: 'withNgFor',
                url: '/tabs/ngFor'
            },
            {
                label: 'hideTab',
                url: '/tabs/hideTab'
            },
            {
                label: 'showTab',
                url: '/tabs/showTab'
            },
            {
                label: 'removeTab',
                url: '/tabs/destoryTab'
            },
        ]
    },
    {
        title: 'ComboSelect',
        path: "combo-select",
        loadChildren: "./combo-select/combo-select-demo.module#ComboSelectDemoModule",
        navList: [
            {
                label: 'basic',
                url: '/combo-select/basic'
            },
            {
                label: 'multiple',
                url: '/combo-select/multiple'
            },
            {
                label: 'autoWidth',
                url: '/combo-select/autoWidth'
            },
            {
                label: 'labelField',
                url: '/combo-select/labelField'
            },
            {
                label: 'change',
                url: '/combo-select/change'
            },
            {
                label: 'open',
                url: '/combo-select/open'
            },
            {
                label: 'disable',
                url: '/combo-select/disable'
            },
            {
                label: 'collapse',
                url: '/combo-select/collapse'
            },
            {
                label: 'setWidth',
                url: '/combo-select/setWidth'
            },
        ]
    },
    {
        title: 'Slider',
        path: "slider",
        loadChildren: "./slider/slider-demo.module#SliderDemoModule",
        navList: [
            {
                label: 'slider-full',
                url: '/slider/basic'
            },
            {
                label: 'slider-vertical',
                url: '/slider/vertical'
            }
        ]
    },
    {
        title: 'Tree',
        path: "tree",
        loadChildren: "./tree/demo.module#ZtreeDemoModule",
        navList: [
            {
                label: 'tree',
                url: '/tree/basic'
            },
            {
                label: 'dataFromAjax',
                url: '/tree/dataFromAjax'
            },
            {
                label: 'editable',
                url: '/tree/editable'
            },
            {
                label: 'async',
                url: '/tree/async'
            },
        ]
    },
    {
        title: 'trusted-html',
        path: "trusted-html",
        loadChildren: "./trusted-html/demo.module#TrustedHtmlDemoModule",
        navList: [
            {
                label: 'trustedHtml',
                url: '/trusted-html/full'
            },
        ]
    },
    {
        title: 'Collapse',
        path: "collapse",
        loadChildren: "./collapse/collapse-module#CollapseDemoModule",
        navList: [
            {
                label: 'collapse 全家桶',
                url: '/collapse/basic'
            },
            {
                label: 'ngFor',
                url: '/collapse/ngFor'
            }
        ]
    },
    {
        title: 'Tooltip',
        path: "tooltip",
        loadChildren: "./tooltip/demo.module#TooltipDemoModule",
        navList: [
            {
                label: 'in-dom',
                url: '/tooltip/in-dom'
            },
            {
                label: 'dialog',
                url: '/tooltip/dialog'
            },
            {
                label: 'inline',
                url: '/tooltip/inline'
            },
        ]
    },
    {
        title: 'Internationally',
        path: "i18n",
        loadChildren: "./i18n/demo.module#I18nDemoModule",
        navList: [
            {
                label: 'i18n-full',
                url: '/i18n/i18n-full'
            }
        ]
    },
    {
        title: 'Drag and Drop',
        path: "drag-drop",
        loadChildren: "./drag-drop/demo.module#DragDropDemoModule",
        navList: [
            {
                label: 'drag-to-replace',
                url: '/drag-drop/drag-to-replace'
            },
            {
                label: 'table-drag',
                url: '/drag-drop/table-drag'
            }
        ]
    },
    {
        title: 'Form',
        path: "form",
        loadChildren: "./form/demo.module#FormDemoModule",
        navList: [
            {
                label: 'template driven',
                url: '/form/template-driven'
            }
        ]
    },
    {
        title: 'Misc',
        path: "misc",
        loadChildren: "./misc/demo.module#MiscDemoModule",
        navList: [
            {
                label: 'zone-for-performance',
                url: '/misc/zone-for-performance'
            }
        ]
    },
    {
        title: 'FishBone',
        path: "fish-bone",
        loadChildren: "./fish-bone/demo.module#FishBoneDemoModule",
        navList: [
            {
                label: 'fish-bone',
                url: '/fish-bone/fish-bone-full'
            }
        ]
    },
    {
        title: 'List',
        path: "list",
        loadChildren: "./list/demo.module#ListDemoModule",
        navList: [
            {
                label: 'fish-bone',
                url: '/fish-bone/fish-bone-full'
            }
        ]
    }
];
