import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DragToReplaceDemoModule} from "./drag-to-replace/app.module";
import {TableDragDemoModule} from "./table-drag/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('drag-drop');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        DragToReplaceDemoModule,
        TableDragDemoModule
    ]
})
export class DragDropDemoModule {
}
