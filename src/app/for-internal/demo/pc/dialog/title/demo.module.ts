import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawDialogModule, PopupService} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DialogTitleDemo} from "./demo.component";

@NgModule({
    declarations: [DialogTitleDemo],
    exports: [DialogTitleDemo],
    imports: [JigsawDialogModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    providers: [PopupService],
})
export class DialogTitleDemoModule {

}
