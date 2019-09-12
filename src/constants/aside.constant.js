import { Dashboard } from "../components/pages/Dashboard";
import { DemoPage } from "../components/pages/Demo";

export default [
	{
		title    : 'Dashboard',
		path     : '',
		icon     : 'home',
		component: Dashboard
	},
	{
		title    : 'Demo page',
		path     : 'demo',
		icon     : 'user',
		component: DemoPage
	}
];
