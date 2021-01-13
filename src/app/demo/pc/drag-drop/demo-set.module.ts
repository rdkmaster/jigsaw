import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DragToReplaceDemoModule} from "./drag-to-replace/demo.module";
import {TableDragDemoModule} from "./simple-table-dragdrop/demo.module";

import {DragToReplaceDemoComponent} from "./drag-to-replace/demo.component";
import {TableDragDemoComponent} from "./simple-table-dragdrop/demo.component";

export const routerConfig = [
    {
        path: 'simple-table-dragdrop', component: TableDragDemoComponent
    },
    {
        path: 'drag-to-replace', component: DragToReplaceDemoComponent
    },
    {
        desc: 'draggable-table', url: '/pc/table/draggable-table', path: ''
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
