import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class MenuFullComponent implements OnInit {
    titles = [
        {
            label: 'Settings',
            extraLabel: 'Ctrl+Alt+A',
            icon: 'fa fa-address-book',
        },
        {
            label: 'Print',
            extraLabel: '',
            icon: 'fa fa-address-book',
            items: [
                {
                    label: 'Settings',
                    extraLabel: 'Ctrl+Alt+A',
                    icon: 'fa fa-address-book'
                },
                {
                    label: 'Print',
                    extraLabel: '',
                    icon: 'fa fa-address-book'
                },
                {
                    label: 'Save All',
                    extraLabel: 'Ctrl+S',
                    icon: 'fa fa-address-book'
                },
                {
                    label: 'Exit',
                    extraLabel: '',
                    icon: 'fa fa-address-book',
                    items: [
                        {
                            label: 'Settings',
                            extraLabel: 'Ctrl+Alt+A',
                            icon: 'fa fa-address-book'
                        },
                        {
                            label: 'Print',
                            extraLabel: '',
                            icon: 'fa fa-address-book'
                        },
                        {
                            label: 'Save All',
                            extraLabel: 'Ctrl+S',
                            icon: 'fa fa-address-book'
                        },
                        {
                            label: 'Exit',
                            extraLabel: '',
                            icon: 'fa fa-address-book'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Save All',
            extraLabel: 'Ctrl+S',
            icon: 'fa fa-address-book'
        },
        {
            label: 'Exit',
            extraLabel: '',
            icon: 'fa fa-address-book'
        }
    ];

    constructor() {
    }

    ngOnInit() {
    }
}
