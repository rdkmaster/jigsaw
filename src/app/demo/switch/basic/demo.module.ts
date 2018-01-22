import {NgModule} from '@angular/core';
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SwitchBasicDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawSwitchModule, JigsawDemoDescriptionModule],
    declarations: [SwitchBasicDemoComponent],
    exports: [SwitchBasicDemoComponent]
})
export class SwitchBasicDemoModule {
}
