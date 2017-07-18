import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {PopupTracingEventComponent} from "./tracing-event/app.component";
import {PopupTracingEventModule} from "./tracing-event/app.module";

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
    imports: [
        RouterModule.forChild(popupDemoRoutes),
        PopupTracingEventModule
    ]
})
export class PopupDemoModule {
}
