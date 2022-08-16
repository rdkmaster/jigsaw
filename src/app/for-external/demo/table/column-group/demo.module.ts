import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/public_api";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {TableColumnGroupDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, DemoTemplateModule],
    declarations: [TableColumnGroupDemoComponent],
    exports: [TableColumnGroupDemoComponent]
})
export class TableColumnGroupDemoModule {
}
