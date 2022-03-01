import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableExpandDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableExpandDemoComponent],
    exports: [TableExpandDemoComponent]
})
export class TableExpandDemoModule {
}
