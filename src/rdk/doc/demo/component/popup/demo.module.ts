import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {RdkButtonModule} from "../../../../component/button/button";
import {PopupService} from "../../../../service/popup.service";
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
        RdkButtonModule,
    ],
    providers: [PopupService],
    entryComponents: [
    ]
})
export class PopupDemoModule {
}
