import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawPaginationModule, JigsawButtonBarModule} from "jigsaw/public_api";
import {TableAlwaysShowEditorDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawDemoDescriptionModule, JigsawButtonBarModule,],
    declarations: [TableAlwaysShowEditorDemoComponent],
    exports: [TableAlwaysShowEditorDemoComponent]
})
export class TableAlwaysShowEditorDemoModule {
}
