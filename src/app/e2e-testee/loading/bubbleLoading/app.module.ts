import {NgModule} from "@angular/core";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {LoadingService} from "jigsaw/service/loading.service";
import {PopupService} from "jigsaw/service/popup.service";
import {BubbleLoadingDemoComponent} from "./app.component";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [BubbleLoadingDemoComponent],
    bootstrap: [BubbleLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawButtonModule, CommonModule],
    providers: [PopupService,LoadingService]
})
export class BubbleLoadingDemoModule{

}
