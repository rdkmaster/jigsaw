import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {TableDataChangeDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TableDataChangeDemoComponent],
    bootstrap: [TableDataChangeDemoComponent]
})
export class TableDataChangeDemoModule {
}
