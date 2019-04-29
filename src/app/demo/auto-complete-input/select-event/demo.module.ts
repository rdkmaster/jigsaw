import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

import {AutoCompleteInputSelectEventDemoComponent} from "./demo.component";
import {JigsawAutoCompleteInputModule} from "jigsaw/pc-components/input/auto-complete-input";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";

@NgModule({
    declarations: [AutoCompleteInputSelectEventDemoComponent],
    imports: [
        JigsawAutoCompleteInputModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawInputModule
    ],
    exports: [AutoCompleteInputSelectEventDemoComponent]
})
export class AutoCompleteInputSelectEventDemoModule {
}
