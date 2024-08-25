// import { useTheme } from './theme-provider';

// export function ModeToggle() {
//   // const { setTheme } = useTheme();

//   return (
//     // <DropdownMenu>
//     //   <DropdownMenuContent align='end'>
//     //     <DropdownMenuItem onClick={() => setTheme('light')}>
//     //       Light
//     //     </DropdownMenuItem>
//     //     <DropdownMenuItem onClick={() => setTheme('dark')}>
//     //       Dark
//     //     </DropdownMenuItem>
//     //   </DropdownMenuContent>
//     // </DropdownMenu>
//   );

//   // import { useEffect, useState } from 'react';
//   // import { useTheme } from './theme-provider';
//   // import { DropdownMenu, DropdownMenuItem } from './ui/dropdown-menu';

//   // const THEME = localStorage.getItem('vite-ui-theme');
//   // const MODE_PROPS = {
//   //   light: {
//   //     modeName: 'light',
//   //     modeText: 'Light Mode',
//   //     oppositeMode: 'dark',
//   //     oppositeModeText: 'Dark Mode',
//   //   },
//   //   dark: {
//   //     modeName: 'dark',
//   //     modeText: 'Dark Mode',
//   //     oppositeMode: 'light',
//   //     oppositeModeText: 'Light Mode',
//   //   },
//   // };

//   // export function ModeToggle() {
//   //   const { setTheme }: any = useTheme();
//   //   const [modeTheme, setModeTheme] = useState<ModeProps>();

//   //   useEffect(() => {
//   //     console.log(THEME);
//   //     if (!THEME || THEME === 'dark') {
//   //       console.log('first');
//   //       setModeTheme(MODE_PROPS.light);
//   //     } else if (THEME === 'light') {
//   //       console.log('second');
//   //       setModeTheme(MODE_PROPS.dark);
//   //     }
//   //   }, []);

//   //   return (
//   //     <DropdownMenu>
//   //       <DropdownMenuItem
//   //         onClick={() => {
//   //           console.log(modeTheme?.modeName);
//   //           setTheme(modeTheme?.modeName);
//   //         }}
//   //       >
//   //         {modeTheme?.modeText}
//   //       </DropdownMenuItem>
//   //     </DropdownMenu>
//   //   );

//   // if (!THEME || THEME === 'dark') {
//   //   return (
//   //     <DropdownMenu>
//   //       <DropdownMenuItem
//   //         onClick={() => {
//   //           setTheme('light');
//   //         }}
//   //       >
//   //         Light Mode
//   //       </DropdownMenuItem>
//   //     </DropdownMenu>
//   //   );
//   // } else if (THEME === 'light') {
//   //   return (
//   //     <DropdownMenu>
//   //       <DropdownMenuItem
//   //         onClick={() => {
//   //           setTheme('dark');
//   //         }}
//   //       >
//   //         Dark Mode
//   //       </DropdownMenuItem>
//   //     </DropdownMenu>
//   //   );
//   // }

//   // return (
//   //   <DropdownMenu>
//   //     {/* {THEME === 'dark' ? (
//   //       <DropdownMenuItem
//   //         onClick={() => {
//   //           setTheme('light');
//   //         }}
//   //       >
//   //         Light Mode
//   //       </DropdownMenuItem>
//   //     ) : (
//   //       <DropdownMenuItem
//   //         onClick={() => {
//   //           setTheme('dark');
//   //         }}
//   //       >
//   //         Dark Mode
//   //       </DropdownMenuItem>
//   //     )} */}
//   //   </DropdownMenu>
//   // );
// }

// interface ModeProps {
//   modeName: string;
//   modeText: string;
//   oppositeMode: string;
//   oppositeModeText: string;
// }
