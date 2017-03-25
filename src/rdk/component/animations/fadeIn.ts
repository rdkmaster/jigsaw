import { trigger, state, style, transition, animate,keyframes } from '@angular/core';

export const fadeIn = trigger('fadeIn', [
  state('in', style({opacity: 1})),
  transition('void => *', [
       animate(300, keyframes([
        style({opacity: 0, offset: 0}),
        style({opacity: 1, offset: 1.0})
      ]))
  ]),
  transition('* => void', [
        animate(300, keyframes([
        style({opacity: 1, offset: 0}),
        style({opacity: 0, offset: 1.0})
      ]))
  ])
]);
