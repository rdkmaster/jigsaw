import {NgModule} from '@angular/core';
import {
    JigsawDateTimePickerModule,
    JigsawFloatModule,
    JigsawRangeDateTimePickerModule,
    JigsawTimePickerModule
} from "jigsaw/public_api";
import {WithFloatDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        JigsawDateTimePickerModule, JigsawDemoDescriptionModule, JigsawFloatModule, JigsawTimePickerModule,
        JigsawRangeDateTimePickerModule, DemoTemplateModule
    ],
    declarations: [WithFloatDemoComponent],
    exports: [WithFloatDemoComponent]
})
export class WithFloatDemoModule {
}
