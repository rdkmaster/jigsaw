import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableChangeDataDemoComponent} from './demo.component';
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawButtonModule],
    declarations: [TableChangeDataDemoComponent],
    exports: [TableChangeDataDemoComponent]
})
export class TableChangeDataDemoModule {
}
