import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/public_api";
import {InputPrefixIconDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [InputPrefixIconDemoComponent],
    exports: [InputPrefixIconDemoComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule]
})
export class InputPrefixIconDemoModule {

}
