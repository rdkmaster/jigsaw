import { Component } from '@angular/core';
import { UserComponent } from "./user-component/user-component";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'float-init-data',
    templateUrl: './demo.component.html'
})
export class FloatInitDataDemoComponent extends AsyncDescription {
    public demoPath = "demo/float/init-data";

    public target: any = UserComponent;
    public initData: any = {
        inputData: 'some data...'
    };
}
