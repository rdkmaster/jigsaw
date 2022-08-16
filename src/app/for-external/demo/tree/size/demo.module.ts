import {NgModule} from '@angular/core';
import {JigsawTreeExtModule, JigsawHeaderModule} from "jigsaw/public_api";
import {ZtreeSizeComponent} from './demo.component';


@NgModule({
    imports: [JigsawTreeExtModule,  JigsawHeaderModule],
    declarations: [ZtreeSizeComponent],
    exports: [ZtreeSizeComponent]
})
export class TreeSizeDemoModule {
}