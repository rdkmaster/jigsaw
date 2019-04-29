import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

import {AutoCompleteInputGroupDemoComponent} from "./demo.component";
import {JigsawAutoCompleteInputModule} from "jigsaw/pc-components/input/auto-complete-input";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch";

@NgModule({
    declarations: [AutoCompleteInputGroupDemoComponent],
    imports: [
        JigsawAutoCompleteInputModule, JigsawDemoDescriptionModule, JigsawSwitchModule
    ],
    exports: [AutoCompleteInputGroupDemoComponent]
})
export class AutoCompleteInputGroupDemoModule {
}
