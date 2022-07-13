import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawLoadingModule} from "jigsaw/public_api";
import {ButtonLoadingComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../../markdown/markdown";
import {DemoTemplateModule} from "../../../demo-template/demo-template";


@NgModule({
    declarations: [ButtonLoadingComponent],
    exports: [ ButtonLoadingComponent ],
    imports: [JigsawButtonModule, JigsawLoadingModule, DemoTemplateModule]
})
export class ButtonLoadingDemoModule {

}
