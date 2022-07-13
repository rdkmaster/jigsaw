import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/public_api";
import {ButtonKeyComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";


@NgModule({
    declarations: [ButtonKeyComponent],
    exports: [ ButtonKeyComponent ],
    imports: [JigsawButtonModule, DemoTemplateModule]
})
export class ButtonKeyDemoModule {

}
