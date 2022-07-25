import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ButtonBarThemeDemoComponent} from './theme/demo.component';
import {ButtonBarThemeDemoModule} from './theme/demo.module';
import {ButtonBarSizeDemoComponent} from "./size/demo.component";
import {ButtonBarSizeDemoModule} from "./size/demo.module";
import {ButtonBarAllComponent} from "./all/demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {ButtonBarBasicDemoModule} from "./basic/demo.module";
import {ButtonBarBlueBackgroundDemoModule} from "./blue/demo.module";
import {ButtonBarSetHeightDemoModule} from "./set-height/demo.module";

export const routerConfig = [
    {
        path: 'all', component: ButtonBarAllComponent
    },
    {
        path: 'theme', component: ButtonBarThemeDemoComponent
    },
    {
        path: 'size', component: ButtonBarSizeDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ButtonBarThemeDemoModule,
        ButtonBarSizeDemoModule,
        JigsawMarkdownModule,
        ButtonBarBasicDemoModule,
        ButtonBarBlueBackgroundDemoModule,
        ButtonBarSetHeightDemoModule
    ],
    declarations: [ButtonBarAllComponent]
})
export class ButtonBarDemoModule {
}
