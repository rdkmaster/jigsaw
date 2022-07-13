import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/public_api";
import {ButtonDangerComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";


@NgModule({
    declarations: [ButtonDangerComponent],
    exports: [ ButtonDangerComponent ],
    imports: [JigsawButtonModule, DemoTemplateModule]
})
export class ButtonDangerDemoModule {

}
