export const API = {
	login: process.env.REACT_APP_API_URL + '/api/admin/users/login',
	getPackages: process.env.REACT_APP_API_URL + '/api/packages',
	checkWebsiteCode: process.env.REACT_APP_API_URL + '/api/websites/{code}',
	updateVipDomain: process.env.REACT_APP_API_URL + '/api/users/website',
	getUsers: process.env.REACT_APP_API_URL + '/api/admin/users',
	getAccounts: process.env.REACT_APP_API_URL + '/api/admin/users/accounts',
	getGoogleAdsErrors: process.env.REACT_APP_API_URL + '/api/admin/users/error-google-ads',
}
