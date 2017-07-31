import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DragToReplaceDemoModule} from "./drag-to-replace/app.module";
import {DragToReplaceDemoComponent} from "./drag-to-replace/app.component";
import {DragIntoCmptDemoComponent} from "./drag-into-component/app.component";
import {DragIntoCmptDemoModule} from "./drag-into-component/app.module";

const draggableDemoRoutes = [
    {
        path: '', redirectTo: 'drag-to-replace', pathMatch: 'full'
    },
    {
        path: 'drag-to-replace', component: DragToReplaceDemoComponent
    },
    {
        path: 'drag-into-component', component: DragIntoCmptDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: DragToReplaceDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(draggableDemoRoutes),
        DragToReplaceDemoModule,
        DragIntoCmptDemoModule
    ]
})
export class DragDropDemoModule {
}
