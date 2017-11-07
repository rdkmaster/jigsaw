import {Component} from '@angular/core';
import {DemoBase} from "app/demo-description/demo-base";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class ComboSelectSetWidthDemo extends DemoBase {
    width: string = '200';
    width2: string = '400';
}
