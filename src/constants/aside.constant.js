import { Dashboard } from "../components/pages/Dashboard";
import ExpirationUpdating from "../components/pages/Expiration-updating";
import Users from "../components/pages/Users/Users";
import AdwordsAccounts from "../components/pages/Adwords-accounts/Adwords-accounts";
import GoogleAdsErrors from "../components/pages/Google-ads-errors/Google-ads-errors";

export default [
	{
		title: 'Dashboard',
		path: '',
		icon: 'home',
		component: Dashboard
	},
	{
		title: 'Cập nhật thời hạn sử dụng',
		path: 'update-expiration',
		icon: 'history',
		component: ExpirationUpdating
	},
	{
		title: 'Người dùng',
		path: 'users',
		icon: 'user',
		component: Users
	},
	{
		title: 'Tài khoản Google Ads',
		path: 'accounts',
		icon: 'appstore',
		component: AdwordsAccounts
	},
	{
		title: 'Lỗi Google Ads',
		path: 'google-ads-errors',
		icon: 'bug',
		component: GoogleAdsErrors
	},
];
