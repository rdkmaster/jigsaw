import { Component } from '@angular/core';
import { UserComponent } from "./user-component/user-component";
import { FloatTextService } from "../doc.service";

@Component({
    selector: 'float-init-data',
    templateUrl: './demo.component.html'
})
export class FloatInitDataDemoComponent {
    public target: any = UserComponent;
    public initData: any = {
        inputData: 'some data...'
    };

    constructor(public doc: FloatTextService) {
    }
}
