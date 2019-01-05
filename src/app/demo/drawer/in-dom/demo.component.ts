import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerInDomDemoComponent {
    selectedPosition = 'left';
    width: string;
    height: string;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '将抽屉直接放到文档流中，可以实现抽屉拉开始，将旁边的视图挤开';
    description: string = '';
}
