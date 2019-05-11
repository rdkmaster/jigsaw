import {Component} from "@angular/core";

@Component({
    template: `
        <div>
            <div>
            请点击下面的链接，选择要查看pc端还是移动端的demo
            </div>
            <div>
                <a [routerLink]="['/pc']" title="进入pc版本的demo列表">pc</a><a title="进入移动端版本的demo列表" [routerLink]="['/mobile']">mobile</a>
            </div>
        </div>
    `,
    styles: [`
        a {
            margin-right: 12px;
        }

        div {
            margin-bottom: 12px;
        }
    `]
})
export class SwitchDemoComponent {
}
