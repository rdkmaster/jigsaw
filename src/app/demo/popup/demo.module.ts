import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {JigsawButtonModule} from "jigsaw/component/button/button";
import {PopupService} from "jigsaw/service/popup.service";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {PopupTracingEventComponent} from "./tracing-event/demo";

const popupDemoRoutes = [
    {
        path: 'tracing-event', component: PopupTracingEventComponent
    },
    {
        path: '**', //fallback router must in the last
        component: PopupTracingEventComponent
    }
];

@NgModule({
    declarations: [
        PopupTracingEventComponent
    ],
    imports: [
        RouterModule.forChild(popupDemoRoutes),
        CommonModule,
        JigsawButtonModule,
        JigsawDialogModule
    ],
    providers: [PopupService],
    entryComponents: [
    ]
})
export class PopupDemoModule {
}
