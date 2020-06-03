import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputValueChangeDemoComponent} from "./demo.component";

@NgModule({
    declarations: [InputValueChangeDemoComponent],
    exports: [InputValueChangeDemoComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule]
})
export class InputValueChangeDemoModule {

}
