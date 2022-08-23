import { Component } from "@angular/core";
import { GroupOptionValue } from "jigsaw/public_api";
import { ListLiteTextService } from "../doc.service";

@Component({
    selector: 'list-lite-line-ellipsis',
    templateUrl: './demo.component.html'
})
export class ListLiteLineEllipsisDemoComponent {
    public selectedItems: any[];
    public goodsList: GroupOptionValue[] = [
        {
            icon: 'iconfont iconfont-e187',
            name: 'bicycle',
            desc: 'A bicycle, also called a cycle or bike, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.'
        },
        {
            icon: 'iconfont iconfont-e2e7',
            name: 'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both.',
            desc: 'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both.'
        },
        {
            icon: 'iconfont iconfont-e18a',
            name: 'car',
            desc: 'A car (or automobile) is a wheeled motor vehicle used for transportation.',
        },
        {
            icon: 'iconfont iconfont-e534',
            name: 'Football is a family of team sports that involve, to varying degrees, kicking a ball with the foot to score a goal. ',
            desc: 'Football is a family of team sports that involve, to varying degrees, kicking a ball with the foot to score a goal. '
        },
        {
            icon: 'iconfont iconfont-e565',
            name: 'A book is a set of sheets of paper, parchment, or similar materials that are fastened together to hinge at one side.',
            desc: 'A book is a set of sheets of paper, parchment, or similar materials that are fastened together to hinge at one side.'
        },
        {
            icon: 'iconfont iconfont-e6ca',
            name: 'puzzle-piece',
            desc: 'A puzzle is a game, problem, or toy that tests a person\'s ingenuity or knowledge.'
        },
    ];

    constructor(public doc: ListLiteTextService) {
    }
}
