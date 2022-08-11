import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule, JigsawMobileDialogModule, PopupService} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DialogTitleDemo} from "./demo.component";

@NgModule({
    declarations: [DialogTitleDemo],
    exports: [DialogTitleDemo],
    imports: [JigsawMobileDialogModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule],
    providers: [PopupService],
})
export class DialogTitleDemoModule {

}
