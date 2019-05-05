import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {TableSetHeaderClassDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableSetHeaderClassDemoComponent],
    exports: [TableSetHeaderClassDemoComponent]
})
export class TableSetHeaderClassDemoModule {
}
