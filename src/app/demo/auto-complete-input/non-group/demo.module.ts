import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

import {AutoCompleteInputNonGroupDemoComponent} from "./demo.component";
import {JigsawAutoCompleteInputModule} from "jigsaw/component/input/auto-complete-input";
import {JigsawSwitchModule} from "jigsaw/component/switch";

@NgModule({
    declarations: [AutoCompleteInputNonGroupDemoComponent],
    imports: [
        JigsawAutoCompleteInputModule, JigsawDemoDescriptionModule, JigsawSwitchModule
    ],
    exports: [AutoCompleteInputNonGroupDemoComponent]
})
export class AutoCompleteInputNonGroupDemoModule {
}
