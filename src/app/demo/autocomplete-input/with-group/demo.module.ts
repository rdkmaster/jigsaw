import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

import {AutoCompleteInputGroupDemoComponent} from "./demo.component";
import {JigsawAutoCompleteInputModule} from "jigsaw/component/input/autocomplete-input";
import {JigsawSwitchModule} from "jigsaw/component/switch";

@NgModule({
    declarations: [AutoCompleteInputGroupDemoComponent],
    imports: [
        JigsawAutoCompleteInputModule, JigsawDemoDescriptionModule, JigsawSwitchModule
    ],
    exports: [AutoCompleteInputGroupDemoComponent]
})
export class AutoCompleteInputGroupDemoModule {
}
