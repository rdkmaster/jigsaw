import { NgModule } from "@angular/core";
import { JigsawButtonModule, PopupService, JigsawHeaderModule, JigsawToastModule, JigsawInputModule, JigsawSliderModule } from "jigsaw/public_api";
import { ExampleBasicDemoComponent } from '../example/basic/demo.component';
import { DemoTemplateModule } from '../../../demo/demo-template/demo-template';
import { ExampleDemoComponent } from './demo.component';
import { ExampleSettingDemoComponent } from './setting/demo.component';
import { JigsawMarkdownModule } from '../../../markdown/markdown';

@NgModule({
    declarations: [ExampleBasicDemoComponent, ExampleSettingDemoComponent, ExampleDemoComponent],
    imports: [
        JigsawToastModule, JigsawButtonModule, JigsawHeaderModule, DemoTemplateModule, JigsawMarkdownModule, JigsawInputModule, JigsawSliderModule
    ],
    providers: [PopupService],
    exports: [ExampleDemoComponent]
})
export class ExampleDemoModule {
}