import {NgModule} from '@angular/core';
import {JigsawTagModule, JigsawButtonModule, JigsawHeaderModule} from "jigsaw/public_api";
import {TagWithIconDemoComponent} from './demo.component';


@NgModule({
    imports: [JigsawTagModule,  JigsawButtonModule, JigsawHeaderModule],
    declarations: [TagWithIconDemoComponent],
    exports: [TagWithIconDemoComponent]
})
export class TagWithIconDemoModule {
}
