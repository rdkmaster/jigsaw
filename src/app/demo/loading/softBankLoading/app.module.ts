import {NgModule} from "@angular/core";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {LoadingService} from "jigsaw/service/loading.service";
import {PopupService} from "jigsaw/service/popup.service";
import {SoftBankLoadingDemoComponent} from "./app.component";
import {SoftBankLoading} from "./softBankLoading/softBankLoading";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
import {JigsawInputModule} from "../../../../jigsaw/component/input/input";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [SoftBankLoadingDemoComponent,SoftBankLoading],
    bootstrap: [SoftBankLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawButtonModule, JigsawInputModule, CommonModule],
    providers: [PopupService,LoadingService],
    entryComponents:[SoftBankLoading]
})
export class SoftBankLoadingDemoModule{

}
