import {NgModule} from "@angular/core";
import {JigsawAutoCompleteInputModule, JigsawSwitchModule, JigsawInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {AutoCompleteInputSelectEventDemoComponent} from "./demo.component";

@NgModule({
    declarations: [AutoCompleteInputSelectEventDemoComponent],
    imports: [
        JigsawAutoCompleteInputModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawInputModule
    ],
    exports: [AutoCompleteInputSelectEventDemoComponent]
})
export class AutoCompleteInputSelectEventDemoModule {
}
