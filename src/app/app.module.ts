import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateService} from '@ngx-translate/core';

import {JigsawRootModule} from "jigsaw/component/root/root";
import {AppComponent} from './app.component';
import {AjaxInterceptor} from './app.interceptors';
import {DemoListComponent} from "./demo-list.component";


const routesConfig = [
    {
        path: "alert",
        loadChildren: "./e2e-testee/alert/demo.module#AlertDemoModule"
    },
    {
        path: "array-collection",
        loadChildren: "./e2e-testee/array-collection/demo.module#ArrayCollectionDemoModule",
    },
    {
        path: "button",
        loadChildren: "./e2e-testee/button/demo.module#ButtonDemoModule",

    },
    {
        path: "checkbox",
        loadChildren: "./e2e-testee/checkbox/demo.module#CheckBoxDemoModule",

    },
    {
        path: "loading",
        loadChildren: "./e2e-testee/loading/demo.module#LoadingDemoModule",

    },
    {
        path: "switch",
        loadChildren: "./e2e-testee/switch/switch-demo.module#SwitchDemoModule",

    },
    {
        path: "table",
        loadChildren: "./e2e-testee/table/demo.module#TableDemoModule",

    },
    {
        path: "dialog",
        loadChildren: "./e2e-testee/dialog/demo.module#DialogDemoModule",

    },
    {
        path: "popup",
        loadChildren: "./e2e-testee/popup/demo.module#PopupDemoModule",

    },
    {
        path: "input",
        loadChildren: "./e2e-testee/input/demo.module#InputDemoModule",

    },
    {
        path: "scrollbar",
        loadChildren: "./e2e-testee/scrollbar/demo.module#ScrollbarDemoModule",

    },
    {
        path: "select",
        loadChildren: "./e2e-testee/select/demo.module#SelectDemoModule",

    },
    {
        path: "radio",
        loadChildren: "./e2e-testee/radio/radio-demo.module#RadioDemoModule",

    },
    {
        path: "graph",
        loadChildren: "./e2e-testee/graph/graph-demo.module#GraphDemoModule",

    },
    {
        path: "tile",
        loadChildren: "./e2e-testee/tile/tile-demo.module#TileSelectDemoModule",

    },
    {
        path: "time",
        loadChildren: "./e2e-testee/time/time-demo.module#TimeDemoModule",

    },
    {
        path: "range-time",
        loadChildren: "./e2e-testee/range-time/range-time-demo.module#RangeTimeDemoModule",

    },
    {
        path: "pagination",
        loadChildren: "./e2e-testee/pagination/pagination-demo.module#PaginationDemoModule",

    },
    {
        path: "tag",
        loadChildren: "./e2e-testee/tag/tag-demo.module#TagDemoModule",

    },
    {
        path: "tabs",
        loadChildren: "./e2e-testee/tabs/tabs-demo.module#TabsDemoModule",

    },
    {
        path: "combo-select",
        loadChildren: "./e2e-testee/combo-select/combo-select-demo.module#ComboSelectDemoModule",

    },
    {
        path: "slider",
        loadChildren: "./e2e-testee/slider/slider-demo.module#SliderDemoModule",

    },
    {
        path: "tree",
        loadChildren: "./e2e-testee/tree/demo.module#ZtreeDemoModule",

    },
    {
        path: "trusted-html",
        loadChildren: "./e2e-testee/trusted-html/demo.module#TrustedHtmlDemoModule",

    },
    {
        path: "collapse",
        loadChildren: "./e2e-testee/collapse/collapse-module#CollapseDemoModule",

    },
    {
        path: "tooltip",
        loadChildren: "./e2e-testee/tooltip/demo.module#TooltipDemoModule",

    },
    {
        path: "i18n",
        loadChildren: "./e2e-testee/i18n/demo.module#I18nDemoModule",

    },
    {
        path: "drag-drop",
        loadChildren: "./e2e-testee/drag-drop/demo.module#DragDropDemoModule",

    },
    {
        path: "form",
        loadChildren: "./e2e-testee/form/demo.module#FormDemoModule",

    },
    {
        path: "misc",
        loadChildren: "./e2e-testee/misc/demo.module#MiscDemoModule",

    },
    {
        path: "fish-bone",
        loadChildren: "./e2e-testee/fish-bone/demo.module#FishBoneDemoModule",

    },
    {
        path: "list",
        loadChildren: "./e2e-testee/list/demo.module#ListDemoModule",

    },
    {
        path: '**', //fallback router must in the last
        component: DemoListComponent
    }
];

@NgModule({
    declarations: [
        AppComponent, DemoListComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, HttpClientModule,
        RouterModule.forRoot(routesConfig),
        JigsawRootModule
    ],
    providers: [
        TranslateService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AjaxInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
