interface CaptainIconProps {
  size: string | number;
}

const CaptainIcon = ({ size }: CaptainIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.882 13.7117L20.2535 11.4022C20.9511 10.7245 20.8159 10.0622 20.7263 9.80833C20.635 9.55451 20.319 8.95499 19.3394 8.84882L16.4801 8.53941C16.1782 8.50789 15.702 8.19849 15.5536 7.9399L13.8158 4.89316C13.4906 4.32495 12.9755 4 12.3998 4C11.8241 4 11.309 4.3262 10.9839 4.89544L9.24608 7.94238C9.0976 8.20098 8.62064 8.50914 8.31704 8.54169L5.46026 8.8511C4.48062 8.95748 4.16293 9.55824 4.07334 9.81082C3.98459 10.0644 3.84855 10.7255 4.54616 11.4037L6.91851 13.7119C7.10764 13.8957 7.23704 14.3743 7.16819 14.6231L6.05998 18.5763C5.86837 19.2652 6.05998 19.7075 6.25492 19.9576C6.66883 20.4895 7.45354 20.5934 8.19594 20.1596L11.9303 17.978C12.0091 17.9322 12.1916 17.9088 12.3774 17.9069C12.579 17.905 12.7855 17.9285 12.8693 17.9768L16.6045 20.1584C16.9214 20.3433 17.2341 20.4362 17.5336 20.4362C17.8131 20.4362 18.0744 20.3533 18.2876 20.2025C18.3846 20.1341 18.4717 20.0516 18.5464 19.9566C18.7413 19.7075 18.9329 19.2652 18.7413 18.5751L17.6331 14.6242C17.5643 14.3728 17.6937 13.8942 17.882 13.7117Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CaptainIcon;
