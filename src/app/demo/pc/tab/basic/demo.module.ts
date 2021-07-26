import {NgModule} from '@angular/core';
import {
    JigsawTabsModule, JigsawProgressModule, JigsawInputModule, JigsawTableModule,
    JigsawGraphModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawTabsDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawTabsModule, JigsawProgressModule, JigsawInputModule, JigsawTableModule,
        JigsawDemoDescriptionModule, JigsawGraphModule
    ],
    declarations: [JigsawTabsDemoComponent],
    exports: [JigsawTabsDemoComponent]
})
export class TabsBasicDemoModule {
}
