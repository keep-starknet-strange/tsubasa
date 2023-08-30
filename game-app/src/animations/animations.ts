import { SpringRef, useSpring } from "@react-spring/web";
import { usePlayerAnimations } from "./usePlayerAnimations";

export const triggerAttackAnimation = (
  attackingElementId: string,
  attackedElementId: string,
  animationApis: any
) => {
  const api = animationApis[attackingElementId];
  const attackingElement = document.getElementById(attackingElementId);
  const attackedElement = document.getElementById(attackedElementId);
  if (attackingElement && attackedElement) {
    const attackingCard = attackingElement.getBoundingClientRect();
    const attackedCard = attackedElement.getBoundingClientRect();
    const moveX = attackedCard.x - attackingCard.x - 60;
    const moveY = attackedCard.y - attackingCard.y;

    api.start({
      from: { transform: "translate3d(0px, 0px, 0px)" },
      to: [
        { transform: "translate3d(0px, 20px, 0px)" },
        { transform: `translate3d(${moveY}px, -${moveX}px, 0px)` },
        { transform: "translate3d(0px, 0px, 0px)" },
      ],
      config: { tension: 210, friction: 20, clamp: true },
    });

    setTimeout(() => {
      triggerTakeDamageAnimation(attackedElementId, animationApis);
    }, 500);
  }
};

export const triggerTakeDamageAnimation = (
  attackedElementId: string,
  animationApis: any
) => {
  const api = animationApis[attackedElementId];
  api.start({
    from: { transform: "translate3d(0px, 0px, 0px)" },
    to: [
      { transform: "translate3d(0px, -50px, 0px)" },
      { transform: "translate3d(0px, 0px, 0px)" },
    ],
    reset: true,
    config: { tension: 210, friction: 20, clamp: true },
  });
};
