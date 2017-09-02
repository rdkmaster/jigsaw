import { NgModule } from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/component/tree/tree-ext";
import { ZtreeDemoDataFromAjaxComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTreeExtModule ],
    declarations: [ ZtreeDemoDataFromAjaxComponent ],
    bootstrap: [ ZtreeDemoDataFromAjaxComponent ]
})
export class TreeAjaxDataDemoModule {}
