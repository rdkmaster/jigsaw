import {Component} from "@angular/core";
import {InternalUtils, JigsawThemeService} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styles:[`
        .jigsaw-header-host:not(:first-of-type) {
            margin-top: 20px;
        }
    `]
})
export class ChartIconButtonDemoComponent {
    public disabled: boolean = false;
    public colors: string[] = this._themeService.getGraphTheme().color;
    public longData = [5, 3, 9, 6, 5, 9, 7, 3, 5, 2, 9, 7, 7, 3, 5, 2, 3, 5, 2];
    public shortData = [5, 3, 9, 6];
    public fill = '#ebca0f';
    public stroke = '#2b8ae3';
    private _interval;

    onDisabled(disabled: boolean) {
        if (disabled) {
            clearInterval(this._interval);
            this.colors = ['#ddd'];
            this.fill = '#ddd';
            this.stroke = '#eee';
        } else {
            this._startUpdating();
            this.colors = this._themeService.getGraphTheme().color;
            this.fill = '#ebca0f';
            this.stroke = '#2b8ae3';
        }
    }

    private _startUpdating() {
        this._interval = setInterval(() => {
            this.longData.push(InternalUtils.randomNumber(0, 10));
            this.longData = this.longData.slice(1);
            this.shortData = this.shortData.map(_ => InternalUtils.randomNumber(0, 10));
        }, 1000);
    }

    constructor(private _themeService: JigsawThemeService) {
        this._startUpdating();
    }



    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '展示了按钮与chart-icon组合使用的各种使用场景。';
    description: string = '';
}
