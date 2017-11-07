import {NgModule} from "@angular/core";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {LoadingService} from "jigsaw/service/loading.service";
import {PopupService} from "jigsaw/service/popup.service";
import {FontLoadingDemoComponent} from "./app.component";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [FontLoadingDemoComponent],
    bootstrap: [FontLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawButtonModule, CommonModule],
    providers: [PopupService,LoadingService]
})
export class FontLoadingDemoModule{

}
