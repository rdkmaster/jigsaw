import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerBasicDemoComponent {
    positions = [
        {label: 'left'},
        {label: 'top'},
        {label: 'right'},
        {label: 'bottom'},
    ];

    selectedPosition = this.positions[0];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawDrawer'
    ];
}

