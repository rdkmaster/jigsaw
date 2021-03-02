import {NgModule} from "@angular/core";
import {JigsawAutoCompleteInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {AutoCompleteInputUnitDemoComponent} from "./demo.component";

@NgModule({
    declarations: [AutoCompleteInputUnitDemoComponent],
    exports: [AutoCompleteInputUnitDemoComponent],
    imports: [JigsawAutoCompleteInputModule, JigsawDemoDescriptionModule]
})
export class AutoCompleteInputUnitDemoModule {

}
