import {NgModule} from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/public_api";
import {ZtreeSelectDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule, CommonModule],
    declarations: [ZtreeSelectDemoComponent],
    exports: [ZtreeSelectDemoComponent]
})
export class ZtreeSelectDemoModule {
}
