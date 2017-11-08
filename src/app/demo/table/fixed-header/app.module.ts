import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TableFixedHeadDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableFixedHeadDemoComponent],
    bootstrap: [TableFixedHeadDemoComponent]
})
export class TableFixedHeadDemoModule {
}
