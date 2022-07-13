import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/public_api";
import {InputPrefixIconDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";
import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [InputPrefixIconDemoComponent],
    exports: [InputPrefixIconDemoComponent],
    imports: [JigsawInputModule, JigsawHeaderModule, DemoTemplateModule]
})
export class InputPrefixIconDemoModule {

}
