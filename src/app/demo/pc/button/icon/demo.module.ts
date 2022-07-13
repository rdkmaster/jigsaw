import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/public_api";
import {ButtonIconComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";


@NgModule({
    declarations: [ButtonIconComponent],
    exports: [ ButtonIconComponent ],
    imports: [JigsawButtonModule, DemoTemplateModule]
})
export class ButtonIconDemoModule {

}
