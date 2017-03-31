import { trigger, state, style, transition, animate,keyframes } from '@angular/animations';

export const tagDestroy = trigger('tagDestroy', [
    /*state('inactive', style({
     transform: 'scale(0, 0)',
     display: 'none',
     opacity: 0
     })),
     state('active',   style({

     })),
     transition('inactive => active', animate('.3s cubic-bezier(.78,.14,.15,.86)')),
     transition('active => inactive', animate('.3s cubic-bezier(.78,.14,.15,.86)'))*/
    transition('* => inactive', [
        animate('.3s cubic-bezier(.78,.14,.15,.86)', style({
            transform: 'scale(0, 0)',
            display: 'none',
            opacity: 0
        }))
    ])
]);
