import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/public_api";
import {ButtonImportantComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";


@NgModule({
    declarations: [ButtonImportantComponent],
    exports: [ ButtonImportantComponent ],
    imports: [JigsawButtonModule, DemoTemplateModule]
})
export class ButtonImportantDemoModule {

}
