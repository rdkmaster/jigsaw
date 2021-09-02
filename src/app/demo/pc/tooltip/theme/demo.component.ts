import { Component, AfterContentInit } from "@angular/core";
import { ArrayCollection } from 'jigsaw/public_api';

@Component({
    templateUrl: './demo.component.html'
})
export class TooltipThemeDemoComponent implements AfterContentInit {
    themeList = new ArrayCollection(['light', 'dark'])

    selectedTheme: any[];

    ngAfterContentInit() {
        this.selectedTheme = ['light']
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '此demo展示了tooltip内置的明、暗样式';
    description: string = '';
}
