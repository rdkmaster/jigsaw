import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {InputPrefixSuffixDemoComponent} from "./demo.component";

@NgModule({
    declarations: [InputPrefixSuffixDemoComponent],
    exports: [InputPrefixSuffixDemoComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule]
})
export class InputPrefixSuffixDemoModule {

}
