import {NgModule} from "@angular/core";
import {JigsawAutoCompleteInputModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {AutoCompleteInputShowBorderDemoComponent} from "./demo.component";

@NgModule({
    declarations: [AutoCompleteInputShowBorderDemoComponent],
    imports: [
        JigsawAutoCompleteInputModule, JigsawDemoDescriptionModule, JigsawSwitchModule
    ],
    exports: [AutoCompleteInputShowBorderDemoComponent]
})
export class AutoCompleteInputShowBorderDemoModule {
}
