import {NgModule} from "@angular/core";
import {PopupTracingEventComponent} from "./app.component";
import {JigsawDialogModule} from "../../../../jigsaw/component/dialog/dialog";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
import {PopupService} from "../../../../jigsaw/service/popup.service";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [PopupTracingEventComponent],
    imports: [JigsawDialogModule,JigsawButtonModule,CommonModule],
    providers: [PopupService]
})
export class PopupTracingEventModule{

}
