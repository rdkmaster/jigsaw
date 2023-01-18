import { NgModule } from '@angular/core';
import { JigsawUploadFallbackModule } from "jigsaw/public_api";
import { UploadFallbackDemoComponent } from './demo.component';
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawDemoDescriptionModule, JigsawUploadFallbackModule],
    declarations: [UploadFallbackDemoComponent],
    exports: [UploadFallbackDemoComponent]
})
export class UploadFallbackDemoModule {
}
