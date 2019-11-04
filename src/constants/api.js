import secret from '../config/secret';

export const API = {
	login: `${secret.API}/api/admin/users/login`,
	info: `${secret.API}/api/users/info`,
	getPackages: `${secret.API}/api/packages`,
	checkWebsiteCode: `${secret.API}/api/websites/{code}`,
	updateVipDomain: `${secret.API}/api/users/website`,
	getUsers: `${secret.API}/api/admin/users`,
	getAccounts: `${secret.API}/api/admin/users/accounts`,
	getGoogleAdsErrors: `${secret.API}/api/google-ad-errors`,
	getGoogleAdsErrorsStatistic: `${secret.API}/api/google-ad-errors/statistic`,
	statisticGoogleApiAndError: `${secret.API}/api/admin/users/report/google-statistic`,
	getWebsites: `${secret.API}/api/admin/websites`,
	checkScriptWebsite: `${secret.API}/api/admin/websites/{code}/recheck-tracking-code`,
	updateUserLicence: `${secret.API}/api/admin/user-licences`,
	updateAccountLimitWebsite: `${secret.API}/api/admin/account-ads/limit-website`,
	statisticOverview: `${secret.API}/api/admin/statistic`,
	getOrders: `${secret.API}/api/admin/order`,
};
