import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/public_api";
import {ButtonIconWordComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";


@NgModule({
    declarations: [ButtonIconWordComponent],
    exports: [ ButtonIconWordComponent ],
    imports: [JigsawButtonModule, DemoTemplateModule]
})
export class ButtonIconWordDemoModule {

}
