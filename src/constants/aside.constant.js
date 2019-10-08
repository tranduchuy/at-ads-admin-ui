import Users from "../components/pages/Users/Users";
import AdwordsAccounts from "../components/pages/Adwords-accounts/Adwords-accounts";
import GoogleAdsErrors from "../components/pages/Google-ads-errors/Google-ads-errors";
import Dashboard  from "../components/pages/Dashboard/Dashboard";
import ExpirationUpdating from "../components/pages/Expiration-updating/Expiration-updating";
import Websites from "../components/pages/Websites/websites";

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
		title: 'Quản lý người dùng',
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
		title: 'Quản lý websites',
		path: 'websites',
		icon: 'chrome',
		component: Websites
	},
	{
		title: 'Lỗi Google Ads',
		path: 'google-ads-errors',
		icon: 'bug',
		component: GoogleAdsErrors
	}
];
