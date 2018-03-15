import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawTooltipModule} from "jigsaw/component/tooltip/tooltip";
import {PopupService} from "jigsaw/service/popup.service";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {RefreshDemoComponent} from "./demo.component";

@NgModule({
    declarations: [RefreshDemoComponent],
    exports: [ RefreshDemoComponent ],
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawButtonModule, JigsawTooltipModule,
        JigsawTableModule
    ],
    providers: [PopupService]
})
export class RefreshDemoModule{

}
