import { NgModule } from '@angular/core';
import { JigsawTreeExtModule, JigsawInputModule } from "jigsaw/public_api";
import { IntroComponent } from './demo.component';
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule, JigsawInputModule],
    declarations: [IntroComponent],
    exports: [IntroComponent]
})
export class IntroDemoModule {
}
