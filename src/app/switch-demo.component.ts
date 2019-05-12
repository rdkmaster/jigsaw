import {Component} from "@angular/core";

@Component({
    template: `
        <div>
            <p>Jigsaw组件演示，请选择对应的终端</p>
            <a [routerLink]="['/pc']" title="桌面版"><span class="fa fa-desktop"></span></a>
            <a [routerLink]="['/mobile']" title="移动版"><span class="fa fa-mobile"></span></a>
        </div>
    `,
    styles: [`
        a {
            width: 160px;
            height: 160px;
            border: 1px solid #aaa;
            border-radius: 4px;
            display: inline-block;
            text-align: center;
            line-height: 150px;
            font-size: 50px;
            margin: 16px;
            background-color: #ddd;
            box-shadow: 2px 2px 5px #ccc;
        }
        
        div {
            text-align: center;
            margin-top: 160px;
        }

        p {
            font-size: 16px;
            margin-bottom: 32px;
        }
    `]
})
export class SwitchDemoComponent {
}
