import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawPaginationModule} from "jigsaw/public_api";
import {TablePageableReadyDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, DemoTemplateModule],
    declarations: [TablePageableReadyDemoComponent],
    exports: [TablePageableReadyDemoComponent]
})
export class TablePageableReadyDemoModule {
}
