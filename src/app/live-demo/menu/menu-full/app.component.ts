import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import { NgTemplateOutlet } from '@angular/common';
import {Router, RouterModule} from '@angular/router';

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class MenuFullDemoComponent {
    data = [
        {
            label: 'Navigation1',
            icon: 'user',
            children: [{
                label: 'Option1',
                children: [{
                    label: 'Third',
                    link: '/button/button-full'
                }]
            }, {
                label: 'Option2'
            }, {
                label: 'Option3',
                link: '#'
            }, {
                label: 'Option4',
                children: [{
                    label: 'Third',
                    link: '#'
                }]
            }]
        },
        {
            label: 'Navigation2',
            icon: 'user',
            children: [{
                label: 'Option1',
                children: [{
                    label: 'Third'
                }]
            }, {
                label: 'Option2'
            }, {
                label: 'Option3'
            }, {
                label: 'Option4',
                children: [{
                    label: 'Third'
                }]
            }]
        },
        {
            label: 'Navigation3',
            icon: 'user',
            link: '#'
        },
        {
            label: 'Navigation4',
            icon: 'user',
            link: '#'
        }
    ];
}
