import {NgModule} from "@angular/core";
import {LoadingBasicDemoComponent} from "./app.component";
import {JigsawLoadingModule} from "../../../../jigsaw/component/loading/loading";
import {JigsawInputModule} from "../../../../jigsaw/component/input/input";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
import {LoadingService} from "../../../../jigsaw/service/loading.service";
import {PopupService} from "../../../../jigsaw/service/popup.service";
@NgModule({
    declarations: [LoadingBasicDemoComponent],
    imports: [JigsawLoadingModule,JigsawInputModule,JigsawButtonModule],
    providers: [PopupService,LoadingService]
})
export class LoadingBasicDemoModule{

}
