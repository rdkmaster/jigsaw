import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawIndexBasicDemoModule } from "./basic/demo.module";
import { JigsawIndexBasicDemoComponent } from "./basic/demo.component";
import { JigsawAlphabeticalIndexSelectDemoComponent } from './select-mode/demo.component';
import { JigsawAlphabeticalIndexSelectDemoModule } from './select-mode/demo.module';

export const routerConfig = [
    { path: "basic", component: JigsawIndexBasicDemoComponent },
    { path: "select-mode", component: JigsawAlphabeticalIndexSelectDemoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig), JigsawIndexBasicDemoModule, JigsawAlphabeticalIndexSelectDemoModule]
})
export class IndexDemoModule { }
