// *? n5-reto-tecnico-ui/components/icons.tsx

export const SearchIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size}
    role="presentation"
    viewBox="0 0 24 24"
    width={size}
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

export const EyeIcon = (props: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M21.25 9.15C18.94 5.52 15.56 3.43 12 3.43C10.22 3.43 8.49 3.95 6.91 4.92C5.33 5.9 3.91 7.33 2.75 9.15C1.75 10.72 1.75 13.27 2.75 14.84C5.06 18.48 8.44 20.56 12 20.56C13.78 20.56 15.51 20.04 17.09 19.07C18.67 18.09 20.09 16.66 21.25 14.84C22.25 13.28 22.25 10.72 21.25 9.15ZM12 16.04C9.76 16.04 7.96 14.23 7.96 12C7.96 9.77 9.76 7.96 12 7.96C14.24 7.96 16.04 9.77 16.04 12C16.04 14.23 14.24 16.04 12 16.04Z"
      fill="currentColor"
    />
    <path
      d="M11.9984 9.14C10.4284 9.14 9.14844 10.42 9.14844 12C9.14844 13.57 10.4284 14.85 11.9984 14.85C13.5684 14.85 14.8584 13.57 14.8584 12C14.8584 10.43 13.5684 9.14 11.9984 9.14Z"
      fill="currentColor"
    />
  </svg>
);

export const EyeSlashIcon = (props: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M21.77 2.23C21.47 1.93 20.98 1.93 20.68 2.23L2.23 20.69C1.93 20.99 1.93 21.48 2.23 21.78C2.38 21.92 2.57 22 2.77 22C2.97 22 3.16 21.92 3.31 21.77L21.77 3.31C22.07 3.01 22.07 2.53 21.77 2.23Z"
      fill="currentColor"
    />
  </svg>
);
