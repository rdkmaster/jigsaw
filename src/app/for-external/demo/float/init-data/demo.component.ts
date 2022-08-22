import {Component} from '@angular/core';
import {UserComponent} from "./user-component/user-component";
import {FloatTextService} from "../doc.service";

@Component({
    selector: 'float-init-data',
    templateUrl: './demo.component.html',
    styles: [`
        .iconfont-e9d8 {
            margin: 100px
        }
    `]
})
export class FloatInitDataDemoComponent {
    public target: any = UserComponent;
    public initData: any = {
        inputData: 'some data...'
    };
constructor( public doc: FloatTextService) {
}
}
