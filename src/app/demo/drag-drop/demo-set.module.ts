import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DragToReplaceDemoModule} from "./drag-to-replace/demo.module";
import {TableDragDemoModule} from "./table-drag/demo.module";

import {DragToReplaceDemoComponent} from "./drag-to-replace/demo.component";
import {TableDragDemoComponent} from "./table-drag/demo.component";

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
