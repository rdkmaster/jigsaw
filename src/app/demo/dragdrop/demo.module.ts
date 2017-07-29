import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DragToReplaceDemoModule} from "./drap-to-replace/app.module";
import {DragToReplaceDemoComponent} from "./drap-to-replace/app.component";

const draggableDemoRoutes = [
    {
        path: '', redirectTo: 'drag-to-replace', pathMatch: 'full'
    },
    {
        path: 'drag-to-replace', component: DragToReplaceDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: DragToReplaceDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(draggableDemoRoutes),
        DragToReplaceDemoModule
    ]
})
export class DragDropDemoModule {
}
