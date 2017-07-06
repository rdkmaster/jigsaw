import {trigger, style, transition, animate, AnimationTriggerMetadata} from '@angular/animations';

export const AnimationDestroy: AnimationTriggerMetadata = trigger('AnimationDestroy', [
    transition('* => inactive', [
        animate('.3s cubic-bezier(.78,.14,.15,.86)', style({
            transform: 'scale(0, 0)',
            display: 'none',
            opacity: 0
        }))
    ])
]);
