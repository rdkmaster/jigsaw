import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TableResizeDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawButtonModule],
    declarations: [TableResizeDemoComponent],
    bootstrap: [TableResizeDemoComponent],
})
export class TableResizeDemoModule {
}
