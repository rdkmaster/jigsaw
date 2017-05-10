import { trigger, state, style, transition, animate,keyframes } from '@angular/animations';

export const bubbleIn = trigger('bubbleIn', [
    state('in', style({opacity: 1, transform: 'scale(1)'})),
    transition('void => *', [
        animate('0.2s ease-in-out', keyframes([
            style({opacity: 0, transform: 'scale(0)', offset: 0}),
            style({opacity: 1, transform: 'scale(1)', offset: 1.0})
        ]))
    ]),
    transition('* => void', [
        animate('0.2s ease-in-out', keyframes([
            style({opacity: 1, transform: 'scale(1)', offset: 0}),
            style({opacity: 0, transform: 'scale(0)', offset: 1.0})
        ]))
    ])
]);
