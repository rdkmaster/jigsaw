import {Component} from "@angular/core";
import {GroupOptionValue} from "jigsaw/pc-components/list-and-tile/group-common";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class ListLiteLineEllipsisDemoComponent {
    goodsList: GroupOptionValue[] = [
        {
            logo: 'bicycle',
            name: 'bicycle',
            desc: 'A bicycle, also called a cycle or bike, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.'
        },
        {
            logo: 'camera',
            name: 'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both.',
            desc: 'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both.'
        },
        {
            logo: 'car',
            name: 'car',
            desc: 'A car (or automobile) is a wheeled motor vehicle used for transportation.',
        },
        {
            logo: 'futbol-o',
            name: 'Football is a family of team sports that involve, to varying degrees, kicking a ball with the foot to score a goal. ',
            desc: 'Football is a family of team sports that involve, to varying degrees, kicking a ball with the foot to score a goal. '
        },
        {
            logo: 'book',
            name: 'A book is a set of sheets of paper, parchment, or similar materials that are fastened together to hinge at one side.',
            desc: 'A book is a set of sheets of paper, parchment, or similar materials that are fastened together to hinge at one side.'
        },
        {
            logo: 'puzzle-piece',
            name: 'puzzle-piece',
            desc: 'A puzzle is a game, problem, or toy that tests a person\'s ingenuity or knowledge.'
        },
    ];

    selectedItems: any[];

    selectedItemsStr: string;

    handleSelect(selectedItems) {
        this.selectedItemsStr = selectedItems.map(item => item.name).toString()
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawList'
    ];
}
