import {NgModule} from "@angular/core";
import {JigsawAutoCompleteInputModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {AutoCompleteInputGroupDemoComponent} from "./demo.component";

@NgModule({
    declarations: [AutoCompleteInputGroupDemoComponent],
    imports: [
        JigsawAutoCompleteInputModule, JigsawDemoDescriptionModule, JigsawSwitchModule
    ],
    exports: [AutoCompleteInputGroupDemoComponent]
})
export class AutoCompleteInputGroupDemoModule {
}
