import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BoxHiddenDemoComponent {
    showBox = true;
    showBox1 = true;
    showBox2 = false;
    showList = true;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了在box上使用ngIf和NgFor';
    description: string = `
         hidden用于控制box的dom节点的显示隐藏。
         如果此box是resizeable box的子box，并且resizeable box有多于两个子box，隐藏后resize功能会出现问题，
         这种情况请使用ngIf控制box的显示隐藏。
    `;
}
