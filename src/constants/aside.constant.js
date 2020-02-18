import Users from "../components/pages/Users/Users";
import AdwordsAccounts from "../components/pages/Adwords-accounts/Adwords-accounts";
import GoogleAdsErrors from "../components/pages/Google-ads-errors/Google-ads-errors";
import Dashboard from "../components/pages/Dashboard/Dashboard";
import Websites from "../components/pages/Websites/Websites";
import Orders from "../components/pages/Order/Order";
import Packages from "../components/pages/Packages/Packages";

export default [
	{
		title: 'Trang chủ',
		path: '',
		icon: 'home',
		component: Dashboard
	},
	{
		title: 'Người dùng',
		path: 'users',
		icon: 'user',
		component: Users
	},
	{
		title: 'Quản lý gói',
		path: 'packages',
		icon: 'inbox',
		component: Packages
	},
	{
		title: 'Lịch sử đặt gói',
		path: 'orders',
		icon: 'history',
		component: Orders
	},
	{
		title: 'Tài khoản Google Ads',
		path: 'accounts',
		icon: 'appstore',
		component: AdwordsAccounts
	},
	{
		title: 'Website tài khoản',
		path: 'websites',
		icon: 'credit-card',
		component: Websites
	},
	{
		title: 'Lỗi Google Ads',
		path: 'google-ads-errors',
		icon: 'bug',
		component: GoogleAdsErrors
	}
];
