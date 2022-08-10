import {NgModule} from "@angular/core";
import {JigsawAutoCompleteInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {AutoCompleteInputPrefixSuffixDemoComponent} from "./demo.component";

@NgModule({
    declarations: [AutoCompleteInputPrefixSuffixDemoComponent],
    exports: [AutoCompleteInputPrefixSuffixDemoComponent],
    imports: [JigsawAutoCompleteInputModule, JigsawDemoDescriptionModule]
})
export class AutoCompleteInputPrefixSuffixDemoModule {

}
