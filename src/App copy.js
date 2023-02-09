import React, { useState, useRef, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { Route, useHistory, useLocation } from 'react-router-dom';

import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';
import AppConfig from './AppConfig';
import AppMenu from './AppMenu';
import AppBreadcrumb from './AppBreadcrumb';
import AppInlineProfile from './AppInlineProfile';

import Dashboard from './components/Dashboard';
import FormLayoutDemo from './components/FormLayoutDemo';
import InputDemo from './components/InputDemo';
import FloatLabelDemo from './components/FloatLabelDemo';
import InvalidStateDemo from './components/InvalidStateDemo';
import ButtonDemo from './components/ButtonDemo';
import TableDemo from './components/TableDemo';
import ListDemo from './components/ListDemo';
import TreeDemo from './components/TreeDemo';
import PanelDemo from './components/PanelDemo';
import OverlayDemo from './components/OverlayDemo';
import MediaDemo from './components/MediaDemo';
import MenuDemo from './components/MenuDemo';
import MessagesDemo from './components/MessagesDemo';
import FileDemo from './components/FileDemo';
import ChartDemo from './components/ChartDemo';
import MiscDemo from './components/MiscDemo';
import Documentation from './components/Documentation';
import IconsDemo from './utilities/IconsDemo';
import BlocksDemo from './components/BlocksDemo';
import CrudDemo from './pages/CrudDemo';
import CalendarDemo from './pages/CalendarDemo';
import TimelineDemo from './pages/TimelineDemo';
import Invoice from './pages/Invoice';
import Help from './pages/Help';
import EmptyPage from './pages/EmptyPage';
import SeatDemo from './components/menu/SeatDemo';
import PaymentDemo from './components/menu/PaymentDemo';
import ConfirmationDemo from './components/menu/ConfirmationDemo';

import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';

const App = () => {

    const [menuActive, setMenuActive] = useState(false);
    const [menuMode, setMenuMode] = useState('static');
    const [darkMenu, setDarkMenu] = useState(true);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [topbarMenuActive, setTopbarMenuActive] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [activeTopbarItem, setActiveTopbarItem] = useState(null);
    const [inlineMenuActive, setInlineMenuActive] = useState(false);
    const [profileMode, setProfileMode] = useState('popup');
    const [configActive, setConfigActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    const history = useHistory();

    let menuClick = false;
    let configClick = false;
    let topbarItemClick = false;
    let inlineMenuClick = false;

    const menu = [
        {
            label: 'Home Page', icon: 'pi pi-fw pi-home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }
            ]
        },
        {
            label: 'UI Kit', icon: 'pi pi-fw pi-sitemap',
            items: [
                { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/formlayout' },
                { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/input' },
                { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/floatlabel' },
                { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/invalidstate' },
                { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/button', class: 'rotated-icon' },
                { label: 'Table', icon: 'pi pi-fw pi-table', to: '/table' },
                { label: 'List', icon: 'pi pi-fw pi-list', to: '/list' },
                { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/tree' },
                { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/panel' },
                { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/overlay' },
                { label: "Media", icon: "pi pi-fw pi-image", to: "/media" },
                { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/menu' },
                { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/messages' },
                { label: 'File', icon: 'pi pi-fw pi-file', to: '/file' },
                { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/chart' },
                { label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/misc' },
            ]
        },
        {
            label: "PrimeBlocks", icon: "pi pi-prime",
            items: [
                { label: "Free Blocks", icon: "pi pi-fw pi-eye", to: "/blocks", badge: "NEW", },
                { label: "All Blocks", icon: "pi pi-fw pi-globe", url: "https://www.primefaces.org/primeblocks-react", target: "_blank" }
            ]
        },
        {
            label: 'Utilities', icon: 'pi pi-fw pi-compass',
            items: [
                { label: 'Icons', icon: 'pi pi-fw pi-prime', to: '/icons' },
                { label: "PrimeFlex", icon: "pi pi-fw pi-desktop", url: "https://www.primefaces.org/primeflex", target: "_blank" }
            ]
        },
        {
            label: 'Pages', icon: 'pi pi-fw pi-clone',
            items: [
                { label: 'Crud', icon: 'pi pi-fw pi-pencil', to: '/crud' },
                { label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', to: '/calendar' },
                { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/timeline' },
                { label: 'Landing', icon: 'pi pi-fw pi-user-plus', url: 'assets/pages/landing.html', target: '_blank' },
                { label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/login' },
                { label: 'Invoice', icon: 'pi pi-fw pi-dollar', to: '/invoice' },
                { label: 'Help', icon: 'pi pi-fw pi-question-circle', to: '/help' },
                { label: 'Wizard', icon: 'pi pi-fw pi-star-fill', to: '/wizard' },
                { label: 'Error', icon: 'pi pi-fw pi-times-circle', to: '/error' },
                { label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', to: '/notfound' },
                { label: 'Access Denied', icon: 'pi pi-fw pi-lock', to: '/access' },
                { label: 'Empty', icon: 'pi pi-fw pi-circle-off', to: '/empty' }
            ]
        },
        {
            label: 'Hierarchy', icon: 'pi pi-fw pi-align-left',
            items: [
                {
                    label: 'Submenu 1', icon: 'pi pi-fw pi-align-left',
                    items: [
                        {
                            label: 'Submenu 1.1', icon: 'pi pi-fw pi-align-left',
                            items: [
                                { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-align-left' },
                                { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-align-left' },
                                { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-align-left' },
                            ]
                        },
                        {
                            label: 'Submenu 1.2', icon: 'pi pi-fw pi-align-left',
                            items: [
                                { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-align-left' },
                                { label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-align-left' }
                            ]
                        },
                    ]
                },
                {
                    label: 'Submenu 2', icon: 'pi pi-fw pi-align-left',
                    items: [
                        {
                            label: 'Submenu 2.1', icon: 'pi pi-fw pi-align-left',
                            items: [
                                { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-align-left' },
                                { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-align-left' },
                                { label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-align-left' },
                            ]
                        },
                        {
                            label: 'Submenu 2.2', icon: 'pi pi-fw pi-align-left',
                            items: [
                                { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-align-left' },
                                { label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-align-left' }
                            ]
                        },
                    ]
                }
            ]
        },
        {
            label: 'Get Started', icon: 'pi pi-fw pi-download',
            items: [
                {
                    label: 'Documentation', icon: 'pi pi-fw pi-file', to: '/documentation'
                },
                {
                    label: 'Buy Now', icon: 'pi pi-fw pi-money-bill', url: ['https://www.primefaces.org/store']
                }
            ]
        }
    ];

    const routers = [
        { path: '/', component: Dashboard, exact: true, meta: { breadcrumb: [{ parent: 'Dashboard', label: 'Dashboard' }] } },
        { path: '/formlayout', component: FormLayoutDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Form Layout' }] } },
        { path: '/input', component: InputDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Input' }] } },
        { path: '/floatlabel', component: FloatLabelDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Float Label' }] } },
        { path: '/invalidstate', component: InvalidStateDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Invalid State' }] } },
        { path: '/button', component: ButtonDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Button' }] } },
        { path: '/table', component: TableDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Table' }] } },
        { path: '/list', component: ListDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'List' }] } },
        { path: '/tree', component: TreeDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Tree' }] } },
        { path: '/panel', component: PanelDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Panel' }] } },
        { path: '/overlay', component: OverlayDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Overlay' }] } },
        { path: '/media', component: MediaDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Media' }] } },
        { path: '/menu', component: MenuDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Menu' }] } },
        { path: '/menu/seat', component: SeatDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Menu' }] } },
        { path: '/menu/payment', component: PaymentDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Menu' }] } },
        { path: '/menu/confirmation', component: ConfirmationDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Menu' }] } },
        { path: '/messages', component: MessagesDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Messages' }] } },
        { path: '/file', component: FileDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'File' }] } },
        { path: '/chart', component: ChartDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Charts' }] } },
        { path: '/misc', component: MiscDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Misc' }] } },
        { path: '/icons', component: IconsDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Icons' }] } },
        { path: '/blocks', component: BlocksDemo, meta: { breadcrumb: [{ parent: 'PrimeBlocks', label: 'Blocks' }] } },
        { path: '/crud', component: CrudDemo, meta: { breadcrumb: [{ parent: 'Pages', label: 'Crud' }] } },
        { path: '/calendar', component: CalendarDemo, meta: { breadcrumb: [{ parent: 'Pages', label: 'Calendar' }] } },
        { path: '/timeline', component: TimelineDemo, meta: { breadcrumb: [{ parent: 'Pages', label: 'Timeline' }] } },
        { path: '/invoice', component: Invoice, meta: { breadcrumb: [{ parent: 'Pages', label: 'Invoice' }] } },
        { path: '/help', component: Help, meta: { breadcrumb: [{ parent: 'Pages', label: 'Help' }] } },
        { path: '/empty', component: EmptyPage, meta: { breadcrumb: [{ parent: 'Pages', label: 'Empty Page' }] } },
        { path: '/documentation', component: Documentation, meta: { breadcrumb: [{ parent: 'Pages', label: 'Documentation' }] } }
    ];

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRippleChange = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onMenuModeChange = (e) => {
        setMenuMode(e.value);
        setStaticMenuDesktopInactive(false);
        setOverlayMenuActive(false);

        if (e.value === 'horizontal') {
            setProfileMode('popup');
        }
    };

    const onMenuColorChange = (e) => {
        setDarkMenu(e.value);
    };

    const onProfileChange = (e) => {
        setProfileMode(e.value);
    };

    const onDocumentClick = () => {
        if (!topbarItemClick) {
            setActiveTopbarItem(null);
            setTopbarMenuActive(false);
        }

        if (!menuClick) {
            if (isHorizontal() || isSlim()) {
                setMenuActive(false);
            }
            hideOverlayMenu();
        }

        if (!inlineMenuClick && profileMode === 'inline' && isSlim() && !isMobile()) {
            setInlineMenuActive(false);
        }

        if (configActive && !configClick) {
            setConfigActive(false);
        }

        inlineMenuClick = false;
        configClick = false;
        topbarItemClick = false;
        menuClick = false;
    };

    const onMenuitemClick = (event) => {
        if (!event.item.items) {
            hideOverlayMenu();

            if (isSlim() || isHorizontal()) {
                setMenuActive(false);
            }
        }
    };

    const onRootMenuitemClick = () => {
        setMenuActive(prevMenuActive => !prevMenuActive);
    };

    const onMenuClick = () => {
        menuClick = true;

        if (inlineMenuActive && !inlineMenuClick) {
            setInlineMenuActive(false);
        }
    };

    const isMenuVisible = () => {
        if (isDesktop()) {
            if (menuMode === 'static')
                return !staticMenuDesktopInactive;
            else if (menuMode === 'overlay')
                return overlayMenuActive;
            else
                return true;
        } else {
            return true;
        }
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarMenuActive(false);

        if (isOverlay() && !isMobile()) {
            setOverlayMenuActive(prevOverlayMenuActive => !prevOverlayMenuActive);
        }
        else {
            if (isDesktop()) {
                setStaticMenuDesktopInactive(prevStaticMenuDesktopInactive => !prevStaticMenuDesktopInactive);
            }
            else {
                setStaticMenuMobileActive(prevStaticMenuMobileActive => !prevStaticMenuMobileActive);
            }
        }

        event.preventDefault();
    };

    const onProfileButtonClick = (event) => {
        setInlineMenuActive(prevInlineMenuActive => !prevInlineMenuActive);
        inlineMenuClick = true;

        if (isSlim() || isHorizontal()) {
            setMenuActive(false);
        }
    };

    const onTopbarMenuButtonClick = (event) => {
        topbarItemClick = true;
        setTopbarMenuActive(prevTopbarMenuActive => !prevTopbarMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const onTopbarItemClick = (event, item) => {
        topbarItemClick = true;

        if (activeTopbarItem === item) {
            setActiveTopbarItem(null);
        }
        else {
            setActiveTopbarItem(item);
        }

        event.preventDefault();
    };

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = () => {
        setConfigActive(prevConfigActive => !prevConfigActive);
        configClick = true;
    };

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
    };

    const isDesktop = () => {
        return window.innerWidth > 896;
    };

    const isMobile = () => {
        return window.innerWidth <= 896;
    };

    const isOverlay = () => {
        return menuMode === 'overlay';
    };

    const isHorizontal = () => {
        return menuMode === 'horizontal';
    };

    const isSlim = () => {
        return menuMode === 'slim';
    };

    const isStatic = () => {
        return menuMode === 'static';
    };

    const hasInlineProfile = profileMode === 'inline' && !isHorizontal();

    const containerClassName = classNames('layout-wrapper',
        {
            'layout-static': isStatic(),
            'layout-overlay': isOverlay(),
            'layout-overlay-active': overlayMenuActive,
            'layout-horizontal': isHorizontal(),
            'layout-slim': isSlim(),
            'layout-static-inactive': staticMenuDesktopInactive,
            'layout-mobile-active': staticMenuMobileActive,
            'layout-menu-dark': darkMenu,
            'layout-menu-light': !darkMenu,
            'p-input-filled': inputStyle === 'filled',
            'p-ripple-disabled': !ripple
        });

    const menuContainerClassName = classNames('layout-menu-container', { 'layout-menu-container-inactive': !isMenuVisible() });

    return (
        <div className={containerClassName} onClick={onDocumentClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <AppTopbar topbarMenuActive={topbarMenuActive} activeTopbarItem={activeTopbarItem} onMenuButtonClick={onMenuButtonClick} onTopbarMenuButtonClick={onTopbarMenuButtonClick} onTopbarItemClick={onTopbarItemClick}
                isHorizontal={isHorizontal()} profileMode={profileMode} isMobile={isMobile} />

            <div className={menuContainerClassName} onClick={onMenuClick}>
                <div className="layout-menu-logo">
                    <button className="p-link" onClick={() => history.push('/')}>
                        <img id="layout-menu-logo" src="assets/layout/images/logo-white.png" library="babylon-layout" alt="babylon-logo" />
                    </button>
                </div>
                <div className="layout-menu-wrapper">
                    <div className="menu-scroll-content">
                        {hasInlineProfile && <AppInlineProfile inlineMenuActive={inlineMenuActive} onProfileButtonClick={onProfileButtonClick} />}
                        <AppMenu model={menu} menuMode={menuMode} active={menuActive} onMenuitemClick={onMenuitemClick} onRootMenuitemClick={onRootMenuitemClick} />
                    </div>
                </div>
            </div>

            <div className="layout-main">
                <AppBreadcrumb routers={routers} />

                <div className="layout-content">
                    {
                        routers.map((router, index) => {
                            if (router.exact) {
                                return <Route key={`router${index}`} path={router.path} exact component={router.component} />
                            }

                            return <Route key={`router${index}`} path={router.path} component={router.component} />
                        })
                    }
                </div>

                <AppFooter />
            </div>

            <AppConfig configActive={configActive} menuMode={menuMode} onMenuModeChange={onMenuModeChange}
                isDarkMenu={darkMenu} onMenuColorChange={onMenuColorChange}
                profileMode={profileMode} onProfileChange={onProfileChange} onConfigClick={onConfigClick} onConfigButtonClick={onConfigButtonClick}
                rippleActive={ripple} onRippleChange={onRippleChange} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}></AppConfig>

            {staticMenuMobileActive && <div className="layout-mask"></div>}
        </div>
    );
}

export default App;
