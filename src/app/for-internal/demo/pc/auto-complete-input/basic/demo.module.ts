import {NgModule} from "@angular/core";
import {JigsawAutoCompleteInputModule, JigsawSwitchModule, JigsawInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {AutoCompleteInputBasicDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [AutoCompleteInputBasicDemoComponent],
    imports: [
        JigsawAutoCompleteInputModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawInputModule
    , JigsawHeaderModule],
    exports: [AutoCompleteInputBasicDemoComponent]
})
export class AutoCompleteInputBasicDemoModule {
}
