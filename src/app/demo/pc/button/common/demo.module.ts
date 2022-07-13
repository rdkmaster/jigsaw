import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/public_api";
import {ButtonCommonComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";


@NgModule({
    declarations: [ButtonCommonComponent],
    exports: [ ButtonCommonComponent ],
    imports: [JigsawButtonModule, DemoTemplateModule]
})
export class ButtonCommonDemoModule {

}
