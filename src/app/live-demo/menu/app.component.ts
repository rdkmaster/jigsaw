import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class MenuFullComponent implements OnInit {
    titles = [
        {
            title: 'Settings',
            extraLabel: 'Ctrl+Alt+A',
            icon: 'fa fa-address-book',
            subMenu: false
        },
        {
            title: 'Print',
            extraLabel: '',
            icon: 'fa fa-address-book',
            subMenu: true
        },
        {
            title: 'Save All',
            extraLabel: 'Ctrl+S',
            icon: 'fa fa-address-book',
            subMenu: false
        },
        {
            title: 'Exit',
            extraLabel: '',
            icon: 'fa fa-address-book',
            subMenu: true
        }
    ];

    constructor() {
    }

    ngOnInit() {
    }
}
