import { Dashboard } from "../components/pages/Dashboard";
import ExpirationUpdating from "../components/pages/Expiration-updating";
import Users from "../components/pages/Users/Users";

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
		icon: 'sync',
		component: ExpirationUpdating
	},
	{
		title: 'Người dùng',
		path: 'users',
		icon: 'user',
		component: Users
	}
];
