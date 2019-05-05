import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {TableDataChangeDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TableDataChangeDemoComponent],
    exports: [TableDataChangeDemoComponent]
})
export class TableDataChangeDemoModule {
}
