import {NgModule} from "@angular/core";
import {JigsawAutoCompleteInputModule, JigsawSwitchModule, JigsawInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {AutoCompleteInputBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [AutoCompleteInputBasicDemoComponent],
    imports: [
        JigsawAutoCompleteInputModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawInputModule
    ],
    exports: [AutoCompleteInputBasicDemoComponent]
})
export class AutoCompleteInputBasicDemoModule {
}
