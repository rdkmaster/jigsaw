import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawDialogModule, PopupService} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogTitleDemo} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [DialogTitleDemo],
    exports: [DialogTitleDemo],
    imports: [JigsawDialogModule, JigsawButtonModule, JigsawDemoDescriptionModule, DemoTemplateModule],
    providers: [PopupService],
})
export class DialogTitleDemoModule {

}
