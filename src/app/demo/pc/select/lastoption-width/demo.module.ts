import {NgModule} from '@angular/core';
import {JigsawNumericInputModule, JigsawSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SelectOptionWidthDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawNumericInputModule],
    declarations: [SelectOptionWidthDemoComponent],
    exports: [SelectOptionWidthDemoComponent]
})
export class SelectOptionWidthDemoModule {
}
