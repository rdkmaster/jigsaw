import {NgModule} from "@angular/core";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {LoadingService} from "jigsaw/service/loading.service";
import {PopupService} from "jigsaw/service/popup.service";
import {SoftBankLoadingDemoComponent} from "./app.component";
import {SoftBankLoading} from "./softBankLoading/softBankLoading";
@NgModule({
    declarations: [SoftBankLoadingDemoComponent,SoftBankLoading],
    bootstrap: [SoftBankLoadingDemoComponent],
    imports: [JigsawLoadingModule],
    providers: [PopupService,LoadingService],
    entryComponents:[SoftBankLoading]
})
export class SoftBankLoadingDemoModule{

}
