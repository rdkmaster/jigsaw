import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class MenuFullComponent implements OnInit {
    titles = [
        {
            title: 'Settings',
            subTitle: 'Ctrl+Alt+A',
            subMenu: false
        },
        {
            title: 'Print',
            subTitle: '',
            subMenu: true
        },
        {
            title: 'Save All',
            subTitle: 'Ctrl+S',
            subMenu: false
        },
        {
            title: 'Exit',
            subTitle: '',
            subMenu: true
        }
    ];

    constructor() {
    }

    ngOnInit() {
    }
}
