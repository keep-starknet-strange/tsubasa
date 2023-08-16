import type { FC } from "react";

const EnergyIcon: FC = () => {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_120_394)">
        <path
          d="M75.3742 36.813L68.9363 38.5443C56.0635 42.0101 46.0101 52.0635 42.5443 64.9363L40.813 71.3742C40.5879 72.2055 39.4066 72.2055 39.1847 71.3742L37.4533 64.9363C33.9875 52.0635 23.9341 42.0101 11.0614 38.5443L4.6235 36.813C3.79217 36.5879 3.79217 35.4066 4.6235 35.1847L11.0614 33.4533C23.9341 29.9875 33.9875 19.9341 37.4533 7.06139L39.1847 0.623496C39.4097 -0.207832 40.591 -0.207832 40.813 0.623496L42.5443 7.06139C46.0101 19.9341 56.0635 29.9875 68.9363 33.4533L75.3742 35.1847C76.2086 35.4066 76.2086 36.5879 75.3742 36.813Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_120_394"
          x="0"
          y="0"
          width="80"
          height="79.9977"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_120_394"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_120_394"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default EnergyIcon;
