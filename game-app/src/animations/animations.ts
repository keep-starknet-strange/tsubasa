import { AnimationApis } from "./usePlayerAnimations";

export const triggerAttackAnimation = (
  attackingElementId: string,
  attackedElementId: string,
  animationApis: AnimationApis
) => {
  const api = animationApis[attackingElementId];
  const attackingElement = document.getElementById(attackingElementId);
  const attackedElement = document.getElementById(attackedElementId);
  console.log(attackingElement, attackedElement);
  if (attackingElement && attackedElement) {
    const attackingCard = attackingElement.getBoundingClientRect();
    const attackedCard = attackedElement.getBoundingClientRect();
    const moveX = attackedCard.x - attackingCard.x + 60;
    const moveY = attackedCard.y - attackingCard.y;

    api.start({
      from: { transform: "translate3d(0px, 0px, 0px)" },
      to: [
        { transform: "translate3d(20px, 0px, 0px)" },
        { transform: `translate3d(${moveX}px, -${moveY}px, 0px)` },
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
  animationApis: AnimationApis
) => {
  const api = animationApis[attackedElementId];
  api.start({
    from: { transform: "translate3d(0px, 0px, 0px)" },
    to: [
      { transform: "translate3d(-50px, 0px, 0px)" },
      { transform: "translate3d(0px, 0px, 0px)" },
    ],
    reset: true,
    config: { tension: 210, friction: 20, clamp: true },
  });
};
