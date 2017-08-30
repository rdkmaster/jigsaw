import { NgModule } from '@angular/core';
import { JigsawTabsModule } from "jigsaw/component/tabs/index";
import { JigsawButtonModule } from "jigsaw/component/button/button";
import { JigsawDestoryTabComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTabsModule, JigsawButtonModule ],
    declarations: [ JigsawDestoryTabComponent ],
    bootstrap: [ JigsawDestoryTabComponent ]
})
export class TabsDestroyDemoModule {}
