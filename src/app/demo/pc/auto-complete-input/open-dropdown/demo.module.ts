import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

import {AutoCompleteInputOpenDropdownDemoComponent} from "./demo.component";
import {JigsawAutoCompleteInputModule} from "jigsaw/pc-components/input/auto-complete-input";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch/index";

@NgModule({
    declarations: [AutoCompleteInputOpenDropdownDemoComponent],
    imports: [
        JigsawAutoCompleteInputModule, JigsawDemoDescriptionModule, JigsawSwitchModule
    ],
    exports: [AutoCompleteInputOpenDropdownDemoComponent]
})
export class AutoCompleteInputOpenDropdownDemoModule {
}
