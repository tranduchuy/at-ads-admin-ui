(window.webpackJsonpadmin=window.webpackJsonpadmin||[]).push([[0],{151:function(e,t,a){e.exports=a(299)},156:function(e,t,a){},157:function(e,t,a){},299:function(e,t,a){"use strict";a.r(t);var n=a(1),o=a.n(n),c=a(4),i=a.n(c),s=(a(156),a(157),a(158),a(37)),r=a(38),l=a(42),m=a(39),p=a(41),u=a(300),h=a(301),d=a(304),g=a(306),f=a(10),E=a(89),b=a(40),k={login:"http://localhost:3000/api/admin/users/login",getPackages:"http://localhost:3000/api/packages",checkWebsiteCode:"http://localhost:3000/api/websites/{code}",updateVipDomain:"http://localhost:3000/api/users/website"},y=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault(),a.props.form.validateFields((function(e,t){if(!e){var n={email:t.email,password:t.password};fetch(k.login,{method:"POST",body:JSON.stringify(n),headers:{"Content-type":"application/json; charset=UTF-8"}}).then((function(e){return 200===e.status?Promise.resolve(e.json()):Promise.reject(e.json())})).then((function(e){a.props.cookies.set("token",e.data.meta.token),setTimeout((function(){a.props.history.push("/dashboard")}),1e3)}),(function(e){return e.then((function(e){a.setState({loginMessage:e.messages[0]})}))}))}}))},a.state={loginMessage:""},a}return Object(p.a)(t,e),Object(r.a)(t,[{key:"componentWillMount",value:function(){var e=this;this.props.cookies.get("token")&&setTimeout((function(){e.props.history.push("/dashboard")}),1e3)}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return o.a.createElement("div",null,o.a.createElement(u.a,null,o.a.createElement(h.a,{span:9}),o.a.createElement(h.a,{span:6},o.a.createElement("h2",{style:{textAlign:"center",padding:"20px 0"}},"Click CPanel")),o.a.createElement(h.a,{span:9})),o.a.createElement(u.a,null,o.a.createElement(h.a,{span:9}),o.a.createElement(h.a,{span:6},o.a.createElement(d.a,{onSubmit:this.handleSubmit,className:"login-form"},o.a.createElement(d.a.Item,null,e("email",{rules:[{required:!0,message:"Vui l\xf2ng nh\u1eadp email"}]})(o.a.createElement(g.a,{prefix:o.a.createElement(f.a,{type:"user",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"Email"}))),o.a.createElement(d.a.Item,null,e("password",{rules:[{required:!0,message:"Vui l\xf2ng nh\u1eadp m\u1eadt kh\u1ea9u"}]})(o.a.createElement(g.a,{prefix:o.a.createElement(f.a,{type:"lock",style:{color:"rgba(0,0,0,.25)"}}),type:"password",placeholder:"M\u1eadt kh\u1ea9u"}))),o.a.createElement("p",{style:{color:"red",textAlign:"center"}},this.state.loginMessage),o.a.createElement(d.a.Item,null,o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement(E.a,{type:"primary",htmlType:"submit",className:"login-form-button"},"\u0110\u0103ng nh\u1eadp"))))),o.a.createElement(h.a,{span:9})))}}]),t}(n.Component),v=d.a.create({name:"normal_login"})(y),j=Object(b.b)(v),O=a(144),x=a(55),C=a(44),w=a(86),S=a(302),P=a(303),T=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return o.a.createElement("h2",null,"Dashboard page")}}]),t}(n.Component),D=a(305),A=D.a.Option,M=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault(),a.props.form.validateFields((function(e,t){if(!e){var n={packageId:a.state.selectedPackage._id,code:t.code};a.checkWebsiteCode(n)}}))},a.cookies=a.props.cookies,a.token=a.cookies.get("token"),a.state={packages:[],selectedPackage:{_id:""},updatingMessage:{message:"",isSucceed:!0}},a.handleChangePackage=a.handleChangePackage.bind(Object(x.a)(a)),a}return Object(p.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.getPackages()}},{key:"getPackages",value:function(){var e=this;fetch(k.getPackages,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",accessToken:this.token}}).then((function(e){return e.json()})).then((function(t){var a=t.data.packages.sort((function(e,t){return e.numOfDays-t.numOfDays}));e.setState({packages:a,selectedPackage:{_id:a[0]._id}})}))}},{key:"handleChangePackage",value:function(e){this.setState({selectedPackage:{_id:e}})}},{key:"checkWebsiteCode",value:function(e){var t=this,a=k.checkWebsiteCode.replace("{code}",e.code);fetch(a,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",accessToken:this.token}}).then((function(e){return 200===e.status?Promise.resolve(e.json()):Promise.reject(e.json())})).then((function(a){t.setState({domain:a.data.domain}),t.updateVipDomain(e)}),(function(e){return e.then((function(e){t.setState({updatingMessage:{message:e.messages[0],isSucceed:!1}})}))}))}},{key:"updateVipDomain",value:function(e){var t=this;fetch(k.updateVipDomain,{method:"PUT",body:JSON.stringify(e),headers:{"Content-type":"application/json; charset=UTF-8",accessToken:this.token}}).then((function(e){return 200===e.status?Promise.resolve(e.json()):Promise.reject(e.json())})).then((function(e){t.setState({updatingMessage:{message:e.messages[0],isSucceed:!0}})}),(function(e){return e.then((function(e){t.setState({updatingMessage:{message:e.essages[0],isSucceed:!1}})}))}))}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator,t=this.state.selectedPackage._id||(this.state.packages.length>0?this.state.packages[0]._id:""),a=this.state.updatingMessage.isSucceed?"#44b543":"red";return o.a.createElement("div",null,o.a.createElement(u.a,null,o.a.createElement("h2",{style:{textAlign:"center",padding:"20px 0"}},"C\u1eacP NH\u1eacT TH\u1edcI H\u1ea0N S\u1eec D\u1ee4NG")),o.a.createElement(u.a,null,o.a.createElement(h.a,{span:9}),o.a.createElement(h.a,{span:6},o.a.createElement(d.a,{onSubmit:this.handleSubmit,style:{border:"1px solid #E0E0E1",padding:"20px",borderRadius:"5px",textAlign:"left"},className:"update-expiration-form"},o.a.createElement(d.a.Item,null,o.a.createElement("label",null,"G\xf3i:",o.a.createElement(D.a,{value:t,style:{width:"100%"},placeholder:"Ch\u1ecdn g\xf3i",onChange:this.handleChangePackage},this.state.packages.map((function(e,t){return o.a.createElement(A,{value:e._id,key:t},e.name," - ",e.numOfDays," ng\xe0y")}))))),o.a.createElement(d.a.Item,null,e("code",{rules:[{required:!0,message:"Vui l\xf2ng nh\u1eadp m\xe3 website"}]})(o.a.createElement(g.a,{prefix:o.a.createElement(f.a,{type:"qrcode",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"M\xe3 website"}))),o.a.createElement("p",{style:{color:a,textAlign:"center"}},this.state.updatingMessage.message),o.a.createElement("p",null,this.state.domain?"Domain: ".concat(this.state.domain.domain):""),o.a.createElement(d.a.Item,null,o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement(E.a,{type:"primary",htmlType:"submit",className:"login-form-button"},"C\u1eadp nh\u1eadt"))))),o.a.createElement(h.a,{span:9})))}}]),t}(n.Component),N=d.a.create({name:"update_expiration"})(M),_=[{title:"Dashboard",path:"",icon:"home",component:T},{title:"C\u1eadp nh\u1eadt th\u1eddi h\u1ea1n s\u1eed d\u1ee5ng",path:"update-expiration",icon:"sync",component:Object(b.b)(N)}],I=S.a.Header,F=S.a.Footer,W=S.a.Sider,V=S.a.Content,U=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).isAuthenticated=!1,a.logout=a.logout.bind(Object(x.a)(a)),a}return Object(p.a)(t,e),Object(r.a)(t,[{key:"UNSAFE_componentWillMount",value:function(){var e=this.props.cookies.get("token");console.log("token",e),this.isAuthenticated=!!e}},{key:"logout",value:function(e){window.confirm("Tho\xe1t kh\u1ecfi h\u1ec7 th\u1ed1ng?")&&(this.props.cookies.remove("token"),this.props.history.push("/login"))}},{key:"render",value:function(){var e=this,t=function(t){var a=t.component,n=Object(O.a)(t,["component"]);return o.a.createElement(C.b,Object.assign({},n,{render:function(t){return e.isAuthenticated?o.a.createElement(a,t):o.a.createElement(C.a,{to:{pathname:"/login",state:{from:t.location}}})}}))};return o.a.createElement(S.a,null,o.a.createElement(W,{style:{overflow:"auto",height:"100vh",position:"fixed",left:0}},o.a.createElement("div",{className:"logo"}),o.a.createElement(P.a,{theme:"dark",mode:"inline",defaultSelectedKeys:["4"]},_.map((function(t,a){return o.a.createElement(P.a.Item,{key:a},o.a.createElement(f.a,{type:t.icon}),o.a.createElement("span",{className:"nav-text"},t.title),o.a.createElement(w.b,{to:"".concat(e.props.match.path,"/").concat(t.path)}))}))),o.a.createElement(E.a,{type:"link",style:{color:"silver",marginLeft:"8.5px",marginTop:"80vh"},onClick:this.logout},o.a.createElement(f.a,{type:"logout"}),o.a.createElement("span",{style:{marginLeft:"8.5px"}},"\u0110\u0103ng xu\u1ea5t"))),o.a.createElement(S.a,{style:{marginLeft:200}},o.a.createElement(I,{style:{background:"#fff",padding:0}}),o.a.createElement(V,{style:{margin:"24px 16px 0",overflow:"initial"}},o.a.createElement("div",{style:{padding:24,background:"#fff",textAlign:"center"}},o.a.createElement("div",null,_.map((function(a,n){return""===a.path?o.a.createElement(t,{key:n,component:a.component,exact:!0,path:"".concat(e.props.match.path,"/").concat(a.path)}):o.a.createElement(t,{key:n,component:a.component,path:"".concat(e.props.match.path,"/").concat(a.path)})}))))),o.a.createElement(F,{style:{textAlign:"center"}},"Ant Design \xa92018 Created by Ant UED")))}}]),t}(n.Component),q=Object(b.b)(Object(C.g)(U));var G=function(){return o.a.createElement(b.a,null,o.a.createElement(w.a,null,o.a.createElement(C.d,null,o.a.createElement(C.b,{path:"/login",component:j}),o.a.createElement(C.b,{path:"/dashboard",render:function(){return o.a.createElement(q,null)}}),o.a.createElement(C.b,{path:"/**",render:function(){return o.a.createElement(C.a,{to:{pathname:"/dashboard"}})}}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(G,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[151,1,2]]]);
//# sourceMappingURL=main.ff5f7ac8.chunk.js.map