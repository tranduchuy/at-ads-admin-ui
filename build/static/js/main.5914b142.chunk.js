(window.webpackJsonpadmin=window.webpackJsonpadmin||[]).push([[0],{191:function(e,t,a){e.exports=a.p+"static/media/app-logo.ee547009.png"},328:function(e,t,a){e.exports=a(636)},333:function(e,t,a){},334:function(e,t,a){},337:function(e,t,a){},465:function(e,t,a){},466:function(e,t,a){},484:function(e,t,a){},603:function(e,t,a){},630:function(e,t,a){},632:function(e,t,a){},633:function(e,t,a){},634:function(e,t,a){},635:function(e,t,a){},636:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"login",(function(){return M})),a.d(n,"setAppLoading",(function(){return W})),a.d(n,"websites",(function(){return G})),a.d(n,"checkAttachedScript",(function(){return Y}));var r={API:"https://api.staging.click.apte.asia",MAIN_DOMAIN:".staging.click.apte.asia",FRONT_END_DOMAIN:"https://staging.click.apte.asia"},o=a(1),i=a.n(o),s=a(7),c=a.n(s),l=(a(333),a(334),a(335),a(275)),u=a(16),p=a(17),m=a(20),d=a(18),h=a(19),g=a(74),f=a(83),b=a(641),y=a(198),k=a(12),E=a(34),v=a(51),O=a(644),j=a(52),C=a(637),I=a(638),S=a(642),A={login:"".concat(r.API,"/api/admin/users/login"),getPackages:"".concat(r.API,"/api/packages"),checkWebsiteCode:"".concat(r.API,"/api/websites/{code}"),updateVipDomain:"".concat(r.API,"/api/users/website"),getUsers:"".concat(r.API,"/api/admin/users"),getAccounts:"".concat(r.API,"/api/admin/users/accounts"),getGoogleAdsErrors:"".concat(r.API,"/api/google-ad-errors"),getGoogleAdsErrorsStatistic:"".concat(r.API,"/api/google-ad-errors/statistic"),statisticGoogleApiAndError:"".concat(r.API,"/api/admin/users/report/google-statistic"),getWebsites:"".concat(r.API,"/api/admin/websites"),checkScriptWebsite:"".concat(r.API,"/api/admin/websites/{code}/recheck-tracking-code")},w=a(36),P=a.n(w),T=(a(337),{FRONT_END:{token:"__ata___token",user:"__ata___user",activeAccountId:"__ata___active_account_id",activeAdsAccountId:"__ata___active_ads_account_id",standBy:"__ata___stand_by"},token:"token",user:"user"}),_=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).abortController=new AbortController,a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentWillUnmount",value:function(){this.abortController.abort()}}]),t}(i.a.Component),N=a(46),D=a(97),x=a(28),M=function(e,t){return{type:"LOGIN_SUCCESS",user:e,token:t}},W=function(e){return{type:"APP_LOADING",isLoading:e}},G=function(e){return{type:"LIST_WEBSITES",websites:e}},Y=function(e){return{type:"CHECKING_ATTACH_SCRIPT",website:e}},L=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).secret=r,a.onClick=a.onClick.bind(Object(N.a)(a)),a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"onClick",value:function(){var e=this;this.props.setAppLoading(!0);var t=this.props.cookies,a=JSON.parse(JSON.stringify(this.props.user));a._id=a.id,console.log(r),t.set(T.FRONT_END.user,a,{path:"/",domain:r.MAIN_DOMAIN}),t.set(T.FRONT_END.standBy,this.props.users.user,{path:"/",domain:r.MAIN_DOMAIN}),t.set(T.FRONT_END.token,this.props.users.token,{path:"/",domain:r.MAIN_DOMAIN}),setTimeout((function(){window.open(e.secret.FRONT_END_DOMAIN,"_blank"),e.props.setAppLoading(!1)}),1e3)}},{key:"render",value:function(){return i.a.createElement(D.a,{title:"Thay quy\u1ec1n"},i.a.createElement(j.a,{size:"small",onClick:this.onClick},i.a.createElement(k.a,{type:"login"})))}}]),t}(i.a.Component),R=Object(x.b)((function(e){return{users:e.users}}),n)(Object(E.b)(L));function F(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function H(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?F(a,!0).forEach((function(t){Object(v.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):F(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var K=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).getColumnSearchProps=function(e){return{filterDropdown:function(t){var n=t.setSelectedKeys,r=t.selectedKeys,o=t.confirm,s=t.clearFilters;return i.a.createElement("div",{style:{padding:8}},i.a.createElement(O.a,{ref:function(e){a.searchInput=e},placeholder:"Search ".concat(e),value:r[0],onChange:function(e){return n(e.target.value?[e.target.value]:[])},onPressEnter:function(){return a.handleSearch(r,e,o)},style:{width:188,marginBottom:8,display:"block"},autoFocus:!0}),i.a.createElement(j.a,{type:"primary",onClick:function(){return a.handleSearch(r,e,o)},icon:"search",size:"small",style:{width:90,marginRight:8}},"Search"),i.a.createElement(j.a,{onClick:function(){return a.handleReset(s)},size:"small",style:{width:90}},"Reset"))},filterIcon:function(e){return i.a.createElement(k.a,{type:"search",style:{color:e?"#f2f2f2":void 0}})}}},a.handleSearch=function(e,t,n){n(),e[0]&&a.getUsers(Object(v.a)({},t,e[0])),a.setState({searchText:e[0]})},a.handleReset=function(e){e(),a.setState({searchText:""})},a.isEmptyObj=function(e){return 0===Object.keys(e).length},a.cookies=a.props.cookies,a.token=a.cookies.get(T.token),a.state={searchText:"",users:[],totalItems:0,page:1,limit:10},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.getUsers({page:this.state.page,limit:this.state.limit})}},{key:"onChangePage",value:function(e){this.state.totalItems>this.state.limit?this.getUsers({page:e,limit:this.state.limit}):this.state.searchText||this.getUsers({page:e,limit:this.state.limit}),this.setState({page:e})}},{key:"getUsers",value:function(e){var t=this,a=A.getUsers;if(!this.isEmptyObj(e))for(var n in a+="?",e)e.hasOwnProperty(n)&&(a+="&".concat(n,"=").concat(e[n]));fetch(a,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",accessToken:this.token},signal:this.abortController.signal}).then((function(e){return e.json()})).then((function(e){var a=(e.data.entries||[]).map((function(e){return{id:e._id,name:e.name,email:e.email,phone:e.phone,googleId:e.googleId,createdAt:e.createdAt,avatar:e.avatar}}));t.setState({users:a,totalItems:a.length>0?e.data.totalItems:0})}))}},{key:"render",value:function(){var e=this,t=[{title:"H\xe0nh \u0111\u1ed9ng",key:"id",render:function(e,t){return i.a.createElement(R,{user:t})}},H({title:"H\u1ecd v\xe0 T\xean",dataIndex:"name",key:"name"},this.getColumnSearchProps("name"),{render:function(e,t){return i.a.createElement("div",null,i.a.createElement("img",{className:"user-avatar",alt:"",src:t.avatar||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}),i.a.createElement("span",{className:"user-name"},e))}}),H({title:"Email",dataIndex:"email",key:"email"},this.getColumnSearchProps("email")),{title:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i",dataIndex:"phone",key:"phone"},{title:"Google ID",dataIndex:"googleId",key:"googleId"},{title:"Ng\xe0y tham gia",dataIndex:"createdAt",key:"createdAt",render:function(e){return i.a.createElement("span",null,P()(e).format("HH:mm DD/MM/YYYY"))}}],a={position:"bottom",total:this.state.totalItems,pageSize:this.state.limit,current:this.state.page,onChange:function(t){return e.onChangePage(t)}};return i.a.createElement("div",{className:"container"},i.a.createElement(C.a,null,i.a.createElement(I.a,{span:24},i.a.createElement(S.a,{pagination:a,dataSource:this.state.users,columns:t,rowKey:function(e){return e.id},className:"users-table"}))))}}]),t}(_),U=Object(E.b)(K);a(465);function z(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function B(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?z(a,!0).forEach((function(t){Object(v.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):z(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var q=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).getColumnSearchProps=function(e){return{filterDropdown:function(t){var n=t.setSelectedKeys,r=t.selectedKeys,o=t.confirm,s=t.clearFilters;return i.a.createElement("div",{style:{padding:8}},i.a.createElement(O.a,{ref:function(e){a.searchInput=e},placeholder:"Search ".concat(e),value:r[0],onChange:function(e){return n(e.target.value?[e.target.value]:[])},onPressEnter:function(){return a.handleSearch(r,e,o)},style:{width:188,marginBottom:8,display:"block"},autoFocus:!0}),i.a.createElement(j.a,{type:"primary",onClick:function(){return a.handleSearch(r,e,o)},icon:"search",size:"small",style:{width:90,marginRight:8}},"Search"),i.a.createElement(j.a,{onClick:function(){return a.handleReset(s)},size:"small",style:{width:90}},"Reset"))},filterIcon:function(e){return i.a.createElement(k.a,{type:"search",style:{color:e?"#f2f2f2":void 0}})}}},a.handleSearch=function(e,t,n){n(),e[0]&&a.getAccounts(Object(v.a)({},t,e[0])),a.setState({searchText:e[0]})},a.handleReset=function(e){e(),a.setState({searchText:""})},a.isEmptyObj=function(e){return 0===Object.keys(e).length},a.cookies=a.props.cookies,a.token=a.cookies.get(T.token),a.state={searchText:"",accounts:[],totalItems:0,page:1,limit:10},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.getAccounts({page:this.state.page,limit:this.state.limit})}},{key:"onChangePage",value:function(e){this.state.totalItems>this.state.limit?this.getAccounts({page:e,limit:this.state.limit}):this.state.searchText||this.getAccounts({page:e,limit:this.state.limit}),this.setState({page:e})}},{key:"getAccounts",value:function(e){var t=this,a=A.getAccounts;if(!this.isEmptyObj(e))for(var n in a+="?",e)e.hasOwnProperty(n)&&(a+="&".concat(n,"=").concat(e[n]));this.props.setAppLoading(!0),fetch(a,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",accessToken:this.token},signal:this.abortController.signal}).then((function(e){return e.json()})).then((function(e){var a=(e.data.entries||[]).map((function(e){return{adsId:t.formatAdsId(e.adsId),isConnected:e.isConnected,email:e.userInfo.email,domain:e.websiteInfo?e.websiteInfo.map((function(e){return e.domain})):[],createdAt:e.createdAt}}));t.setState({accounts:a,totalItems:a.length>0?e.data.totalItems:0}),setTimeout((function(){t.props.setAppLoading(!1)}),500)}))}},{key:"formatAdsId",value:function(e){var t=e.split("");return t.splice(0,3).join("")+"-"+t.splice(0,3).join("")+"-"+t.splice(0,4).join("")}},{key:"render",value:function(){var e=this,t=[{title:function(e,t){return i.a.createElement("div",null,i.a.createElement("img",{src:"https://storage.googleapis.com/gweb-uniblog-publish-prod/images/logo_Google_Ads_192px.max-200x200.png",alt:"",className:"ggAds-icon"}),i.a.createElement("span",null,"Google Ads ID"))},dataIndex:"adsId",key:"adsId",render:function(e,t){return i.a.createElement("span",{style:{color:t.isConnected?"#44b543":"crimson",fontFamily:"tahoma",fontWeight:"bold"}},e)}},{title:"Quy\u1ec1n qu\u1ea3n l\xfd",dataIndex:"isConnected",key:"isConnected",render:function(e){return!0===e?i.a.createElement("div",{style:{color:"#44b543"}},i.a.createElement(k.a,{type:"check"})):i.a.createElement("div",{style:{color:"crimson"}},i.a.createElement(k.a,{type:"close"}))}},B({title:"Email",dataIndex:"email",key:"email"},this.getColumnSearchProps("email")),{title:"T\xean mi\u1ec1n",dataIndex:"domain",key:"domain",render:function(e){return e.map((function(e,t){return i.a.createElement("div",{key:t},i.a.createElement("a",{href:e,target:" _blank"},e))}))}},{title:"Ng\xe0y t\u1ea1o",dataIndex:"createdAt",key:"createdAt",render:function(e){return i.a.createElement("span",null,P()(e).format("HH:mm DD/MM/YYYY"))}}];return i.a.createElement("div",{className:"container"},i.a.createElement(C.a,null,i.a.createElement(I.a,{span:24},i.a.createElement(S.a,{pagination:{position:"bottom",total:this.state.totalItems,pageSize:this.state.limit,current:this.state.page,onChange:function(t){return e.onChangePage(t)}},dataSource:this.state.accounts,columns:t,rowKey:function(e){return e.adsId},className:"accounts-table",rowClassName:function(e){return!0===e.isConnected?"isConnected":"isNotConnected"}}))))}}]),t}(_),V=Object(x.b)(null,n)(Object(E.b)(q)),J=a(639),Q=(a(466),a(287)),X=a.n(Q),$=a(94),Z=a.n($),ee=a(288),te=a.n(ee),ae={chart:{plotBackgroundColor:null,plotBorderWidth:null,plotShadow:!1,type:"pie"},title:{text:"Statistic type of Google Ads Error"},tooltip:{pointFormat:"{series.name}: <b>{point.percentage:.1f}%</b>"},plotOptions:{pie:{allowPointSelect:!0,cursor:"pointer",dataLabels:{enabled:!0,format:"<b>{point.name}</b>: {point.percentage:.1f} %"}}},series:[{name:"Brands",colorByPoint:!0,data:[]}]},ne=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).cookies=a.props.cookies,a.token=a.cookies.get(T.token),a.state={ggAdsErrors:[],totalItems:0,page:1,limit:10,statistic:[]},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.getGoogleAdsErrors({page:this.state.page,limit:this.state.limit}),this.getStatistic()}},{key:"getStatistic",value:function(){var e=this;Z.a.get(A.getGoogleAdsErrorsStatistic,{headers:{accessToken:this.token},signal:this.abortController.signal}).then((function(t){e.setState({statistic:t.data.data})}))}},{key:"getGoogleAdsErrors",value:function(e){var t=this,a=A.getGoogleAdsErrors;void 0!==e.page&&(a+="?page=".concat(e.page)),void 0!==e.limit&&(a+="&limit=".concat(e.limit)),fetch(a,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",accessToken:this.token}}).then((function(e){return e.json()})).then((function(e){var a=e.data.entries;t.setState({ggAdsErrors:a,totalItems:a.length>0?e.data.totalItems:0})}))}},{key:"onChangePage",value:function(e){this.getGoogleAdsErrors({page:e,limit:this.state.limit}),this.setState({page:e})}},{key:"render",value:function(){var e=this,t=[],a=function(e){"authConfig"!==e&&"error"!==e&&"params"!==e?t.push({title:e,dataIndex:e,key:e,render:function(t){return"createdAt"===e?P()(t).format("HH:mm DD/MM/YYY"):t}}):t.push({title:e,dataIndex:e,key:e,render:function(e){var t=i.a.createElement(X.a,{style:{fontSize:"12px"},data:e});return i.a.createElement(J.a,{content:t,title:"N\u1ed9i dung",placement:"bottom",trigger:"click",overlayStyle:{width:"45vw",maxHeight:"50vh"}},i.a.createElement(j.a,null,"Xem n\u1ed9i dung"))}})};for(var n in{createdAt:{},reason:{},authConfig:{},params:{},error:{},functionName:"",serviceVersion:"",serviceName:"",moduleName:""})a(n);ae.series[0].data=[],this.state.statistic.forEach((function(e){ae.series[0].data.push({name:e._id,y:e.count})}));var r={position:"bottom",total:this.state.totalItems,pageSize:this.state.limit,current:this.state.page,onChange:function(t){return e.onChangePage(t)}};return i.a.createElement("div",null,i.a.createElement("div",{className:"container",style:{overflow:"auto"}},i.a.createElement(C.a,null,i.a.createElement(I.a,{span:24},i.a.createElement(te.a,{config:ae})))),i.a.createElement("div",{className:"container"},i.a.createElement(C.a,null,i.a.createElement(I.a,{span:24},i.a.createElement(S.a,{pagination:r,dataSource:this.state.ggAdsErrors,columns:t,rowKey:function(e){return e._id},className:"gg-ads-errors-table"})))))}}]),t}(_),re=Object(E.b)(ne),oe=(a(484),a(76)),ie=function(e){function t(e){var a;Object(u.a)(this,t),a=Object(m.a)(this,Object(d.a)(t).call(this,e));var n=P()().subtract(1,"month").format("DD-MM-YYYY"),r=P()().format("DD-MM-YYYY");return a.state={data:[],from:n,to:r},a.chartWrap=i.a.createRef(),a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"fetchData",value:function(){var e=this;this.props.setAppLoading(!0),Z.a.get(A.statisticGoogleApiAndError,{params:{from:this.state.from,to:this.state.to},headers:{accesstoken:this.props.users.token},signal:this.abortController.signal}).then((function(t){e.mapResults(t.data.data.result),setTimeout((function(){e.props.setAppLoading(!1)}),500)}))}},{key:"mapResults",value:function(e){(e=e.map((function(e){return e.requestsNumber=e.requestsNumber||0,e._date=P()(e.date,"DD-MM-YYYY")._d,e}))).sort((function(e,t){return e._date.getTime()<t._date.getTime()?-1:e._date.getTime()===t._date.getTime()?0:1})),this.setState({data:e})}},{key:"componentDidMount",value:function(){this.fetchData()}},{key:"render",value:function(){var e={name:"Error",stroke:"red",data:[]},t={name:"Request",stroke:"blue",data:[]};this.state.data.forEach((function(a){e.data.push({date:a.date,value:a.googleAdsErrorsNumber}),t.data.push({date:a.date,value:a.requestsNumber})}));var a=[e,t];return console.log("chartWrap",this.chartWrap),i.a.createElement("div",{ref:this.chartWrap},i.a.createElement("h2",null,"Request Google Ads & Error Statistic"),i.a.createElement("h4",null,"From ",i.a.createElement("strong",null,this.state.from)," To ",i.a.createElement("strong",null,this.state.to)),i.a.createElement(oe.d,{width:this.chartWrap.current?this.chartWrap.current.offsetWidth:800,height:300},i.a.createElement(oe.a,{strokeDasharray:"3 3"}),i.a.createElement(oe.f,{dataKey:"date",type:"category",allowDuplicatedCategory:!1}),i.a.createElement(oe.g,{dataKey:"value"}),i.a.createElement(oe.e,null),i.a.createElement(oe.b,null),a.map((function(e){return i.a.createElement(oe.c,{dataKey:"value",data:e.data,stroke:e.stroke,name:e.name,key:e.name})}))))}}]),t}(_),se=Object(x.b)((function(e){return{users:e.users}}),n)(ie),ce=a(118),le=a(643),ue=(a(603),ce.a.Option),pe=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault(),a.props.form.validateFields((function(e,t){if(!e){var n={packageId:a.state.selectedPackage._id,code:t.code};a.checkWebsiteCode(n)}}))},a.cookies=a.props.cookies,a.token=a.cookies.get(T.token),a.state={packages:[],selectedPackage:{_id:""},updatingMessage:{message:"",isSucceed:!0}},a.handleChangePackage=a.handleChangePackage.bind(Object(N.a)(a)),a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.getPackages()}},{key:"getPackages",value:function(){var e=this;fetch(A.getPackages,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",accessToken:this.token},signal:this.abortController.signal}).then((function(e){return e.json()})).then((function(t){var a=t.data.packages.sort((function(e,t){return e.numOfDays-t.numOfDays}));e.setState({packages:a,selectedPackage:{_id:a[0]._id}})}))}},{key:"handleChangePackage",value:function(e){this.setState({selectedPackage:{_id:e}})}},{key:"checkWebsiteCode",value:function(e){var t=this,a=A.checkWebsiteCode.replace("{code}",e.code);fetch(a,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",accessToken:this.token}}).then((function(e){return 200===e.status?Promise.resolve(e.json()):Promise.reject(e.json())})).then((function(a){t.setState({domain:a.data.domain}),t.updateVipDomain(e)}),(function(e){return e.then((function(e){t.setState({updatingMessage:{message:e.messages[0],isSucceed:!1}})}))}))}},{key:"updateVipDomain",value:function(e){var t=this;fetch(A.updateVipDomain,{method:"PUT",body:JSON.stringify(e),headers:{"Content-type":"application/json; charset=UTF-8",accessToken:this.token}}).then((function(e){return 200===e.status?Promise.resolve(e.json()):Promise.reject(e.json())})).then((function(e){t.setState({updatingMessage:{message:e.messages[0],isSucceed:!0}})}),(function(e){return e.then((function(e){t.setState({updatingMessage:{message:e.essages[0],isSucceed:!1}})}))}))}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator,t=this.state.selectedPackage._id||(this.state.packages.length>0?this.state.packages[0]._id:""),a=this.state.updatingMessage.isSucceed?"#44b543":"red",n=this.props.location.search?this.props.location.search.split("=")[1]:"";return i.a.createElement("div",{className:"container"},i.a.createElement(C.a,null,i.a.createElement("p",{className:"main-title"},"C\u1eacP NH\u1eacT TH\u1edcI H\u1ea0N S\u1eec D\u1ee4NG"),i.a.createElement(I.a,{span:9}),i.a.createElement(I.a,{span:6},i.a.createElement(le.a,{onSubmit:this.handleSubmit,className:"update-expiration-form"},i.a.createElement(le.a.Item,null,i.a.createElement("label",null,"Ch\u1ecdn g\xf3i:",i.a.createElement(ce.a,{value:t,style:{width:"100%"},placeholder:"Ch\u1ecdn g\xf3i",onChange:this.handleChangePackage},this.state.packages.map((function(e,t){return i.a.createElement(ue,{value:e._id,key:t},e.name," - ",e.numOfDays," ng\xe0y")}))))),i.a.createElement(le.a.Item,null,e("code",{rules:[{required:!0,message:"Vui l\xf2ng nh\u1eadp m\xe3 website"}],initialValue:n})(i.a.createElement(O.a,{prefix:i.a.createElement(k.a,{type:"qrcode",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"M\xe3 website"}))),i.a.createElement("p",{style:{color:a,textAlign:"center"}},this.state.updatingMessage.message),i.a.createElement("p",null,this.state.domain?"Domain: ".concat(this.state.domain.domain):""),i.a.createElement(le.a.Item,null,i.a.createElement("div",{style:{textAlign:"center"}},i.a.createElement(j.a,{type:"primary",htmlType:"submit",className:"login-form-button"},"C\u1eadp nh\u1eadt"))))),i.a.createElement(I.a,{span:9})))}}]),t}(_),me=le.a.create({name:"update_expiration"})(pe),de=Object(E.b)(me),he=(a(630),function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).abortController=new AbortController,a.state={isLoading:!1,record:e.record},a.onClick=a.onClick.bind(Object(N.a)(a)),a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"stopSpinning",value:function(){var e=this;setTimeout((function(){e.setState({isLoading:!1})}),500)}},{key:"onClick",value:function(){var e=this;console.log(this.props),this.setState({isLoading:!0}),Z()({method:"PUT",url:A.checkScriptWebsite.replace("{code}",this.props.record.code),headers:{Accept:"application/json","Content-Type":"application/json",accessToken:this.props.users.token},signal:this.abortController.signal}).then((function(t){e.setState({record:t.data.data.website}),e.stopSpinning()})).catch((function(t){console.log(t),e.stopSpinning()}))}},{key:"componentWillUnmount",value:function(){this.abortController.abort()}},{key:"render",value:function(){var e=i.a.createElement(k.a,{type:"loading",spin:!0});return i.a.createElement("div",null,i.a.createElement(D.a,{placement:"topLeft",title:"Ki\u1ec3m tra g\u1eafn m\xe3"},i.a.createElement("span",{className:"recheck-website-tracking",onClick:this.onClick},this.state.isLoading?e:i.a.createElement(k.a,{type:"reload"}))),i.a.createElement("a",{href:this.props.text,target:" _blank",style:{color:this.props.record.isTracking?"#44b543":"crimson",fontFamily:"tahoma"}},this.props.text))}}]),t}(i.a.Component)),ge=Object(x.b)((function(e){return{websites:e.websites,users:e.users}}),n)(he);function fe(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function be(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?fe(a,!0).forEach((function(t){Object(v.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):fe(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var ye=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).paginationConfig={},a.getColumnSearchProps=function(e){return{filterDropdown:function(t){var n=t.setSelectedKeys,r=t.selectedKeys,o=t.confirm,s=t.clearFilters;return i.a.createElement("div",{style:{padding:8}},i.a.createElement(O.a,{ref:function(e){a.searchInput=e},placeholder:"Search ".concat(e),value:r[0],onChange:function(e){return n(e.target.value?[e.target.value]:[])},onPressEnter:function(){return a.handleSearch(r,e,o)},style:{width:188,marginBottom:8,display:"block"},autoFocus:!0}),i.a.createElement(j.a,{type:"primary",onClick:function(){return a.handleSearch(r,e,o)},icon:"search",size:"small",style:{width:90,marginRight:8}},"Search"),i.a.createElement(j.a,{onClick:function(){return a.handleReset(s)},size:"small",style:{width:90}},"Reset"))},filterIcon:function(e){return i.a.createElement(k.a,{type:"search",style:{color:e?"#f2f2f2":void 0}})}}},a.handleSearch=function(e,t,n){n(),e[0]&&a.getWebsites(Object(v.a)({},t,e[0])),a.setState({searchText:e[0]})},a.handleReset=function(e){e(),a.setState({searchText:""})},a.isEmptyObj=function(e){return 0===Object.keys(e).length},a.cookies=a.props.cookies,a.token=a.cookies.get(T.token),a.state={searchText:"",websites:[],totalItems:0,page:1,limit:10},a.paginationConfig={position:"bottom",total:a.state.totalItems,pageSize:a.state.limit,current:a.state.page,onChange:function(e){return a.onChangePage(e)}},a.onClickRecheckWebsite=a.onClickRecheckWebsite.bind(Object(N.a)(a)),a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.getWebsites({page:this.state.page,limit:this.state.limit})}},{key:"onChangePage",value:function(e){this.state.totalItems>this.state.limit?this.getWebsites({page:e,limit:this.state.limit}):this.state.searchText||this.getWebsites({page:e,limit:this.state.limit}),this.setState({page:e})}},{key:"getWebsites",value:function(e){var t=this,a=A.getWebsites;if(!this.isEmptyObj(e))for(var n in a+="?",e)e.hasOwnProperty(n)&&(a+="&".concat(n,"=").concat(e[n]));this.props.setAppLoading(!0),fetch(a,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",accessToken:this.token},signal:this.abortController.signal}).then((function(e){return e.json()})).then((function(e){var a=(e.data.entries||[]).map((function(e){return{domain:e.domain,isTracking:e.isTracking,adsId:e.accountInfo?e.accountInfo.adsId:"",email:e.userInfo?e.userInfo.email:"",expiredAt:e.expiredAt,createdAt:e.createdAt,code:e.code,websiteCode:e.code}}));t.setState({websites:a,totalItems:a.length>0?e.data.totalItems:0}),setTimeout((function(){t.props.setAppLoading(!1)}),500)}))}},{key:"onClickRecheckWebsite",value:function(e){}},{key:"render",value:function(){var e=this,t=[{title:function(e,t){return i.a.createElement("div",null,i.a.createElement(k.a,{type:"chrome",className:"ggAds-icon"}),i.a.createElement("span",null,"Domain"))},dataIndex:"domain",key:"domain",render:function(t,a){return i.a.createElement(ge,{text:t,onClick:e.onClickRecheckWebsite,record:a})}},{title:"Code",dataIndex:"websiteCode",key:"websiteCode",render:function(e){return i.a.createElement("span",null,e)}},{title:"G\u1eafn tracking",dataIndex:"isTracking",key:"isTracking",render:function(e){return!0===e?i.a.createElement("span",{style:{color:"#44b543"}},i.a.createElement(k.a,{type:"check"})," \u0110\xe3 g\u1eafn"):i.a.createElement("span",{style:{color:"crimson"}},i.a.createElement(k.a,{type:"close"})," Ch\u01b0a g\u1eafn")}},be({title:"AdsId",dataIndex:"adsId",key:"adsId"},this.getColumnSearchProps("adsId")),be({title:"Email",dataIndex:"email",key:"email"},this.getColumnSearchProps("email")),{title:"Ng\xe0y h\u1ebft h\u1ea1n",dataIndex:"expiredAt",key:"expiredAt",render:function(e){return e?i.a.createElement("span",null,P()(e).format("HH:mm DD/MM/YYYY")):i.a.createElement("span",null)}},{title:"Ng\xe0y th\xeam",dataIndex:"createdAt",key:"createdAt",render:function(e){return i.a.createElement("span",null,P()(e).format("HH:mm DD/MM/YYYY"))}},{title:"",dataIndex:"code",key:"code",render:function(e){var t="/dashboard/update-expiration?code=".concat(e);return i.a.createElement(f.b,{to:t},i.a.createElement(j.a,{type:"primary"},"N\xe2ng c\u1ea5p domain"))}}];return i.a.createElement("div",{className:"container"},i.a.createElement(C.a,null,i.a.createElement(I.a,{span:24},i.a.createElement(S.a,{pagination:this.paginationConfig,dataSource:this.state.websites,columns:t,rowKey:function(e,t){return e.code},className:"accounts-table"}))))}}]),t}(_),ke=[{title:"Dashboard",path:"",icon:"home",component:se},{title:"C\u1eadp nh\u1eadt th\u1eddi h\u1ea1n s\u1eed d\u1ee5ng",path:"update-expiration",icon:"history",component:de},{title:"Qu\u1ea3n l\xfd ng\u01b0\u1eddi d\xf9ng",path:"users",icon:"user",component:U},{title:"T\xe0i kho\u1ea3n Google Ads",path:"accounts",icon:"appstore",component:V},{title:"Qu\u1ea3n l\xfd websites",path:"websites",icon:"chrome",component:Object(x.b)(null,n)(Object(E.b)(ye))},{title:"L\u1ed7i Google Ads",path:"google-ads-errors",icon:"bug",component:re}],Ee=(a(632),a(284)),ve=function(e){function t(e){return Object(u.a)(this,t),Object(m.a)(this,Object(d.a)(t).call(this,e))}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return this.props.app.isLoading?i.a.createElement("div",{className:"app-loading"},i.a.createElement(Ee.a,{tip:"Loading",size:"large"})):i.a.createElement(i.a.Fragment,null)}}]),t}(i.a.Component),Oe=Object(x.b)((function(e){return{app:e.app}}),n)(ve),je=a(640),Ce=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).logout=a.logout.bind(Object(N.a)(a)),a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"logout",value:function(){this.props.cookies.remove("token",{path:"/"}),this.props.history.push("/login")}},{key:"render",value:function(){return i.a.createElement(je.a,{placement:"rightBottom",title:"Tho\xe1t kh\u1ecfi h\u1ec7 th\u1ed1ng?",onConfirm:this.logout,okText:"\u0110\u1ed3ng \xfd",cancelText:"H\u1ee7y"},i.a.createElement(j.a,{type:"link",style:{width:"100%",textAlign:"left",padding:"0 23px"}},i.a.createElement(k.a,{type:"logout"}),i.a.createElement("span",{style:{marginLeft:"8.5px"}},"\u0110\u0103ng xu\u1ea5t")))}}]),t}(i.a.Component),Ie=Object(E.b)(Object(g.g)(Ce)),Se=(a(633),function(e){function t(){return Object(u.a)(this,t),Object(m.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"email"},this.props.users.user?this.props.users.user.email:"")}}]),t}(i.a.Component)),Ae=Object(x.b)((function(e){return{users:e.users}}),n)(Se),we=b.a.Header,Pe=function(e){function t(){return Object(u.a)(this,t),Object(m.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return i.a.createElement(we,{style:{background:"#fff",padding:0}},i.a.createElement(y.a,{theme:"dark",mode:"horizontal",defaultSelectedKeys:["2"],style:{lineHeight:"64px"}},i.a.createElement(y.a.Item,{key:"1"},"nav 1"),i.a.createElement(y.a.Item,{key:"2"},"nav 2"),i.a.createElement(y.a.Item,{key:"3"},"nav 3")),i.a.createElement("div",{className:"logo"},this.props.users.user?this.props.users.user.email:""))}}]),t}(o.Component),Te=Object(x.b)((function(e){return{users:e.users}}),n)(Pe),_e=a(191),Ne=a.n(_e),De=(a(634),b.a.Footer),xe=b.a.Sider,Me=b.a.Content,We=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).isAuthenticated=!1,a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"UNSAFE_componentWillMount",value:function(){var e=this.props.cookies,t=e.get(T.token),a=e.get(T.user);this.isAuthenticated=!!t&&!!a,this.isAuthenticated&&this.props.login(a,t)}},{key:"render",value:function(){var e=this,t=function(t){var a=t.component,n=Object(l.a)(t,["component"]);return i.a.createElement(g.b,Object.assign({},n,{render:function(t){return e.isAuthenticated?i.a.createElement(a,t):i.a.createElement(g.a,{to:{pathname:"/login",state:{from:t.location}}})}}))},a=window.location.href.split("?")[0].split("/"),n="0";switch(a[a.length-1]){case"update-expiration":n="1";break;case"users":n="2";break;case"accounts":n="3";break;case"websites":n="4";break;case"google-ads-errors":n="5"}return i.a.createElement(b.a,null,i.a.createElement(xe,{style:{overflow:"auto",height:"100vh",position:"fixed",left:0}},i.a.createElement("div",{className:"logo"},i.a.createElement("img",{alt:"",src:Ne.a})),i.a.createElement(Ae,null),i.a.createElement(y.a,{theme:"dark",mode:"inline",defaultSelectedKeys:[n]},ke.map((function(t,a){return i.a.createElement(y.a.Item,{key:a},i.a.createElement(k.a,{type:t.icon}),i.a.createElement("span",{className:"nav-text"},t.title),i.a.createElement(f.b,{to:"".concat(e.props.match.path,"/").concat(t.path)}))}))),i.a.createElement(Ie,null)),i.a.createElement(b.a,{style:{marginLeft:250}},i.a.createElement(Te,null),i.a.createElement(Me,{style:{margin:"24px 16px 0",overflow:"initial"}},i.a.createElement("div",{style:{padding:24,background:"#fff",textAlign:"center"}},i.a.createElement("div",null,ke.map((function(a,n){return""===a.path?i.a.createElement(t,{key:n,component:a.component,exact:!0,path:"".concat(e.props.match.path,"/").concat(a.path)}):i.a.createElement(t,{key:n,component:a.component,path:"".concat(e.props.match.path,"/").concat(a.path)})}))))),i.a.createElement(De,{style:{textAlign:"center"}},"Click CPanel \xa92019 Created by Appnet Technology")),i.a.createElement(Oe,null))}}]),t}(o.Component),Ge=Object(x.b)((function(e){return{users:e.users}}),n)(Object(E.b)(Object(g.g)(We))),Ye=(a(635),function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault(),a.props.form.validateFields((function(e,t){if(!e){var n={email:t.email,password:t.password};fetch(A.login,{method:"POST",body:JSON.stringify(n),headers:{"Content-type":"application/json; charset=UTF-8"},signal:a.abortController.signal}).then((function(e){return 200===e.status?Promise.resolve(e.json()):Promise.reject(e.json())})).then((function(e){var t=a.props.cookies,n=e.data.meta.token,r=e.data.user;a.props.login(r,n),t.set(T.token,n,{path:"/"}),t.set(T.user,r,{path:"/"}),setTimeout((function(){a.props.history.push("/dashboard")}),1e3)}),(function(e){return e.then((function(e){a.setState({loginMessage:e.messages[0]})}))}))}}))},a.state={loginMessage:""},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentWillMount",value:function(){var e=this;this.props.cookies.get(T.token)&&setTimeout((function(){e.props.history.push("/dashboard")}),1e3)}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return i.a.createElement("div",null,i.a.createElement(C.a,null,i.a.createElement(I.a,{span:9}),i.a.createElement(I.a,{span:6},i.a.createElement(le.a,{onSubmit:this.handleSubmit,className:"login-form"},i.a.createElement("div",{className:"form-title"},"Click CPanel"),i.a.createElement("div",{className:"logo"},i.a.createElement("img",{src:a(191),alt:"..."})),i.a.createElement(le.a.Item,null,e("email",{rules:[{required:!0,message:"Vui l\xf2ng nh\u1eadp email"}]})(i.a.createElement(O.a,{prefix:i.a.createElement(k.a,{type:"user"}),placeholder:"Email"}))),i.a.createElement(le.a.Item,null,e("password",{rules:[{required:!0,message:"Vui l\xf2ng nh\u1eadp m\u1eadt kh\u1ea9u"}]})(i.a.createElement(O.a,{prefix:i.a.createElement(k.a,{type:"lock"}),type:"password",placeholder:"M\u1eadt kh\u1ea9u"}))),i.a.createElement("p",{style:{color:"red",textAlign:"center"}},this.state.loginMessage),i.a.createElement(le.a.Item,null,i.a.createElement("div",{style:{textAlign:"center"}},i.a.createElement(j.a,{type:"danger",htmlType:"submit",className:"login-form-button"},"\u0110\u0102NG NH\u1eacP"))))),i.a.createElement(I.a,{span:9})))}}]),t}(_)),Le=le.a.create({name:"normal_login"})(Ye),Re=Object(E.b)(Object(x.b)((function(e){return{user:e.user}}),n)(Le)),Fe=a(92);function He(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function Ke(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?He(a,!0).forEach((function(t){Object(v.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):He(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var Ue=Object(Fe.b)({users:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_SUCCESS":return{user:t.user,token:t.token};default:return e}},websites:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{list:[]},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LIST_WEBSITES":case"CHECKING_ATTACH_SCRIPT":break;default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isLoading:!1},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP_LOADING":return Ke({},e,{isLoading:t.isLoading});default:return e}}}),ze=Object(Fe.c)(Ue,{});var Be=function(){return i.a.createElement(E.a,null,i.a.createElement(f.a,null,i.a.createElement(x.a,{store:ze},i.a.createElement(g.d,null,i.a.createElement(g.b,{path:"/login",component:Re}),i.a.createElement(g.b,{path:"/dashboard",render:function(){return i.a.createElement(Ge,null)}}),i.a.createElement(g.b,{path:"/**",render:function(){return i.a.createElement(g.a,{to:{pathname:"/dashboard"}})}})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(Be,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[328,1,2]]]);
//# sourceMappingURL=main.5914b142.chunk.js.map