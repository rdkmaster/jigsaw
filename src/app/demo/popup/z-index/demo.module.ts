import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {PopupZIndexDemoComponent} from "./demo.component";
import {JigsawTimeModule} from "jigsaw/component/time/index";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {LoadingService} from "jigsaw/service/loading.service";

@NgModule({
    declarations: [PopupZIndexDemoComponent],
    exports: [PopupZIndexDemoComponent],
    imports: [JigsawTimeModule, JigsawRangeTimeModule, JigsawComboSelectModule,JigsawDialogModule,
        JigsawLoadingModule,JigsawButtonModule, JigsawDemoDescriptionModule],
    providers: [LoadingService]
})
export class PopupZIndexDemoModule{

}
