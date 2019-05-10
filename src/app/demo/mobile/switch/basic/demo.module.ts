import {NgModule} from '@angular/core';
import {JigsawMobileSwitchModule} from "jigsaw/mobile-components/switch/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SwitchBasicDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawMobileSwitchModule, JigsawDemoDescriptionModule],
    declarations: [SwitchBasicDemoComponent],
    exports: [SwitchBasicDemoComponent]
})
export class SwitchBasicDemoModule {
}
