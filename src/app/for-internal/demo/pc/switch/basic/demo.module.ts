import {NgModule} from '@angular/core';
import {JigsawSwitchModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {SwitchBasicDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawSwitchModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [SwitchBasicDemoComponent],
    exports: [SwitchBasicDemoComponent]
})
export class SwitchBasicDemoModule {
}
