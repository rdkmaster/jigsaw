import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {TableResizeDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawButtonModule],
    declarations: [TableResizeDemoComponent],
    exports: [TableResizeDemoComponent],
})
export class TableResizeDemoModule {
}
