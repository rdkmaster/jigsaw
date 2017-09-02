import { NgModule } from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/component/tree/tree-ext";
import { ZtreeAsynDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTreeExtModule ],
    declarations: [ ZtreeAsynDemoComponent ],
    bootstrap: [ ZtreeAsynDemoComponent ]
})
export class TreeAsyncDemoModule {}
