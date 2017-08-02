import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {LoadingService} from "jigsaw/service/loading.service";
import {PopupService} from "jigsaw/service/popup.service";
import {LoadingFullDemoComponent} from "./app.component";

@NgModule({
    declarations: [LoadingFullDemoComponent],
    bootstrap: [LoadingFullDemoComponent],
    imports: [JigsawLoadingModule,JigsawInputModule,JigsawButtonModule,CommonModule],
    providers: [PopupService,LoadingService]
})
export class LoadingFullDemoModule{

}
