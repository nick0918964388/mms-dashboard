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
// import ReactMap from './components/ReactMap';
import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';
import Pivlot from './components/Pivlot';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';
import TableDynamicList from './components/TableDynamicList';

const App = () => {

    const [menuActive, setMenuActive] = useState(false);
    const [menuMode, setMenuMode] = useState('horizontal');
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
            label: '倉儲', icon: 'pi pi-fw pi-chart-bar',
            items: [
                { label: 'test', icon: 'pi pi-fw pi-chart-bar', to: '/test' },
                { label: '超過1年呆料清單統計', icon: 'pi pi-fw pi-chart-bar', to: '/m01' },
                { label: '歷史庫存金額統計', icon: 'pi pi-fw pi-chart-bar', to: '/m02' },
                { label: '歷史庫存數量統計', icon: 'pi pi-fw pi-chart-bar', to: '/m03' },
                { label: '領料金額統計', icon: 'pi pi-fw pi-chart-bar', to: '/m04' },
                { label: '領料量統計', icon: 'pi pi-fw pi-chart-bar', to: '/m05' }
            ]
        },{
            label: '維修', icon: 'pi pi-fw pi-chart-bar',
            items: [
                { label: '故障樣態統計', icon: 'pi pi-fw pi-chart-bar', to: '/m06' },
                { label: '工單結案率統計', icon: 'pi pi-fw pi-chart-bar', to: '/m07' },
                { label: '緊急維修分析', icon: 'pi pi-fw pi-chart-bar', to: '/m08' },
                { label: '維修工時、人時、保養工時分析', icon: 'pi pi-fw pi-chart-bar', to: '/m09' },
                { label: '設備可用度分析', icon: 'pi pi-fw pi-chart-bar', to: '/m10' }
            ]
        },
        ,{
            label: '站務中心', icon: 'pi pi-fw pi-chart-bar',
            items: [
                { label: '超過1個月的查修統計', icon: 'pi pi-fw pi-chart-bar', to: '/m11' },                
            ]
        },
        {
            label: '其他功能', icon: 'pi pi-fw pi-download',
            items: [               
                {
                    label: '回到主頁', icon: 'pi pi-fw pi-money-bill', url: ['/']
                }
            ]
        }
    ];

    const routers = [
        { path: '/', component: Dashboard, exact: true, meta: { breadcrumb: [{ parent: 'Dashboard', label: 'Dashboard' }] } },        
        { path: '/test', component: TableDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: '超過1年呆料清單統計' }] } },
        { path: '/m01', component: TableDemo,charttype:'m01', meta: { breadcrumb: [{ parent: 'UI Kit', label: '超過1年呆料清單統計' }] } },
        { path: '/m02', component: TableDemo,charttype:'m01', meta: { breadcrumb: [{ parent: 'UI Kit', label: '歷史庫存金額統計' }] } },
        { path: '/m03', component: TableDemo,charttype:'m01', meta: { breadcrumb: [{ parent: 'UI Kit', label: '歷史庫存數量統計' }] } },
        { path: '/m04', component: TableDemo,charttype:'m01', meta: { breadcrumb: [{ parent: 'UI Kit', label: '領料金額統計' }] } },
        { path: '/m05', component: TableDemo,charttype:'m01', meta: { breadcrumb: [{ parent: 'UI Kit', label: '領料量統計' }] } },
        { path: '/m06', component: TableDemo,charttype:'m01', meta: { breadcrumb: [{ parent: 'UI Kit', label: '故障樣態統計' }] } },
        { path: '/m07', component: TableDemo,charttype:'m01', meta: { breadcrumb: [{ parent: 'UI Kit', label: '工單結案率統計' }] } },
        { path: '/m08', component: TableDemo,charttype:'m01', meta: { breadcrumb: [{ parent: 'UI Kit', label: '緊急維修分析' }] } },
        { path: '/m09', component: TableDemo,charttype:'m01', meta: { breadcrumb: [{ parent: 'UI Kit', label: '維修工時、人時、保養工時分析' }] } },
        { path: '/m10', component: TableDemo,charttype:'m01', meta: { breadcrumb: [{ parent: 'UI Kit', label: '設備可用度分析' }] } },
        { path: '/m11', component: TableDemo,charttype:'m01', meta: { breadcrumb: [{ parent: 'UI Kit', label: '超過1個月的查修統計' }] } }        
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
                        <img id="layout-menu-logo" src="assets/layout/images/logo-black.png" library="babylon-layout" />
                        {/* MMS樞紐分析平台 */}
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
                                // return <Route key={`router${index}`} path={router.path} exact render={(props) => <Pivlot charttype={router.charttype} {...props} /> } />
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
