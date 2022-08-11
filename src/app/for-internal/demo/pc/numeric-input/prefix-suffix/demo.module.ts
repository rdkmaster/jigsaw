import {NgModule} from "@angular/core";
import {JigsawButtonBarModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {NumericInputPrefixSuffixDemoComponent} from "./demo.component";

@NgModule({
    declarations: [NumericInputPrefixSuffixDemoComponent],
    exports: [NumericInputPrefixSuffixDemoComponent],
    imports: [JigsawNumericInputModule, JigsawDemoDescriptionModule, JigsawButtonBarModule]
})
export class NumericInputPrefixSuffixDemoModule {

}
