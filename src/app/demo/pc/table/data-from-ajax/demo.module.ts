import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawButtonModule} from "jigsaw/public_api";
import {TableDataFromAjaxDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TableDataFromAjaxDemoComponent],
    exports: [TableDataFromAjaxDemoComponent]
})
export class TableDataFromAjaxDemoModule {
}
