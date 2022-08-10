import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/public_api";
import {TableSetCellClassDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableSetCellClassDemoComponent],
    exports: [TableSetCellClassDemoComponent]
})
export class TableSetCellClassDemoModule {
}
