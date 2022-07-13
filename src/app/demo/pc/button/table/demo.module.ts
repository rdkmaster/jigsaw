import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/public_api";
import {ButtonTableComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";


@NgModule({
    declarations: [ButtonTableComponent],
    exports: [ ButtonTableComponent ],
    imports: [JigsawButtonModule, DemoTemplateModule]
})
export class ButtonInTableDemoModule {

}
