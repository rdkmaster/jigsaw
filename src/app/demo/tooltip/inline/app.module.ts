import {NgModule} from '@angular/core';
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawTooltipModule} from "jigsaw/component/tooltip/tooltip";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {PopupService} from "jigsaw/service/popup.service";
import {SimpleTooltipDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawInputModule, JigsawTooltipModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [SimpleTooltipDemoComponent],
    exports: [SimpleTooltipDemoComponent],
    providers: [PopupService]
})
export class SimpleTooltipDemoModule {
}
