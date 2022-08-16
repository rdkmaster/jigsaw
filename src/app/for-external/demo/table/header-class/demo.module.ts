import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/public_api";
import {TableSetHeaderClassDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule, DemoTemplateModule],
    declarations: [TableSetHeaderClassDemoComponent],
    exports: [TableSetHeaderClassDemoComponent]
})
export class TableSetHeaderClassDemoModule {
}
