import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawLoadingModule, LoadingService, PopupService, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BubbleLoadingDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BubbleLoadingDemoComponent],
    exports: [BubbleLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule],
    providers: [PopupService, LoadingService]
})
export class BubbleLoadingDemoModule {

}
