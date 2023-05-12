import {Component, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {InternalUtils, JigsawThemeService} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'chart-icon-with-button',
    templateUrl: './demo.component.html',
})
export class ChartIconButtonDemoComponent extends AsyncDescription {
    public demoPath = "demo/chart-icon/with-button";

    public disabled: boolean = false;
    public colors: string[] = this._themeService.getGraphTheme().color;
    public longData = [5, 3, 9, 6, 5, 9, 7, 3, 5, 2, 9, 7, 7, 3, 5, 2, 3, 5, 2];
    public shortData = [5, 3, 9, 6];
    public fill = '#ebca0f';
    public stroke = '#2b8ae3';
    private _interval;

    public onDisabled(disabled: boolean) {
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

    constructor(http: HttpClient, el: ElementRef, private _themeService: JigsawThemeService) {
        super(http, el);
        this._startUpdating();
    }
}
