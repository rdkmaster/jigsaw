import {NgModule} from "@angular/core";
import {JigsawMobileButtonModule, JigsawMobileDialogModule, JigsawMobileInputModule, PopupService} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DialogTopDemo} from "./demo.component";

@NgModule({
    declarations: [DialogTopDemo],
    exports: [DialogTopDemo],
    imports: [JigsawMobileDialogModule, JigsawMobileButtonModule, JigsawMobileInputModule, JigsawDemoDescriptionModule],
    providers: [PopupService]
})
export class DialogTopDemoModule {

}
