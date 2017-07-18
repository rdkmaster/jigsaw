import {NgModule} from "@angular/core";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {LoadingService} from "jigsaw/service/loading.service";
import {PopupService} from "jigsaw/service/popup.service";
import {DefinedLoadingDemoComponent} from "./app.component";
import {DefinedLoading} from "./definedLoading/definedLoading";
@NgModule({
    declarations: [DefinedLoadingDemoComponent,DefinedLoading],
    imports: [JigsawLoadingModule],
    providers: [PopupService,LoadingService],
    entryComponents:[DefinedLoading]
})
export class DefinedLoadingDemoModule{

}
