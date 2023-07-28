import {animate, AnimationMetadata, state, style, transition, trigger} from "@angular/animations";

export function buildAnimation(time: number):AnimationMetadata[] {
    const animations = [];
    for (let i = 0; i < 10; i++) {
        const offset = i * 5 + 50;
        animations.push(
            state(i.toString(), style({transform: `translate(-50%, -${offset - 1}%)`}))
        )
    }
    animations.push(transition('* => *', [animate(time)]));
    return animations;
}
