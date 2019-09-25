import { animate, state, style, transition, trigger, AnimationTriggerMetadata } from '@angular/animations';

export const collapseMotion: AnimationTriggerMetadata = trigger('collapseMotion', [
    state('expanded', style({ height: '*' })),
    state('collapsed', style({ height: 0, overflow: 'hidden' })),
    state('hidden', style({ height: 0, overflow: 'hidden', borderTopWidth: '0' })),
    transition('expanded => collapsed', animate(`150ms ease-in-out`)),
    transition('expanded => hidden', animate(`150ms ease-in-out`)),
    transition('collapsed => expanded', animate(`150ms ease-in-out`)),
    transition('hidden => expanded', animate(`150ms ease-in-out`))
]);
