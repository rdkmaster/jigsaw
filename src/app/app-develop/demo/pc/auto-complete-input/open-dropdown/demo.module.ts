import {NgModule} from "@angular/core";
import {JigsawAutoCompleteInputModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {AutoCompleteInputOpenDropdownDemoComponent} from "./demo.component";

@NgModule({
    declarations: [AutoCompleteInputOpenDropdownDemoComponent],
    imports: [
        JigsawAutoCompleteInputModule, JigsawDemoDescriptionModule, JigsawSwitchModule
    ],
    exports: [AutoCompleteInputOpenDropdownDemoComponent]
})
export class AutoCompleteInputOpenDropdownDemoModule {
}
