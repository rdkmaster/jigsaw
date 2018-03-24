import {trigger, state, style, transition, animate, keyframes, AnimationTriggerMetadata} from '@angular/animations';

export const bubbleIn: AnimationTriggerMetadata = trigger('bubbleIn', [
    state('in', style({opacity: 1, transform: 'scale(1)'})),
    transition('void => *', [
        animate('0.2s ease-in-out', keyframes([
            style({opacity: 0, transform: 'scale3d(0,0,0)', width: 0, offset: 0}),
            style({opacity: 1, transform: 'scale3d(1,1,1)', width: '*', offset: 1.0})
        ]))
    ]),
    transition('* => void', [
        animate('0.2s ease-in-out', keyframes([
            style({opacity: 1, transform: 'scale3d(1,1,1)', offset: 0}),
            style({opacity: 0, transform: 'scale3d(0,0,0)', width: 0, offset: 1.0})
        ]))
    ])
]);
