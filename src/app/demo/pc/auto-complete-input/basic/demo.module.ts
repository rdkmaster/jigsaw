import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

import {AutoCompleteInputBasicDemoComponent} from "./demo.component";
import {JigsawAutoCompleteInputModule} from "jigsaw/pc-components/input/auto-complete-input";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch/index";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";

@NgModule({
    declarations: [AutoCompleteInputBasicDemoComponent],
    imports: [
        JigsawAutoCompleteInputModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawInputModule
    ],
    exports: [AutoCompleteInputBasicDemoComponent]
})
export class AutoCompleteInputBasicDemoModule {
}
