const host = process.env.REACT_APP_API_URL;

export const API = {
	login: `${host}/api/admin/users/login`,
	getPackages: `${host}/api/packages`,
	checkWebsiteCode: `${host}/api/websites/{code}`,
	updateVipDomain: `${host}/api/users/website`,
	getUsers: `${host}/api/admin/users`,
	getAccounts: `${host}/api/admin/users/accounts`,
	getGoogleAdsErrors: `${host}/api/google-ad-errors`,
	getGoogleAdsErrorsStatistic: `${host}/api/google-ad-errors/statistic`,
	statisticGoogleApiAndError: `${host}/api/admin/users/report/google-statistic`,
	getWebsites: `${host}/api/admin/websites`,
};
