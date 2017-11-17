import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuData} from "../../../jigsaw/component/menu/menu.typings";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class MenuFullComponent implements OnInit {
    @ViewChild('jMenu')jMenu:any;
    selectedItem = [];

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
            children: [
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
                    children: [
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
            icon: 'fa fa-address-book',
            children: [
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
    ];

    constructor() {
    }

    ngOnInit() {
        this.jMenu.show(this.titles);
    }

    selectChange(selected: MenuData) {
        this.selectedItem.push(selected.map(selected => selected.label).toString());
    }
}
