import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/public_api";
import {InputBasicDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    declarations: [InputBasicDemoComponent],
    exports: [InputBasicDemoComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule]
})
export class InputBasicDemoModule {

}
