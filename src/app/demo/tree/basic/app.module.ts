import { NgModule } from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/component/tree/tree-ext";
import { ZtreeDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTreeExtModule ],
    declarations: [ ZtreeDemoComponent ],
    bootstrap: [ ZtreeDemoComponent ]
})
export class TreeBasicDemoModule {}
