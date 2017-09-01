import {Component} from "@angular/core";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class ListBasicDemoComponent{
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

    goodsList = [
        {
            logo: 'bicycle',
            desc: 'A bicycle, also called a cycle or bike, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.'
        },
        {
            logo: 'camera',
            desc: 'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both.'
        },
        {
            logo: 'car',
            desc: 'A car (or automobile) is a wheeled motor vehicle used for transportation.'
        },
        {
            logo: 'futbol-o',
            desc: 'Football is a family of team sports that involve, to varying degrees, kicking a ball with the foot to score a goal. '
        },
    ]
}
