import {NgModule} from "@angular/core";
import {JigsawAutoCompleteInputModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {AutoCompleteInputNonGroupDemoComponent} from "./demo.component";

@NgModule({
    declarations: [AutoCompleteInputNonGroupDemoComponent],
    imports: [
        JigsawAutoCompleteInputModule, JigsawDemoDescriptionModule, JigsawSwitchModule
    ],
    exports: [AutoCompleteInputNonGroupDemoComponent]
})
export class AutoCompleteInputNonGroupDemoModule {
}
