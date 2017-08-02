import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DragToReplaceDemoModule} from "./drag-to-replace/app.module";
import {DragToReplaceDemoComponent} from "./drag-to-replace/app.component";
import {TableDragDemoModule} from "./table-drag/app.module";
import {TableDragDemoComponent} from "./table-drag/app.component";

const draggableDemoRoutes = [
    {
        path: '', redirectTo: 'drag-to-replace', pathMatch: 'full'
    },
    {
        path: 'drag-to-replace', component: DragToReplaceDemoComponent
    },
    {
        path: 'table-drag', component: TableDragDemoComponent
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
        TableDragDemoModule
    ]
})
export class DragDropDemoModule {
}
