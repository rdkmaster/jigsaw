import {NgModule} from '@angular/core';
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawTabModule} from "jigsaw/component/tabs/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawShowTabComponent} from './app.component';

@NgModule({
    imports: [JigsawTabModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [JigsawShowTabComponent],
    bootstrap: [JigsawShowTabComponent]
})
export class TabsShowTabDemoModule {
}
