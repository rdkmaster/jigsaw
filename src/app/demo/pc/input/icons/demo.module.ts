import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {InputPrefixIconDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [InputPrefixIconDemoComponent],
    exports: [InputPrefixIconDemoComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule]
})
export class InputPrefixIconDemoModule {

}
