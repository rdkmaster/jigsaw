import { NgModule } from '@angular/core';
import { JigsawTabsModule } from "jigsaw/component/tabs/index";
import { JigsawButtonModule } from "jigsaw/component/button/button";
import { JigsawHideTabComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTabsModule, JigsawButtonModule ],
    declarations: [ JigsawHideTabComponent ],
    bootstrap: [ JigsawHideTabComponent ]
})
export class TabsHideTabDemoModule {}
