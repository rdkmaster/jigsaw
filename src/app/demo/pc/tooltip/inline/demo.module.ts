import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawTooltipModule, JigsawInputModule, PopupService} from "jigsaw/public_api";
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
