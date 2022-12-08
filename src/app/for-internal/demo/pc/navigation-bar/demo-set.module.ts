import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawNavigationBarBasicDemoModule } from "./basic/demo.module";
import { JigsawNavigationBarBasicDemoComponent} from "./basic/demo.component";

export const routerConfig = [
    { path: "basic", component: JigsawNavigationBarBasicDemoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig), JigsawNavigationBarBasicDemoModule]
})
export class NavigationBarDemoModule {}
