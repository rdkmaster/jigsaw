import {Component} from "@angular/core";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class BoxLayoutScrollDemoComponent {

    arr1 = new Array(20);

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO演示了在内容溢出后，j-box在滚动条方面的行为，以及如何添加自定义滚动条';
    description: string = '';
}


