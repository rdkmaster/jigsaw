import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputUnitDemoComponent} from "./demo.component";

@NgModule({
    declarations: [InputUnitDemoComponent],
    exports: [InputUnitDemoComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule]
})
export class InputUnitDemoModule {

}
