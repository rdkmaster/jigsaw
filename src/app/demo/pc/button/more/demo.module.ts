import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/public_api";
import {ButtonMoreComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../../markdown/markdown";
import {DemoTemplateModule} from "../../../demo-template/demo-template";


@NgModule({
    declarations: [ButtonMoreComponent],
    exports: [ ButtonMoreComponent ],
    imports: [JigsawButtonModule, DemoTemplateModule]
})
export class ButtonMoreDemoModule {

}
