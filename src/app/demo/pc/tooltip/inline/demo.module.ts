import {NgModule} from '@angular/core';
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawTooltipModule} from "jigsaw/pc-components/tooltip/tooltip";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {PopupService} from "jigsaw/common/service/popup.service";
import {SimpleTooltipDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawInputModule, JigsawTooltipModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [SimpleTooltipDemoComponent],
    exports: [SimpleTooltipDemoComponent],
    providers: [PopupService]
})
export class SimpleTooltipDemoModule {
}
