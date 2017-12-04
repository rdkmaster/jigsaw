import {NgModule} from '@angular/core';
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SelectBasicDemoComponent} from './app.component';

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule],
    declarations: [SelectBasicDemoComponent],
    exports: [SelectBasicDemoComponent]
})
export class SelectBasicDemoModule {
}
