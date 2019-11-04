const frontEndPrefix = '__ata__';

export const COOKIE_NAMES = {
	FRONT_END: {
		token: `${frontEndPrefix}_token`,
		user: `${frontEndPrefix}_user`,
		activeAccountId: `${frontEndPrefix}_active_account_id`,
		activeAdsAccountId:  `${frontEndPrefix}_active_ads_account_id`,
		standBy: `${frontEndPrefix}_stand_by`
	},
	token: 'token',
	user: 'user'
};
