import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {PopupService} from "jigsaw/service/popup.service";
import {PopupTracingEventComponent} from "./app.component";
@NgModule({
    declarations: [PopupTracingEventComponent],
    imports: [JigsawDialogModule,JigsawButtonModule,CommonModule],
    providers: [PopupService]
})
export class PopupTracingEventModule{

}
