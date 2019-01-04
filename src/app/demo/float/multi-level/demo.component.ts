import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
               .menu{
                     margin:100px;
                     border:1px solid #999;
                     padding: 2px 10px;
                     border-radius: 3px;
               }
                ul {
                    width: 100px;
                    line-height: 20px;
                    border-radius: 6px;
                    text-indent: 10px;
                }
                ul li:hover{
                    background:#999;
                    color:#fff;
                }
    `]
})
export class FloatMultiLevelDemo {
    titles = [
        {
            title: 'Settings',
            subTitle: 'Ctrl+Alt+A'
        },
        {
            title: 'Print',
            subTitle: ''
        },
        {
            title: 'Save All',
            subTitle: 'Ctrl+S'
        },
        {
            title: 'Exit',
            subTitle: ''
        }
    ];
    selectedItems: string;
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-float指令实现多级弹出，当弹出一个区域后，弹出区域再次弹出新的区域';
    description: string = '';
}
