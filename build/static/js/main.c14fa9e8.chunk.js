(window.webpackJsonpadmin=window.webpackJsonpadmin||[]).push([[0],{190:function(e,t,a){e.exports=a.p+"static/media/app-logo.ee547009.png"},326:function(e,t,a){e.exports=a(631)},331:function(e,t,a){},332:function(e,t,a){},335:function(e,t,a){},462:function(e,t,a){},463:function(e,t,a){},464:function(e,t,a){},600:function(e,t,a){},627:function(e,t,a){},628:function(e,t,a){},630:function(e,t,a){},631:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"login",(function(){return q}));var r=a(1),o=a.n(r),c=a(7),s=a.n(c),i=(a(331),a(332),a(333),a(274)),l=a(28),u=a(29),m=a(32),h=a(30),p=a(89),d=a(31),g=a(72),f=a(111),y=a(636),b=a(197),E=a(12),k=a(36),v=a(97),j=a(639),O=a(49),C=a(632),S=a(633),I=a(637),A="http://localhost:3000",w={login:"".concat(A,"/api/admin/users/login"),getPackages:"".concat(A,"/api/packages"),checkWebsiteCode:"".concat(A,"/api/websites/{code}"),updateVipDomain:"".concat(A,"/api/users/website"),getUsers:"".concat(A,"/api/admin/users"),getAccounts:"".concat(A,"/api/admin/users/accounts"),getGoogleAdsErrors:"".concat(A,"/api/admin/users/error-google-ads"),statisticGoogleApiAndError:"".concat(A,"/api/admin/users/report/google-statistic")},P=a(39),x=a.n(P);a(335);function D(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function T(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?D(a,!0).forEach((function(t){Object(v.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):D(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var N=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).getColumnSearchProps=function(e){return{filterDropdown:function(t){var n=t.setSelectedKeys,r=t.selectedKeys,c=t.confirm,s=t.clearFilters;return o.a.createElement("div",{style:{padding:8}},o.a.createElement(j.a,{ref:function(e){a.searchInput=e},placeholder:"Search ".concat(e),value:r[0],onChange:function(e){return n(e.target.value?[e.target.value]:[])},onPressEnter:function(){return a.handleSearch(r,e,c)},style:{width:188,marginBottom:8,display:"block"},autoFocus:!0}),o.a.createElement(O.a,{type:"primary",onClick:function(){return a.handleSearch(r,e,c)},icon:"search",size:"small",style:{width:90,marginRight:8}},"Search"),o.a.createElement(O.a,{onClick:function(){return a.handleReset(s)},size:"small",style:{width:90}},"Reset"))},filterIcon:function(e){return o.a.createElement(E.a,{type:"search",style:{color:e?"#f2f2f2":void 0}})}}},a.handleSearch=function(e,t,n){n(),e[0]&&a.getUsers(Object(v.a)({},t,e[0])),a.setState({searchText:e[0]})},a.handleReset=function(e){e(),a.setState({searchText:""})},a.isEmptyObj=function(e){return 0===Object.keys(e).length},a.cookies=a.props.cookies,a.token=a.cookies.get("token"),a.state={searchText:"",users:[],totalItems:0,page:1,limit:10},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.getUsers({page:this.state.page,limit:this.state.limit})}},{key:"onChangePage",value:function(e){this.state.totalItems>this.state.limit?this.getUsers({page:e,limit:this.state.limit}):this.state.searchText||this.getUsers({page:e,limit:this.state.limit}),this.setState({page:e})}},{key:"getUsers",value:function(e){var t=this,a=w.getUsers;if(!this.isEmptyObj(e))for(var n in a+="?",e)a+="&".concat(n,"=").concat(e[n]);fetch(a,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",accessToken:this.token}}).then((function(e){return e.json()})).then((function(e){var a=(e.data.entries||[]).map((function(e){return{id:e._id,name:e.name,email:e.email,phone:e.phone,googleId:e.googleId,createdAt:e.createdAt,avatar:e.avatar}}));t.setState({users:a,totalItems:a.length>0?e.data.totalItems:0})}))}},{key:"render",value:function(){var e=this,t=[T({title:"H\u1ecd v\xe0 T\xean",dataIndex:"name",key:"name"},this.getColumnSearchProps("name"),{render:function(e,t){return o.a.createElement("div",null,o.a.createElement("img",{className:"user-avatar",alt:"",src:t.avatar||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}),o.a.createElement("span",{className:"user-name"},e))}}),T({title:"Email",dataIndex:"email",key:"email"},this.getColumnSearchProps("email")),{title:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i",dataIndex:"phone",key:"phone"},{title:"Google ID",dataIndex:"googleId",key:"googleId"},{title:"Ng\xe0y tham gia",dataIndex:"createdAt",key:"createdAt",render:function(e){return o.a.createElement("span",null,x()(e).format("HH:mm DD/MM/YYYY"))}}];return o.a.createElement("div",{className:"container"},o.a.createElement(C.a,null,o.a.createElement(S.a,{span:24},o.a.createElement(I.a,{pagination:{position:"bottom",total:this.state.totalItems,pageSize:this.state.limit,current:this.state.page,onChange:function(t){return e.onChangePage(t)}},dataSource:this.state.users,columns:t,rowKey:function(e){return e.id},className:"users-table"}))))}}]),t}(r.Component),M=Object(k.b)(N);a(462);function _(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function Y(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?_(a,!0).forEach((function(t){Object(v.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):_(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var G=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).getColumnSearchProps=function(e){return{filterDropdown:function(t){var n=t.setSelectedKeys,r=t.selectedKeys,c=t.confirm,s=t.clearFilters;return o.a.createElement("div",{style:{padding:8}},o.a.createElement(j.a,{ref:function(e){a.searchInput=e},placeholder:"Search ".concat(e),value:r[0],onChange:function(e){return n(e.target.value?[e.target.value]:[])},onPressEnter:function(){return a.handleSearch(r,e,c)},style:{width:188,marginBottom:8,display:"block"},autoFocus:!0}),o.a.createElement(O.a,{type:"primary",onClick:function(){return a.handleSearch(r,e,c)},icon:"search",size:"small",style:{width:90,marginRight:8}},"Search"),o.a.createElement(O.a,{onClick:function(){return a.handleReset(s)},size:"small",style:{width:90}},"Reset"))},filterIcon:function(e){return o.a.createElement(E.a,{type:"search",style:{color:e?"#f2f2f2":void 0}})}}},a.handleSearch=function(e,t,n){n(),e[0]&&a.getAccounts(Object(v.a)({},t,e[0])),a.setState({searchText:e[0]})},a.handleReset=function(e){e(),a.setState({searchText:""})},a.isEmptyObj=function(e){return 0===Object.keys(e).length},a.cookies=a.props.cookies,a.token=a.cookies.get("token"),a.state={searchText:"",accounts:[],totalItems:0,page:1,limit:10},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.getAccounts({page:this.state.page,limit:this.state.limit})}},{key:"onChangePage",value:function(e){this.state.totalItems>this.state.limit?this.getAccounts({page:e,limit:this.state.limit}):this.state.searchText||this.getAccounts({page:e,limit:this.state.limit}),this.setState({page:e})}},{key:"getAccounts",value:function(e){var t=this,a=w.getAccounts;if(!this.isEmptyObj(e))for(var n in a+="?",e)a+="&".concat(n,"=").concat(e[n]);fetch(a,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",accessToken:this.token}}).then((function(e){return e.json()})).then((function(e){var a=(e.data.entries||[]).map((function(e){return{adsId:t.formatAdsId(e.adsId),isConnected:e.isConnected,userId:e.user,createdAt:e.createdAt}}));t.setState({accounts:a,totalItems:a.length>0?e.data.totalItems:0})}))}},{key:"formatAdsId",value:function(e){var t=e.split("");return t.splice(0,3).join("")+"-"+t.splice(0,3).join("")+"-"+t.splice(0,4).join("")}},{key:"render",value:function(){var e=this,t=[{title:function(e,t){return o.a.createElement("div",null,o.a.createElement("img",{src:"https://storage.googleapis.com/gweb-uniblog-publish-prod/images/logo_Google_Ads_192px.max-200x200.png",alt:"",className:"ggAds-icon"}),o.a.createElement("span",null,"Google Ads ID"))},dataIndex:"adsId",key:"adsId",render:function(e,t){return!0===t.isConnected?o.a.createElement("span",{style:{color:"#44b543",fontFamily:"tahoma"}},e):o.a.createElement("span",{style:{color:"crimson",fontFamily:"tahoma"}},e)}},{title:"Quy\u1ec1n qu\u1ea3n l\xfd",dataIndex:"isConnected",key:"isConnected",render:function(e){return!0===e?o.a.createElement("span",{style:{color:"#44b543"}},o.a.createElement(E.a,{type:"check"})," \u0110\xe3 ch\u1ea5p nh\u1eadn"):o.a.createElement("span",{style:{color:"crimson"}},o.a.createElement(E.a,{type:"close"})," Ch\u01b0a ch\u1ea5p nh\u1eadn")}},Y({title:"Ng\u01b0\u1eddi d\xf9ng (uid)",dataIndex:"userId",key:"userId"},this.getColumnSearchProps("userId")),{title:"Ng\xe0y th\xeam",dataIndex:"createdAt",key:"createdAt",render:function(e){return o.a.createElement("span",null,x()(e).format("HH:mm DD/MM/YYYY"))}}];return o.a.createElement("div",{className:"container"},o.a.createElement(C.a,null,o.a.createElement(S.a,{span:24},o.a.createElement(I.a,{pagination:{position:"bottom",total:this.state.totalItems,pageSize:this.state.limit,current:this.state.page,onChange:function(t){return e.onChangePage(t)}},dataSource:this.state.accounts,columns:t,rowKey:function(e){return e.adsId},className:"accounts-table",rowClassName:function(e){return!0===e.isConnected?"isConnected":"isNotConnected"}}))))}}]),t}(r.Component),H=Object(k.b)(G),F=a(634),W=(a(463),a(284)),R=a.n(W),U=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).cookies=a.props.cookies,a.token=a.cookies.get("token"),a.state={ggAdsErrors:[],totalItems:0,page:1,limit:10},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.getGoogleAdsErrors({page:this.state.page,limit:this.state.limit})}},{key:"getGoogleAdsErrors",value:function(e){var t=this,a=w.getGoogleAdsErrors;void 0!==e.page&&(a+="?page=".concat(e.page)),void 0!==e.limit&&(a+="&limit=".concat(e.limit)),fetch(a,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",accessToken:this.token}}).then((function(e){return e.json()})).then((function(e){var a=e.data.entries;t.setState({ggAdsErrors:a,totalItems:a.length>0?e.data.totalItems:0})}))}},{key:"onChangePage",value:function(e){this.getGoogleAdsErrors({page:e,limit:this.state.limit}),this.setState({page:e})}},{key:"render",value:function(){var e=this,t=[],a=function(e){"authConfig"!==e&&"error"!==e&&"params"!==e?t.push({title:e,dataIndex:e,key:e,render:function(t){return"createdAt"===e?x()(t).format("HH:mm DD/MM/YYY"):t}}):t.push({title:e,dataIndex:e,key:e,render:function(e){var t=o.a.createElement(R.a,{style:{fontSize:"12px"},data:e});return o.a.createElement(F.a,{content:t,title:"N\u1ed9i dung",placement:"bottom",trigger:"click",overlayStyle:{width:"45vw",maxHeight:"50vh"}},o.a.createElement(O.a,null,"Xem n\u1ed9i dung"))}})};for(var n in{createdAt:"",_id:"",authConfig:{},params:{},error:{},functionName:"",serviceVersion:"",serviceName:"",moduleName:""})a(n);return o.a.createElement("div",{className:"container"},o.a.createElement(C.a,null,o.a.createElement(S.a,{span:24},o.a.createElement(I.a,{pagination:{position:"bottom",total:this.state.totalItems,pageSize:this.state.limit,current:this.state.page,onChange:function(t){return e.onChangePage(t)}},dataSource:this.state.ggAdsErrors,columns:t,rowKey:function(e){return e._id},className:"gg-ads-errors-table"}))))}}]),t}(r.Component),K=Object(k.b)(U),q=(a(464),function(e,t){return{type:"LOGIN_SUCCESS",user:e,token:t}}),z=a(45),V=a(286),B=a.n(V),L=a(74),J=function(e){function t(e){var a;Object(l.a)(this,t),a=Object(m.a)(this,Object(h.a)(t).call(this,e));var n=x()().subtract(1,"month").format("DD-MM-YYYY"),r=x()().format("DD-MM-YYYY");return a.state={data:[],from:n,to:r},a.chartWrap=o.a.createRef(),a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"fetchData",value:function(){var e=this;B.a.get(w.statisticGoogleApiAndError,{params:{from:this.state.from,to:this.state.to},headers:{accesstoken:this.props.users.token}}).then((function(t){e.mapResults(t.data.data.result)}))}},{key:"mapResults",value:function(e){(e=e.map((function(e){return e.requestsNumber=e.requestsNumber||0,e._date=x()(e.date,"DD-MM-YYYY")._d,e}))).sort((function(e,t){return e._date.getTime()<t._date.getTime()?-1:e._date.getTime()===t._date.getTime()?0:1})),this.setState({data:e})}},{key:"componentDidMount",value:function(){this.fetchData()}},{key:"render",value:function(){var e={name:"Error",stroke:"red",data:[]},t={name:"Request",stroke:"blue",data:[]};this.state.data.forEach((function(a){e.data.push({date:a.date,value:a.googleAdsErrorsNumber}),t.data.push({date:a.date,value:a.requestsNumber})}));var a=[e,t];return console.log("chartWrap",this.chartWrap),o.a.createElement("div",{ref:this.chartWrap},o.a.createElement("h2",null,"Request Google Ads & Error Statistic"),o.a.createElement("h4",null,"From ",o.a.createElement("strong",null,this.state.from)," To ",o.a.createElement("strong",null,this.state.to)),o.a.createElement(L.d,{width:this.chartWrap.current?this.chartWrap.current.offsetWidth:800,height:300},o.a.createElement(L.a,{strokeDasharray:"3 3"}),o.a.createElement(L.f,{dataKey:"date",type:"category",allowDuplicatedCategory:!1}),o.a.createElement(L.g,{dataKey:"value"}),o.a.createElement(L.e,null),o.a.createElement(L.b,null),a.map((function(e){return o.a.createElement(L.c,{dataKey:"value",data:e.data,stroke:e.stroke,name:e.name,key:e.name})}))))}}]),t}(r.Component),Q=Object(z.b)((function(e){return{users:e.users}}),n)(J),X=a(117),$=a(638),Z=(a(600),X.a.Option),ee=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault(),a.props.form.validateFields((function(e,t){if(!e){var n={packageId:a.state.selectedPackage._id,code:t.code};a.checkWebsiteCode(n)}}))},a.cookies=a.props.cookies,a.token=a.cookies.get("token"),a.state={packages:[],selectedPackage:{_id:""},updatingMessage:{message:"",isSucceed:!0}},a.handleChangePackage=a.handleChangePackage.bind(Object(p.a)(a)),a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.getPackages()}},{key:"getPackages",value:function(){var e=this;fetch(w.getPackages,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",accessToken:this.token}}).then((function(e){return e.json()})).then((function(t){var a=t.data.packages.sort((function(e,t){return e.numOfDays-t.numOfDays}));e.setState({packages:a,selectedPackage:{_id:a[0]._id}})}))}},{key:"handleChangePackage",value:function(e){this.setState({selectedPackage:{_id:e}})}},{key:"checkWebsiteCode",value:function(e){var t=this,a=w.checkWebsiteCode.replace("{code}",e.code);fetch(a,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",accessToken:this.token}}).then((function(e){return 200===e.status?Promise.resolve(e.json()):Promise.reject(e.json())})).then((function(a){t.setState({domain:a.data.domain}),t.updateVipDomain(e)}),(function(e){return e.then((function(e){t.setState({updatingMessage:{message:e.messages[0],isSucceed:!1}})}))}))}},{key:"updateVipDomain",value:function(e){var t=this;fetch(w.updateVipDomain,{method:"PUT",body:JSON.stringify(e),headers:{"Content-type":"application/json; charset=UTF-8",accessToken:this.token}}).then((function(e){return 200===e.status?Promise.resolve(e.json()):Promise.reject(e.json())})).then((function(e){t.setState({updatingMessage:{message:e.messages[0],isSucceed:!0}})}),(function(e){return e.then((function(e){t.setState({updatingMessage:{message:e.essages[0],isSucceed:!1}})}))}))}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator,t=this.state.selectedPackage._id||(this.state.packages.length>0?this.state.packages[0]._id:""),a=this.state.updatingMessage.isSucceed?"#44b543":"red";return o.a.createElement("div",{className:"container"},o.a.createElement(C.a,null,o.a.createElement("p",{className:"main-title"},"C\u1eacP NH\u1eacT TH\u1edcI H\u1ea0N S\u1eec D\u1ee4NG"),o.a.createElement(S.a,{span:9}),o.a.createElement(S.a,{span:6},o.a.createElement($.a,{onSubmit:this.handleSubmit,className:"update-expiration-form"},o.a.createElement($.a.Item,null,o.a.createElement("label",null,"Ch\u1ecdn g\xf3i:",o.a.createElement(X.a,{value:t,style:{width:"100%"},placeholder:"Ch\u1ecdn g\xf3i",onChange:this.handleChangePackage},this.state.packages.map((function(e,t){return o.a.createElement(Z,{value:e._id,key:t},e.name," - ",e.numOfDays," ng\xe0y")}))))),o.a.createElement($.a.Item,null,e("code",{rules:[{required:!0,message:"Vui l\xf2ng nh\u1eadp m\xe3 website"}]})(o.a.createElement(j.a,{prefix:o.a.createElement(E.a,{type:"qrcode",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"M\xe3 website"}))),o.a.createElement("p",{style:{color:a,textAlign:"center"}},this.state.updatingMessage.message),o.a.createElement("p",null,this.state.domain?"Domain: ".concat(this.state.domain.domain):""),o.a.createElement($.a.Item,null,o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement(O.a,{type:"primary",htmlType:"submit",className:"login-form-button"},"C\u1eadp nh\u1eadt"))))),o.a.createElement(S.a,{span:9})))}}]),t}(r.Component),te=$.a.create({name:"update_expiration"})(ee),ae=[{title:"Dashboard",path:"",icon:"home",component:Q},{title:"C\u1eadp nh\u1eadt th\u1eddi h\u1ea1n s\u1eed d\u1ee5ng",path:"update-expiration",icon:"history",component:Object(k.b)(te)},{title:"Qu\u1ea3n l\xfd ng\u01b0\u1eddi d\xf9ng",path:"users",icon:"user",component:M},{title:"T\xe0i kho\u1ea3n Google Ads",path:"accounts",icon:"appstore",component:H},{title:"L\u1ed7i Google Ads",path:"google-ads-errors",icon:"bug",component:K}],ne=a(635),re=function(e){function t(e){return Object(l.a)(this,t),Object(m.a)(this,Object(h.a)(t).call(this,e))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return o.a.createElement(ne.a,{placement:"rightBottom",title:"Tho\xe1t kh\u1ecfi h\u1ec7 th\u1ed1ng?",onConfirm:this.logout,okText:"\u0110\u1ed3ng \xfd",cancelText:"H\u1ee7y"},o.a.createElement(O.a,{type:"link",style:{width:"100%",textAlign:"left",padding:"0 23px"}},o.a.createElement(E.a,{type:"logout"}),o.a.createElement("span",{style:{marginLeft:"8.5px"}},"\u0110\u0103ng xu\u1ea5t")))}}]),t}(o.a.Component),oe=(a(627),function(e){function t(e){return Object(l.a)(this,t),Object(m.a)(this,Object(h.a)(t).call(this,e))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"email"},this.props.users.user.email)}}]),t}(o.a.Component)),ce=Object(z.b)((function(e){return{users:e.users}}),n)(oe),se=y.a.Header,ie=function(e){function t(e){return Object(l.a)(this,t),Object(m.a)(this,Object(h.a)(t).call(this,e))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return o.a.createElement(se,{style:{background:"#fff",padding:0}},o.a.createElement(b.a,{theme:"dark",mode:"horizontal",defaultSelectedKeys:["2"],style:{lineHeight:"64px"}},o.a.createElement(b.a.Item,{key:"1"},"nav 1"),o.a.createElement(b.a.Item,{key:"2"},"nav 2"),o.a.createElement(b.a.Item,{key:"3"},"nav 3")),o.a.createElement("div",{className:"logo"},this.props.users.user.email))}}]),t}(r.Component),le=Object(z.b)((function(e){return{users:e.users}}),n)(ie),ue=a(190),me=a.n(ue),he=(a(628),y.a.Header,y.a.Footer),pe=y.a.Sider,de=y.a.Content,ge=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).isAuthenticated=!1,a.logout=a.logout.bind(Object(p.a)(a)),a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"UNSAFE_componentWillMount",value:function(){var e=this.props.cookies,t=e.get("token"),a=e.get("user");this.isAuthenticated=!!t&&!!a,this.isAuthenticated&&this.props.login(a,t)}},{key:"logout",value:function(){this.props.cookies.remove("token",{path:"/"}),this.props.history.push("/login")}},{key:"render",value:function(){var e=this,t=function(t){var a=t.component,n=Object(i.a)(t,["component"]);return o.a.createElement(g.b,Object.assign({},n,{render:function(t){return e.isAuthenticated?o.a.createElement(a,t):o.a.createElement(g.a,{to:{pathname:"/login",state:{from:t.location}}})}}))};return o.a.createElement(y.a,null,o.a.createElement(pe,{style:{overflow:"auto",height:"100vh",position:"fixed",left:0}},o.a.createElement("div",{className:"logo"},o.a.createElement("img",{src:me.a})),o.a.createElement(ce,null),o.a.createElement(b.a,{theme:"dark",mode:"inline",defaultSelectedKeys:["0"]},ae.map((function(t,a){return o.a.createElement(b.a.Item,{key:a},o.a.createElement(E.a,{type:t.icon}),o.a.createElement("span",{className:"nav-text"},t.title),o.a.createElement(f.b,{to:"".concat(e.props.match.path,"/").concat(t.path)}))}))),o.a.createElement(re,null)),o.a.createElement(y.a,{style:{marginLeft:250}},o.a.createElement(le,null),o.a.createElement(de,{style:{margin:"24px 16px 0",overflow:"initial"}},o.a.createElement("div",{style:{padding:24,background:"#fff",textAlign:"center"}},o.a.createElement("div",null,ae.map((function(a,n){return""===a.path?o.a.createElement(t,{key:n,component:a.component,exact:!0,path:"".concat(e.props.match.path,"/").concat(a.path)}):o.a.createElement(t,{key:n,component:a.component,path:"".concat(e.props.match.path,"/").concat(a.path)})}))))),o.a.createElement(he,{style:{textAlign:"center"}},"Click CPanel \xa92019 Created by Appnet Technology")))}}]),t}(r.Component),fe=Object(z.b)((function(e){return{user:e.user}}),n)(Object(k.b)(Object(g.g)(ge))),ye=(a(630),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault(),a.props.form.validateFields((function(e,t){if(!e){var n={email:t.email,password:t.password};fetch(w.login,{method:"POST",body:JSON.stringify(n),headers:{"Content-type":"application/json; charset=UTF-8"}}).then((function(e){return 200===e.status?Promise.resolve(e.json()):Promise.reject(e.json())})).then((function(e){var t=a.props.cookies,n=e.data.meta.token,r=e.data.user;a.props.login(r,n),t.set("token",n,{path:"/"}),t.set("user",r,{path:"/"}),setTimeout((function(){a.props.history.push("/dashboard")}),1e3)}),(function(e){return e.then((function(e){a.setState({loginMessage:e.messages[0]})}))}))}}))},a.state={loginMessage:""},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentWillMount",value:function(){var e=this;this.props.cookies.get("token")&&setTimeout((function(){e.props.history.push("/dashboard")}),1e3)}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return o.a.createElement("div",null,o.a.createElement(C.a,null,o.a.createElement(S.a,{span:9}),o.a.createElement(S.a,{span:6},o.a.createElement($.a,{onSubmit:this.handleSubmit,className:"login-form"},o.a.createElement("div",{className:"form-title"},"Click CPanel"),o.a.createElement("div",{className:"logo"},o.a.createElement("img",{src:a(190),alt:"..."})),o.a.createElement($.a.Item,null,e("email",{rules:[{required:!0,message:"Vui l\xf2ng nh\u1eadp email"}]})(o.a.createElement(j.a,{prefix:o.a.createElement(E.a,{type:"user"}),placeholder:"Email"}))),o.a.createElement($.a.Item,null,e("password",{rules:[{required:!0,message:"Vui l\xf2ng nh\u1eadp m\u1eadt kh\u1ea9u"}]})(o.a.createElement(j.a,{prefix:o.a.createElement(E.a,{type:"lock"}),type:"password",placeholder:"M\u1eadt kh\u1ea9u"}))),o.a.createElement("p",{style:{color:"red",textAlign:"center"}},this.state.loginMessage),o.a.createElement($.a.Item,null,o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement(O.a,{type:"danger",htmlType:"submit",className:"login-form-button"},"\u0110\u0102NG NH\u1eacP"))))),o.a.createElement(S.a,{span:9})))}}]),t}(r.Component)),be=$.a.create({name:"normal_login"})(ye),Ee=Object(k.b)(Object(z.b)((function(e){return{user:e.user}}),n)(be)),ke=a(91),ve=Object(ke.b)({users:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(console.log(t),t.type){case"LOGIN_SUCCESS":return{user:t.user,token:t.token};default:return e}}}),je=Object(ke.c)(ve,{});var Oe=function(){return o.a.createElement(k.a,null,o.a.createElement(f.a,null,o.a.createElement(z.a,{store:je},o.a.createElement(g.d,null,o.a.createElement(g.b,{path:"/login",component:Ee}),o.a.createElement(g.b,{path:"/dashboard",render:function(){return o.a.createElement(fe,null)}}),o.a.createElement(g.b,{path:"/**",render:function(){return o.a.createElement(g.a,{to:{pathname:"/dashboard"}})}})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(Oe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[326,1,2]]]);
//# sourceMappingURL=main.c14fa9e8.chunk.js.map