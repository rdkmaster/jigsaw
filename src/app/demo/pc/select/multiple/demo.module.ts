import {NgModule} from '@angular/core';
import {JigsawSelectModule} from "jigsaw/pc-components/select/select";
import {JigsawCheckBoxModule} from "jigsaw/pc-components/checkbox/index";
import {JigsawNumericInputModule} from "jigsaw/pc-components/input/numeric-input";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SelectMultipleDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawSelectModule, JigsawCheckBoxModule, JigsawNumericInputModule, JigsawDemoDescriptionModule],
    declarations: [SelectMultipleDemoComponent],
    exports: [SelectMultipleDemoComponent]
})
export class SelectMultipleDemoModule {
}
