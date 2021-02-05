import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableUpdateColumnDefinesDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableUpdateColumnDefinesDemoComponent],
    exports: [TableUpdateColumnDefinesDemoComponent]
})
export class TableUpdateColumnDefinesDemoModule {
}
