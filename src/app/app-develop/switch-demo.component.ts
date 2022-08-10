import {Component} from "@angular/core";

@Component({
    template: `
        <div>
            <p>Jigsaw组件演示，请选择对应的终端</p>
            <a [routerLink]="['/pc']" title="桌面版"><span class="iconfont iconfont-e17d"></span></a>
            <a [routerLink]="['/mobile']" title="移动版（Beta）"><span class="iconfont iconfont-e2fe"></span></a>
        </div>
    `,
    styles: [`
        a {
            width: 160px;
            height: 160px;
            border: 1px solid var(--border-color-default);
            border-radius: 5px;
            display: inline-block;
            text-align: center;
            line-height: 150px;
            font-size: 50px;
            margin: 16px;
            background-color: var(--bg-disabled);
            box-shadow: var(--box-shadow-lv1);
        }

        a .iconfont {
            color: var(--brand-default);
        }

        a:hover .iconfont {
            color: var(--brand-hover);
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
