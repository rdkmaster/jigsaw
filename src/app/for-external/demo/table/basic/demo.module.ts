import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/public_api";
import {TableBasicComponent} from './demo.component';
import {DemoTemplateModule} from "../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule, DemoTemplateModule],
    declarations: [TableBasicComponent],
    exports: [TableBasicComponent]
})
export class TableBasicDemoModule {
}
