import {NgModule} from '@angular/core';
import {ButtonBarBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawButtonBarModule} from "jigsaw/component/list-and-tile/button-bar";

@NgModule({
    imports: [JigsawButtonBarModule, JigsawDemoDescriptionModule],
    declarations: [ButtonBarBasicDemoComponent],
    exports: [ButtonBarBasicDemoComponent]
})
export class ButtonBarBasicDemoModule {
}
