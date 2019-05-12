import {trigger, style, transition, animate, AnimationTriggerMetadata, state} from '@angular/animations';

export const AnimationDestroy: AnimationTriggerMetadata = trigger('AnimationDestroy', [
    transition('* => inactive', [
        animate('.3s cubic-bezier(.78,.14,.15,.86)', style({
            transform: 'scale(0, 0)'
        }))
    ]),
    transition('* => active', [
        animate('.3s cubic-bezier(.78,.14,.15,.86)', style({
            transform: 'scale(1, 1)'
        }))
    ]),
    state('inactive' , style({ display: 'none' })),
]);
