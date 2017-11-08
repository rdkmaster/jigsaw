import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TableContentWidthDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableContentWidthDemoComponent],
    bootstrap: [TableContentWidthDemoComponent]
})
export class TableContentWidthDemoModule {
}
