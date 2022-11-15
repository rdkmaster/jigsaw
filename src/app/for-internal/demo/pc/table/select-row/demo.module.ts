import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawNumericInputModule, JigsawTableModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TableSelectRowDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawNumericInputModule],
    declarations: [TableSelectRowDemoComponent],
    exports: [TableSelectRowDemoComponent]
})
export class TableSelectRowDemoModule {
}
