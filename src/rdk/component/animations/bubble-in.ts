import { trigger, state, style, transition, animate,keyframes } from '@angular/animations';

export const bubbleIn = trigger('bubbleIn', [
    state('in', style({transform: 'scale(1)'})),
    transition('void => *', [
        animate(200, keyframes([
            style({opacity: 0, transform: 'scale(0)', offset: 0}),
            style({opacity: 1, transform: 'scale(1)', offset: 1.0})
        ]))
    ]),
    transition('* => void', [
        animate(200, keyframes([
            style({opacity: 1, transform: 'scale(1)', offset: 1.0}),
            style({opacity: 0, transform: 'scale(0)', offset: 0})
        ]))
    ])
]);
