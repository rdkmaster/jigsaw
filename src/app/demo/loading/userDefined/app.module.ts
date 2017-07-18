import {NgModule} from "@angular/core";
import {DefinedLoadingDemoComponent} from "./app.component";
import {JigsawLoadingModule} from "../../../../jigsaw/component/loading/loading";
import {DefinedLoading} from "./definedLoading/definedLoading";
import {LoadingService} from "../../../../jigsaw/service/loading.service";
import {PopupService} from "../../../../jigsaw/service/popup.service";
@NgModule({
    declarations: [DefinedLoadingDemoComponent,DefinedLoading],
    imports: [JigsawLoadingModule],
    providers: [PopupService,LoadingService],
    entryComponents:[DefinedLoading]
})
export class DefinedLoadingDemoModule{

}
