(this["webpackJsonpparadise-city-mini"]=this["webpackJsonpparadise-city-mini"]||[]).push([[0],{0:function(t,e,a){t.exports={"sider-menu":"src_sider-menu__1Bw2a",content:"src_content__3N9hT",loading:"src_loading__3ANA8",load:"src_load__2XCvD",mask:"src_mask__3-V5m","main-container":"src_main-container__3_HVZ",catagory:"src_catagory__2B-wO","catagory-item":"src_catagory-item__IA7Qu","catagory-item-active":"src_catagory-item-active___ITnh",title:"src_title__YXAJk","title-name":"src_title-name__1Yfuv","title-props":"src_title-props__2wQgW","title-props-catagory":"src_title-props-catagory__1FYqB","title-user":"src_title-user__29Qky","article-container":"src_article-container__1teJI",back:"src_back__6MTGB","article-props":"src_article-props__TqCvT","article-title":"src_article-title__2UyCo","article-content":"src_article-content__3Q680","write-container":"src_write-container__9b_gM","write-title":"src_write-title__12-bU","write-catagory":"src_write-catagory__2LnOH","editor-container":"src_editor-container__2m6Aw","write-textarea":"src_write-textarea__152_-",parseMarkdown:"src_parseMarkdown__1ObP0",submitButton:"src_submitButton__24YPm","about-container":"src_about-container__DBowH",rot:"src_rot__115DF"}},11:function(t,e){t.exports=React},184:function(t,e){},195:function(t,e,a){"use strict";a.r(e);a(60);var n=a(13),r=a(14),c=a(17),o=a(16),i=a(0),s=a.n(i),l=a(15),u=a.n(l),m=a(1),h=a.n(m),p=a(3),d="61e06fdec3996fbda3c",g="eb8094d137bf927e7e5b2";function f(){return(f=Object(p.a)(h.a.mark((function t(){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api.github.com/repos/xiaozhaoqi/privateRepository/contents/files/article",{method:"GET",headers:{Authorization:"token "+d+g,"Content-Type":"application/vnd.github.VERSION.object"}}).then((function(t){return t.status<299?t.json():null})).then((function(t){return t})).catch((function(){alert("\u4f60\u7684\u7f51\u7edc\u73af\u5883\u5f88\u53ef\u80fd\u53d7\u5230\u4e86\u7f51\u7edc\u8fd0\u8425\u5546\u7684DNS\u6c61\u67d3\uff0c\u5bfc\u81f4\u4f60\u65e0\u6cd5\u4e0eGitHub\u670d\u52a1\u5668\u901a\u4fe1\u3002\n\u6bcf\u6b21\u6c61\u67d3\u53ef\u80fd\u6301\u7eed\u51e0\u5c0f\u65f6\uff0c\u4f60\u53ef\u4ee5\u5c1d\u8bd5\u66f4\u6362DNS\u670d\u52a1\u6216\u7ed1\u5b9aHost\u5730\u5740\u3002");var t=document.createElement("pre");return t.append("Host\u5730\u5740\u8868\uff1a\n      151.101.44.249 github.global.ssl.fastly.net\n      192.30.253.113 github.com\n      103.245.222.133 assets-cdn.github.com\n      23.235.47.133 assets-cdn.github.com\n      203.208.39.104 assets-cdn.github.com\n      204.232.175.78 documentcloud.github.com\n      204.232.175.94 gist.github.com\n      107.21.116.220 help.github.com\n      207.97.227.252 nodeload.github.com\n      199.27.76.130 raw.github.com\n      107.22.3.110 status.github.com\n      204.232.175.78 training.github.com\n      207.97.227.243 www.github.com\n      185.31.16.184 github.global.ssl.fastly.net\n      151.101.0.0/22 avatars0.githubusercontent.com\n      151.101.0.0/22 avatars1.githubusercontent.com\n      151.101.0.0/22 avatars2.githubusercontent.com\n      151.101.0.0/22 avatars3.githubusercontent.com\n      199.232.28.133 cloud.githubusercontent.com"),document.querySelector("nav").appendChild(t),[]}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function R(t){return _.apply(this,arguments)}function _(){return(_=Object(p.a)(h.a.mark((function t(e){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api.github.com/repos/xiaozhaoqi/privateRepository/contents/files/article/"+e,{method:"GET",headers:{Authorization:"token "+d+g}}).then((function(t){return t.json()})).then((function(t){return t}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function v(t,e,a,n){return y.apply(this,arguments)}function y(){return(y=Object(p.a)(h.a.mark((function t(e,a,n,r){var c;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c=Date.now(),t.next=3,fetch("https://api.github.com/repos/xiaozhaoqi/privateRepository/contents/files/article/"+e+"-"+n+"-"+r+"-"+c+".md",{method:"PUT",headers:{Authorization:"token "+d+g},body:JSON.stringify({message:"AutoPush Article: "+e,content:btoa(unescape(encodeURIComponent(JSON.stringify({title:e,content:a,time:c,catagory:n,author:r}))))})}).then((function(t){return t.json()})).then((function(t){return!0})).catch((function(t){return!1}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function b(){return(b=Object(p.a)(h.a.mark((function t(e,a,n,r,c,o,i,s){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E({sha:e,title:a,catagory:r,time:o,author:s}).then((function(t){return t})).catch((function(t){return t}));case 2:if("remove failed"!==t.sent){t.next=5;break}return t.abrupt("return",Promise.reject("update failed"));case 5:return t.next=7,v(n,i,c,s);case 7:return t.abrupt("return",t.sent);case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function E(t){return w.apply(this,arguments)}function w(){return(w=Object(p.a)(h.a.mark((function t(e){var a;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("rm"===(a=prompt("\u4f60\u6b63\u5728\u53d8\u66f4\u79c1\u6709\u5e93\u7684\u6587\u4ef6\u5b58\u50a8\uff0c\u8f93\u5165Token:"))){t.next=4;break}return alert(a+" \u4e0d\u662f\u6709\u6548\u7684 Token"),t.abrupt("return",Promise.reject("remove failed"));case 4:return t.next=6,fetch("https://api.github.com/repos/xiaozhaoqi/privateRepository/contents/files/article/"+e.title+"-"+e.catagory+"-"+e.author+"-"+e.time+".md",{method:"DELETE",headers:{Authorization:"token "+d+g},body:JSON.stringify({message:"AutoDelete article: "+e.title,sha:e.sha})}).then((function(t){return t.json()})).then((function(t){return t})).catch((function(t){console.log(t)}));case 6:return t.abrupt("return",t.sent);case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}window.PARADISE_CITY_Fetch=window.fetch,window.fetch=Object(p.a)(h.a.mark((function t(){var e,a=arguments;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return window.PARADISE_CITY_Loading(),t.next=3,(e=window).PARADISE_CITY_Fetch.apply(e,a).finally((function(){window.PARADISE_CITY_Loading()}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));var x=(0,ReactRouterDOM.withRouter)((function(t){var e=window.PARADISE_history.location.state||t.article;return document.location.hash||t.history.push("/ParadiseCity/"),React.createElement(React.Fragment,null,React.createElement("span",{style:{"margin-right":"10px"},onClick:function(){t.history.go(-1)}},"\ud83d\udc48"),React.createElement("span",{className:s.a.back,onClick:function(){t.history.push("/ParadiseCity/write",{article:e,isEdit:!0})}},"\u7f16\u8f91"),React.createElement("span",{className:s.a.back,style:{color:"red"},onClick:function(){E(e).then((function(){location.href=location.origin})).catch((function(){}))}},"\u5220\u9664"),React.createElement("div",{className:s.a["article-container"]},React.createElement("p",{className:s.a["article-title"]},e.title),React.createElement("p",{className:s.a["article-props"]},React.createElement("span",null,e.catagory||"\u6280\u672f"),e.time&&React.createElement("span",null,e.author||"zhaoqi.xiao"," \u6700\u540e\u7f16\u8f91\u4e8e ",new Date(e.time).toLocaleDateString()),e.content&&React.createElement("span",null,"\u9884\u8ba1\u9605\u8bfb\u65f6\u95f4 ",(e.content.length/200+1).toFixed(0)," \u5206\u949f")),React.createElement(u.a,{className:s.a["article-content"],source:e.content,escapeHtml:!1})))})),S=a(57),C=["#123456","#234567","#345678","#456789","#567890"],N=function(t){var e=React.useState(""),a=Object(S.a)(e,2),n=a[0],r=a[1];return React.useEffect((function(){window.PARADISE_lastest_catagory?r(window.PARADISE_lastest_catagory):t.articleList[0]&&r(t.articleList[0].catagory)}),[t.articleList]),React.createElement("div",{className:s.a["main-container"]},React.createElement("div",{className:s.a.catagory},t.articleList.map((function(t){return t.catagory||"\u6280\u672f"})).filter((function(t,e,a){return a.indexOf(t,0)===e})).reverse().map((function(t){return React.createElement("a",{onClick:function(t){r(t.target.innerText)},className:n===t?s.a["catagory-item-active"]:s.a["catagory-item"]},t)}))),t.articleList.filter((function(t){return t.catagory===n})).map((function(t){if(t.avatar)return t;for(var e=[],a=0;a<5;a++)e.push([Math.floor(2*Math.random()),Math.floor(2*Math.random()),Math.floor(2*Math.random())]);return e.forEach((function(t){t.push(t[1],t[0])})),t.color=C[Math.floor(Math.random()*C.length)],t.avatar=e,t})).map((function(t){return React.createElement("p",{className:s.a.title,key:t.name,onClick:function(){R(t.name).then((function(t){t&&(window.PARADISE_lastest_catagory=n,window.PARADISE_history.push("/ParadiseCity/article",{title:JSON.parse(decodeURIComponent(escape(atob(t.content)))).title,content:JSON.parse(decodeURIComponent(escape(atob(t.content)))).content,time:JSON.parse(decodeURIComponent(escape(atob(t.content)))).time,catagory:JSON.parse(decodeURIComponent(escape(atob(t.content)))).catagory,author:JSON.parse(decodeURIComponent(escape(atob(t.content)))).author,sha:t.sha}),document.location.hash=t.sha)}))}},React.createElement("div",{className:s.a["title-user"]},t.avatar.map((function(e){return e.map((function(e){return React.createElement("div",{data:e,className:"avatar",style:{background:t.color}})}))}))),React.createElement("p",{className:s.a["title-name"]},t.name.slice(0,-3).split("-")[0]),React.createElement("span",{className:s.a["title-props"]+" "+s.a["title-props-catagory"]},t.catagory),React.createElement("span",{className:s.a["title-props"]},t.author),React.createElement("span",{className:s.a["title-props"]},t.date),React.createElement("span",{className:s.a["title-props"]},t.size+"\u5b57\u8282"))})))},k=function(t){Object(c.a)(a,t);var e=Object(o.a)(a);function a(t){var r;Object(n.a)(this,a),(r=e.call(this,t)).recorder=void 0,r.clearInput=function(){r.setState({text:"",title:"",help:"",author:"",catagory:""}),localStorage.removeItem("writing-title"),localStorage.removeItem("writing-text"),localStorage.removeItem("author")},r.save=function(){localStorage.setItem("writing-title",r.state.title),localStorage.setItem("writing-text",r.state.text)},r.push=function(){var t=r.props.location.state,e=(t=void 0===t?{}:t).isEdit,a=void 0!==e&&e,n=t.article,c=(n=void 0===n?{}:n).title,o=void 0===c?"":c,i=n.catagory,s=void 0===i?"":i,l=n.time,u=void 0===l?"":l,m=n.sha,h=void 0===m?"":m;localStorage.setItem("author",r.state.author),r.state.title&&null===r.state.title.match(/[\/-]/gi)?a?function(t,e,a,n,r,c,o,i){return b.apply(this,arguments)}(h,o,r.state.title,s,r.state.catagory||"\u6280\u672f",u,r.state.text,r.state.author).then((function(){r.setState({text:"",title:"",help:"\ud83d\ude0a\u66f4\u65b0\u6210\u529f\u4e86"})})):v(r.state.title,r.state.text,r.state.catagory||"\u6280\u672f",r.state.author).then((function(){r.setState({text:"",title:"",help:"\ud83d\ude0a\u53d1\u5e03\u6210\u529f\u4e86"})})):r.setState({help:'\ud83e\udd22\u4f60\u9700\u8981\u4e00\u4e2a\u6807\u9898\uff0c\u4e14\u6807\u9898\u4e2d\u4e0d\u80fd\u542b\u6709\u4fdd\u7559\u5b57"/"\u548c"-"\uff0c"\u6807\u9898+\u5206\u7c7b+\u65f6\u95f4\u6233"\u5c06\u4f5c\u4e3a\u5b58\u50a8\u6587\u4ef6\u7684\u552f\u4e00\u6807\u8bc6!'})};var c=t.location.state,o=(c=void 0===c?{}:c).article,i=(o=void 0===o?{}:o).content,s=void 0===i?"":i,l=o.title,u=void 0===l?"":l,m=o.catagory,h=void 0===m?"":m;return r.state={text:s||localStorage.getItem("writing-text")||"",title:u||localStorage.getItem("writing-title")||"",catagory:h||"",help:"",author:localStorage.getItem("author")||""},r}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var t=this;this.recorder=setInterval((function(){var e=localStorage.getItem("writing-text")&&localStorage.getItem("writing-text").length||0;Math.abs(e-t.state.text.length)>100&&t.save()}),3e4)}},{key:"componentWillUnmount",value:function(){clearInterval(this.recorder)}},{key:"render",value:function(){var t=this,e=this.props.location.state,a=(e=void 0===e?{}:e).isEdit,n=void 0!==a&&a;return React.createElement(React.Fragment,null,React.createElement("h2",null,n?"\u4fee\u6539":"\u521b\u5efa","\u6587\u7ae0 ",React.createElement("span",{onClick:function(){t.props.history.go(-1)}},"\ud83d\udc48")),React.createElement("div",{className:s.a["write-container"]},React.createElement("input",{className:s.a["write-title"],placeholder:"\u6807\u9898",value:this.state.title,onChange:function(e){t.setState({title:e.target.value})}}),React.createElement("div",{className:s.a["editor-container"]},React.createElement("textarea",{onChange:function(e){t.setState({text:e.target.value})},placeholder:"Markdown Supported",className:s.a["write-textarea"]+" scrollbar",value:this.state.text}),React.createElement(u.a,{source:this.state.text,className:s.a.parseMarkdown+" scrollbar",escapeHtml:!1})),React.createElement("input",{className:s.a["write-catagory"],placeholder:"\u81ea\u5b9a\u4e49\u5206\u7c7b\uff0c\u9ed8\u8ba4\u4e3a[\u6280\u672f]",value:this.state.catagory,onChange:function(e){t.setState({catagory:e.target.value})}}),React.createElement("br",null),React.createElement("input",{className:s.a["write-catagory"],placeholder:"\u6587\u7ae0\u7f72\u540d",value:this.state.author,onChange:function(e){t.setState({author:e.target.value})}}),React.createElement("div",null,React.createElement("button",{onClick:this.push,className:s.a.submitButton},n?"\u66f4\u65b0\u8fd9\u7bc7\u6587\u7ae0":"\u53d1\u5e03"),React.createElement("button",{className:s.a.submitButton,onClick:this.clearInput},"\u6e05\u7a7a\u5185\u5bb9")),React.createElement("p",{style:{color:"red",marginTop:"10px"}},this.state.help)))}}]),a}(React.Component),I=(0,ReactRouterDOM.withRouter)(k),O=function(){var t=document.createElement("img");return t.src="https://s11.flagcounter.com/count/m1nf/bg_FFFFFF/txt_000000/border_FFFFFF/columns_2/maxflags_64/viewers_3/labels_1/pageviews_1/flags_0/percent_0/",t.onload=function(){var e=document.querySelector(".load-counter");e&&e.classList.remove("load-counter"),e&&e.appendChild(t)},React.createElement("div",{className:s.a["about-container"]},React.createElement("h4",null,"\u8bbf\u5ba2\u4eec\u7684\u60c5\u51b5"),React.createElement("div",{className:"load-counter",style:{marginTop:"10px"}}),React.createElement("h4",null,"\u4f9d\u8d56\u54ea\u4e9b\u8d44\u6e90"),React.createElement("p",null,"\u4f9d\u8d56GitHub\u7684\u79c1\u6709\u4ed3\u5e93\u548c\u6258\u7ba1\u529f\u80fd\uff0c\u5ba2\u6237\u7aef\u4f7f\u7528GitHub Restful API\u4e0e\u79c1\u6709\u4ed3\u5e93\u901a\u4fe1\uff0c\u5982\u63d0\u4ea4\u5185\u5bb9\u6216\u83b7\u53d6\u5185\u5bb9\u3002"),React.createElement("h4",null,"\u4e3a\u4ec0\u4e48\u4e0d\u662fHexo"),React.createElement("p",null,"\u56e0\u4e3aHexo\u4f9d\u8d56Git\u548c\u547d\u4ee4\u884c\u811a\u672c\uff0c\u4e0d\u591f\u81ea\u52a8\u5316\u3002\u672c\u7ad9\u5c06Markdown\u5185\u5bb9\u751f\u6210HTML\u9875\u9762\u7684\u5de5\u4f5c\u4ea4\u7ed9React\u6765\u5b8c\u6210\u3002"),React.createElement("h4",null,"\u5168\u7ad9\u4e3b\u9898\u8272"),React.createElement("p",null,"\u70b9\u51fb\u5bfc\u822a\u680f\u6700\u5de6\u4fa7\u7684emoji\u8868\u60c5\uff0c\u4f7f\u7528\u7cfb\u7edf\u914d\u8272\u677f\u9009\u62e9\u4e00\u4e2a\u4e3b\u9898\u8272\uff0c\u5c06\u5e94\u7528\u5230\u5168\u7ad9\u5404\u4e2a\u754c\u9762\u3002"),React.createElement("h4",null,"\u5173\u4e8e\u722c\u866b\u3001\u7f51\u7edc\u5feb\u7167\u548c\u641c\u7d22\u5f15\u64ce\u6536\u5f55"),React.createElement("p",null,"\u901a\u8fc7robots.txt\uff0c\u672c\u7ad9\u62d2\u7edd\u5584\u610f\u7684\u722c\u866b\u548c\u641c\u7d22\u5f15\u64ce\u811a\u672c\u6293\u53d6\u6570\u636e\u6216\u8bb0\u5f55\u5feb\u7167\uff0c\u56e0\u6b64\u7f51\u7ad9\u5185\u5bb9\u4e00\u822c\u4e0d\u4f1a\u66b4\u9732\u5728\u4e92\u8054\u7f51\u4e0a\u3002"),React.createElement("p",null,"\u8bb0\u5f55\u5185\u5bb9\u4ec5\u4f9b\u4f5c\u8005\u56de\u987e\u6216\u5076\u7136\u6765\u5230\u8fd9\u91cc\u7684\u8bbf\u5ba2\u4eec\u53c2\u8003\u3002"),React.createElement("h4",null,"\u4f5c\u8005\u7684\u90ae\u7bb1"),React.createElement("p",null,"Email: zhaoqi.xiao@qq.com"))},A=a(58),D=Object(A.a)(),P=ReactRouterDOM,j=P.BrowserRouter,M=P.Switch,F=P.Route,T=P.Link;window.PARADISE_history=window.PARADISE_history||D;var L=function(t){Object(c.a)(a,t);var e=Object(o.a)(a);function a(t){var r;return Object(n.a)(this,a),(r=e.call(this,t)).state={loading:!1,articleList:[],article:{}},r.initData=function(){(function(){return f.apply(this,arguments)})().then((function(t){return t.filter((function(t){return"file"===t.type}))})).then((function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(document.location.hash){var e=document.location.hash.split("#")[1],a=t.filter((function(t){return e.indexOf(t.sha)>-1}));a.length?R(a[0].name).then((function(t){t&&r.setState({article:{title:JSON.parse(decodeURIComponent(escape(atob(t.content)))).title,content:JSON.parse(decodeURIComponent(escape(atob(t.content)))).content,time:JSON.parse(decodeURIComponent(escape(atob(t.content)))).time,catagory:JSON.parse(decodeURIComponent(escape(atob(t.content)))).catagory,author:JSON.parse(decodeURIComponent(escape(atob(t.content)))).author,sha:t.sha}})})):location.href=location.origin}r.setState({articleList:t.map((function(t){var e=t.name.slice(-16,-3).replace(/\D*/,"");if(13===e.length){var a=t.name.slice(0,-3).split("-"),n=new Date(parseInt(e));t.year=n.getFullYear(),t.month=n.getMonth()+1,t.day=n.getDate(),t.date=n.toLocaleDateString(),t.catagory=a[1],t.author=a.length>3?a[2]:"zhaoqi.xiao"}return t})).sort((function(t,e){return t.date<e.date?1:-1}))||[]})}))},r.loading=function(){r.setState({loading:!r.state.loading})},r.coloring=function(t){document.querySelector(":root").setAttribute("style","--mainColor: "+t.target.value),r.forceUpdate()},window.PARADISE_CITY_Loading=r.loading,r}return Object(r.a)(a,[{key:"componentDidMount",value:function(){this.initData()}},{key:"render",value:function(){return React.createElement(j,{history:D},React.createElement("nav",{className:s.a["sider-menu"]},React.createElement("label",{htmlFor:"color",title:"\u70b9\u51fb\u66f4\u6362\u6587\u5b57\u989c\u8272"},"\ud83d\udc6b"),React.createElement(T,{to:"/ParadiseCity/about",style:{float:"right"}},"\u6211"),React.createElement(T,{to:"/ParadiseCity/write",style:{float:"right"}},"\u5199"),React.createElement(T,{to:"/ParadiseCity/",onClick:this.initData,style:{float:"right"}},"\u8bfb"),React.createElement("span",{className:s.a["scroll-tips"]},React.createElement(T,{to:"/ParadiseCity/",onClick:this.initData},"\u4e3a\u800c\u4e0d\u4e89")),React.createElement("input",{type:"color",id:"color",onChange:this.coloring})),React.createElement("div",{className:s.a.content},React.createElement(M,null,React.createElement(F,{exact:!0,path:"/ParadiseCity/"},React.createElement(N,{articleList:this.state.articleList})),React.createElement(F,{exact:!0,path:"/ParadiseCity/article"},React.createElement(x,{article:this.state.article})),React.createElement(F,{exact:!0,path:"/ParadiseCity/write"},React.createElement(I,null)),React.createElement(F,{exact:!0,path:"/ParadiseCity/about"},React.createElement(O,null)))),this.state.loading&&React.createElement("div",{className:s.a.loading}),React.createElement("div",{className:s.a.mask+(this.state.loading?"":" hide")}))}}]),a}(React.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));ReactDOM.render(React.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))},59:function(t,e,a){t.exports=a(195)},60:function(t,e,a){}},[[59,1,2]]]);
//# sourceMappingURL=main.5295baaa.chunk.js.map