import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableHideHeadDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TableHideHeadDemoComponent],
    exports: [TableHideHeadDemoComponent]
})
export class TableHideHeadDemoModule {
}
