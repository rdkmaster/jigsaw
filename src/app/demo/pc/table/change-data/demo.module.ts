import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableChangeDataDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawButtonModule],
    declarations: [TableChangeDataDemoComponent],
    exports: [TableChangeDataDemoComponent]
})
export class TableChangeDataDemoModule {
}
