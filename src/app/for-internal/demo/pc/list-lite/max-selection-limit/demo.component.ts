import { Component } from "@angular/core";
import { GroupOptionValue, JigsawListLite } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class ListLiteMaxSelectionLimitDemoComponent {
    public maxSelectionLimit = 2;

    public data: GroupOptionValue[] = [
        {
            icon: 'iconfont iconfont-e187',
            name: 'bicycle',
            desc: 'A bicycle, also called a cycle or bike, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.'
        },
        JigsawListLite.SEPARATOR,
        {
            icon: 'iconfont iconfont-e2e7',
            name: 'camera',
            desc: 'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both.'
        },
        {
            icon: 'iconfont iconfont-e18a',
            name: 'car',
            desc: 'A car (or automobile) is a wheeled motor vehicle used for transportation.',
            disabled: true
        },
        {
            icon: 'iconfont iconfont-e534',
            name: 'football',
            desc: 'Football is a family of team sports that involve, to varying degrees, kicking a ball with the foot to score a goal. '
        },
        JigsawListLite.SEPARATOR,
        {
            icon: 'iconfont iconfont-e565',
            name: 'book',
            desc: 'A book is a set of sheets of paper, parchment, or similar materials that are fastened together to hinge at one side.'
        },
        {
            icon: 'iconfont iconfont-e6ca',
            name: 'puzzle-piece',
            desc: 'A puzzle is a game, problem, or toy that tests a person\'s ingenuity or knowledge.'
        },
    ];

    public selectedItemsChange($event) {
        console.log('selectedItemsChange ===>', $event);
    }

    public maxSelectionReachedChange($event) {
        console.log('maxSelectionReachedChange ===>', $event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
