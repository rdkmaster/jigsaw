import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import { SwitchSizeDemoComponent } from './size/demo.component';
import { SwitchSizeDemoModule } from './size/demo.module';
import {SwitchAllComponent} from "./demo.component";
import {SwitchBasicDemoModule} from "./basic/demo.module";
import {JigsawMarkdownModule} from "../../../markdown/markdown";

export const routerConfig = [
    {
        path: 'all', component: SwitchAllComponent
    },
    {
        path: 'size', component: SwitchSizeDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        SwitchSizeDemoModule,
        SwitchBasicDemoModule,
        JigsawMarkdownModule
    ],
    declarations: [SwitchAllComponent]
})
export class SwitchDemoModule { }
