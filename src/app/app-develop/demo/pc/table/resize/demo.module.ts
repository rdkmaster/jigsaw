import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawButtonModule} from "jigsaw/public_api";
import {TableResizeDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawButtonModule],
    declarations: [TableResizeDemoComponent],
    exports: [TableResizeDemoComponent],
})
export class TableResizeDemoModule {
}
