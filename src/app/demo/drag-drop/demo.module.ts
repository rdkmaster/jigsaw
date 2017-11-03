import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DragToReplaceDemoModule} from "./drag-to-replace/app.module";
import {TableDragDemoModule} from "./table-drag/app.module";

import {DragToReplaceDemoComponent} from "./drag-to-replace/app.component";
import {TableDragDemoComponent} from "./table-drag/app.component";

export const routerConfig = [
    {
        path: 'drag-to-replace', component: DragToReplaceDemoComponent
    },
    {
        path: 'table-drag', component: TableDragDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        DragToReplaceDemoModule,
        TableDragDemoModule
    ]
})
export class DragDropDemoModule {
}
