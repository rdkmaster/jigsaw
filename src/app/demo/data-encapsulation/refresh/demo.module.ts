import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawTooltipModule} from "jigsaw/pc-components/tooltip/tooltip";
import {PopupService} from "jigsaw/common/service/popup.service";
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
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
