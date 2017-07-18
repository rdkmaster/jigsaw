import {NgModule} from "@angular/core";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {LoadingService} from "jigsaw/service/loading.service";
import {PopupService} from "jigsaw/service/popup.service";
import {BallLoadingDemoComponent} from "./app.component";
@NgModule({
    declarations: [BallLoadingDemoComponent],
    imports: [JigsawLoadingModule],
    providers: [PopupService,LoadingService]
})
export class BallLoadingDemoModule{

}
