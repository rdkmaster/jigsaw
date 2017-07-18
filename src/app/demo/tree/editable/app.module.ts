import { NgModule } from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/component/tree/tree-ext";
import { ZtreeDemoEditableComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTreeExtModule ],
    declarations: [ ZtreeDemoEditableComponent ],
    bootstrap: [ ZtreeDemoEditableComponent ]
})
export class TreeEditableDemoModule {}
