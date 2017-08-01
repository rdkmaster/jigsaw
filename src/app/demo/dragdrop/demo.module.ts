import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DragToReplaceDemoModule} from "./drag-to-replace/app.module";
import {DragToReplaceDemoComponent} from "./drag-to-replace/app.component";
import {DragIntoCmptDemoComponent} from "./drag-into-component/app.component";
import {DragIntoCmptDemoModule} from "./drag-into-component/app.module";
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
        path: 'drag-into-component', component: DragIntoCmptDemoComponent
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
        DragIntoCmptDemoModule,
        TableDragDemoModule
    ]
})
export class DragDropDemoModule {
}
