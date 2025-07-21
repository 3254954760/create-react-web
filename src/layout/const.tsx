import { PATH } from '@router/routes';
export interface NavItem {
    label: string;
    path: string;
}
export const NavList: NavItem[] = [
    {
        label: 'home',
        path: '/'
    },
    {
        label: 'APP',
        path: PATH.APP
    }
];
