import {NgModule} from '@angular/core';
import {JigsawButtonBarModule, JigsawHeaderModule} from "jigsaw/public_api";
import {ButtonBarSizeDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawButtonBarModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [ButtonBarSizeDemoComponent],
    exports: [ButtonBarSizeDemoComponent]
})
export class ButtonBarSizeDemoModule {
}
