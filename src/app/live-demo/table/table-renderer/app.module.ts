import {NgModule} from "@angular/core";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {MySalaryHeightLightCell, MyEditableCell, TableRendererLiveDemo, MyOptionCell} from "./app.component";
import {JigsawPaginationModule} from "jigsaw/component/pagination/pagination";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule],
    entryComponents: [
        // 自定义单元格渲染器要在这里注册一下
        MyEditableCell,
        MySalaryHeightLightCell,
        MyOptionCell
    ],
    declarations: [
        // 自定义单元格渲染器要在这里声明一下
        TableRendererLiveDemo,
        MyEditableCell,
        MySalaryHeightLightCell,
        MyOptionCell
    ],
    bootstrap: [TableRendererLiveDemo]
})
export class TableRendererLiveDemoModule {

}
