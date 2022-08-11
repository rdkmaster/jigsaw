import {NgModule} from '@angular/core';
import {JigsawNumericInputModule, JigsawSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {SelectOptionWidthDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawNumericInputModule],
    declarations: [SelectOptionWidthDemoComponent],
    exports: [SelectOptionWidthDemoComponent]
})
export class SelectOptionWidthDemoModule {
}
