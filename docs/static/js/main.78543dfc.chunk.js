(this["webpackJsonpparadise-city-mini"]=this["webpackJsonpparadise-city-mini"]||[]).push([[0],{1:function(e,t,a){e.exports={root:"src_root__39kTn",content:"src_content__2Phc-",loading:"src_loading__25YUa",load:"src_load__1xkeu",loaded:"src_loaded__1VmJY","sider-menu":"src_sider-menu__IjrAu",flagcounter:"src_flagcounter__3vBzl",about:"src_about__3dBuZ",back:"src_back__1f5Pc",title:"src_title__1wFcY","article-title":"src_article-title__2Z_DP","article-timestamp":"src_article-timestamp__21eB8","article-content":"src_article-content__ON2mb","write-title":"src_write-title__3r8TB","editor-container":"src_editor-container__GXPwU","write-textarea":"src_write-textarea__1ghOX",parseMarkdown:"src_parseMarkdown__apsFu",submitButton:"src_submitButton__17s1V"}},204:function(e,t){},215:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(73),o=a.n(c),l=(a(81),a(21)),i=a(22),s=a(25),u=a(23),m=a(26),p=a(13),h=a(11),d=a(27),f=a(1),g=a.n(f),b=a(24),_=a.n(b),E=a(3),v=a.n(E),w=a(10),y="61e06fdec3996fbda3c",x="eb8094d137bf927e7e5b2";function O(){return(O=Object(w.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.github.com/repos/xiaozhaoqi/privateRepository/contents/files/article?access_token="+y+x,{method:"GET"}).then((function(e){return e.status<299?e.json():null})).then((function(e){return e})).catch((function(e){console.log(e),alert("\u83b7\u53d6\u8bb0\u5f55\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u3002")}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(e){return k.apply(this,arguments)}function k(){return(k=Object(w.a)(v.a.mark((function e(t){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.github.com/repos/xiaozhaoqi/privateRepository/contents/files/article/"+t+"?access_token="+y+x,{method:"GET"}).then((function(e){return e.json()})).then((function(e){return e})).catch((function(e){console.log(e),alert("\u83b7\u53d6\u8bb0\u5f55\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u3002")}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function N(){return(N=Object(w.a)(v.a.mark((function e(t,a,n){var r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=Date.now(),e.next=3,fetch("https://api.github.com/repos/xiaozhaoqi/privateRepository/contents/files/article/"+t+"-"+r+".md?access_token="+y+x,{method:"PUT",body:JSON.stringify({message:"AutoPush Article: "+t,content:btoa(unescape(encodeURIComponent(JSON.stringify({title:t,content:a,time:r,category:n}))))})}).then((function(e){return e.json()})).then((function(e){return!0})).catch((function(e){return alert("\u521b\u5efa\u8bb0\u5f55\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u3002"),!1}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function j(){return(j=Object(w.a)(v.a.mark((function e(t,a){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.github.com/repos/xiaozhaoqi/privateRepository/contents/files/article/"+t+".md?access_token="+y+x,{method:"DELETE",body:JSON.stringify({message:"AutoDelete article: "+t,sha:a})}).then((function(e){return e.json()})).then((function(e){return e})).catch((function(e){console.log(e)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var I=function(e){var t=Object(n.useState)("titleList"),a=Object(d.a)(t,2),c=a[0],o=a[1],l=Object(n.useState)([]),i=Object(d.a)(l,2),s=i[0],u=i[1],m=Object(n.useState)({title:"",content:"",time:"",category:"",sha:""}),p=Object(d.a)(m,2),h=p[0],f=p[1];return Object(n.useEffect)((function(){e.loading(),function(){return O.apply(this,arguments)}().then((function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(e.loading(),u(t.map((function(e){var t=e.name.slice(-16,-3).replace(/\D*/,"");if(13===t.length){var a=new Date(parseInt(t));e.year=a.getFullYear(),e.month=a.getMonth()+1,e.day=a.getDate(),e.date=a.toLocaleDateString()}else e.year=0,e.month=0,e.day=0,e.date="0000/00/00";return e})).sort((function(e,t){return e.date<t.date?1:-1}))||[]),window.location.search){var a=window.location.search.split("?s=")[1],n=t.filter((function(e){return a.indexOf(e.sha)>-1}));n.length&&(e.loading(),o("articleDetail"),S(n[0].name).then((function(t){e.loading(),window.history.replaceState(null,null,"?s="+t.sha),t&&f({title:JSON.parse(decodeURIComponent(escape(atob(t.content)))).title,content:JSON.parse(decodeURIComponent(escape(atob(t.content)))).content,time:JSON.parse(decodeURIComponent(escape(atob(t.content)))).time,category:JSON.parse(decodeURIComponent(escape(atob(t.content)))).category,sha:t.sha})})))}}))}),[]),r.a.createElement("div",null,"titleList"===c?s.map((function(t){return r.a.createElement("p",{className:g.a.title,key:t.name,onClick:function(){e.loading(),o("articleDetail"),S(t.name).then((function(t){e.loading(),window.history.replaceState(null,null,"?s="+t.sha),t&&f({title:JSON.parse(decodeURIComponent(escape(atob(t.content)))).title,content:JSON.parse(decodeURIComponent(escape(atob(t.content)))).content,time:JSON.parse(decodeURIComponent(escape(atob(t.content)))).time,category:JSON.parse(decodeURIComponent(escape(atob(t.content)))).category,sha:t.sha})}))}},r.a.createElement("span",null,"[",t.date,"] "),t.name.slice(0,"0000/00/00"===t.date?-3:-17))})):r.a.createElement("div",null,r.a.createElement("p",{className:g.a["article-title"]},h.title),r.a.createElement("p",{className:g.a["article-timestamp"]},h.time?r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{className:g.a.back,onClick:function(){o("titleList"),f({title:"",content:"",time:"",category:"",sha:""})}},"\u8fd4\u56de\u6807\u9898\u5217\u8868"),"--mainColor: #f0f0f0"===document.querySelector(":root").getAttribute("style")?r.a.createElement("button",{className:g.a.back,onClick:function(){(function(e,t){return j.apply(this,arguments)})(h.title+"-"+h.time,h.sha).then((function(){location.reload()}))}},"\u5220\u9664"):null,r.a.createElement("span",null,new Date(h.time).toLocaleString())):null),r.a.createElement(_.a,{className:g.a["article-content"],source:h.content,escapeHtml:!1})))},C=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).recorder=void 0,a.clearInput=function(){a.setState({text:"",title:""}),localStorage.removeItem("writing-title"),localStorage.removeItem("writing-text")},a.save=function(){localStorage.setItem("writing-title",a.state.title),localStorage.setItem("writing-text",a.state.text),console.log((new Date).toLocaleString()+"\uff0c\u81ea\u52a8\u4fdd\u5b58\u8349\u7a3f\u6210\u529f\uff01")},a.push=function(){a.state.title?(a.props.loading(),function(e,t,a){return N.apply(this,arguments)}(a.state.title,a.state.text,"\u6280\u672f").then((function(){a.props.loading(),alert("\u606d\u559c\uff0c\u53d1\u5e03\u6210\u529f\uff01"),a.clearInput()}))):alert("\u8bf7\u8f93\u5165\u6807\u9898\u3002")},a.state={text:localStorage.getItem("writing-text")||"",title:localStorage.getItem("writing-title")||"",category:"life"},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.recorder=setInterval((function(){var t=localStorage.getItem("writing-text")&&localStorage.getItem("writing-text").length||0;Math.abs(t-e.state.text.length)>100&&e.save()}),3e4)}},{key:"componentWillUnmount",value:function(){clearInterval(this.recorder)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("input",{className:g.a["write-title"],value:this.state.title,onChange:function(t){e.setState({title:t.target.value})}}),r.a.createElement("div",{className:g.a["editor-container"]},r.a.createElement("textarea",{onChange:function(t){e.setState({text:t.target.value})},className:g.a["write-textarea"],value:this.state.text}),r.a.createElement(_.a,{source:this.state.text,className:g.a.parseMarkdown,escapeHtml:!1})),r.a.createElement("div",null,r.a.createElement("button",{onClick:this.push,className:g.a.submitButton},"\u53d1\u5e03"),r.a.createElement("button",{className:g.a.submitButton,onClick:this.clearInput},"\u91cd\u7f6e")))}}]),t}(r.a.Component),F=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h3",null,"\u5173\u4e8e\u4f5c\u8005"),r.a.createElement("p",null,"\u4f60\u597d\uff0c\u8bbf\u5ba2\u3002"),r.a.createElement("p",null,"\u4e3a\u4e86\u907f\u514d\u9057\u5fd8\uff0c\u6211\u642d\u5efa\u4e86\u8fd9\u4e2a\u535a\u5ba2\u7528\u6765\u8bb0\u5f55\u4e00\u5207\u3002"),r.a.createElement(p.b,{to:"/write"},r.a.createElement("a",null,"\u4f60\u53ef\u4ee5\u901a\u8fc7\u7559\u8a00\u7684\u65b9\u5f0f\u8054\u7cfb\u6211\u3002")),r.a.createElement("p",null),r.a.createElement("img",{width:"200px",src:"https://s11.flagcounter.com/count/m1nf/bg_FFFFFF/txt_000000/border_FFFFFF/columns_2/maxflags_64/viewers_3/labels_1/pageviews_1/flags_0/percent_0/",alt:""}))},J=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={loading:!1},a.loading=function(){a.setState({loading:!a.state.loading})},a.coloring=function(e){document.querySelector(":root").setAttribute("style","--mainColor: "+e.target.value),a.forceUpdate()},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(p.a,null,r.a.createElement("nav",{className:g.a["sider-menu"]},r.a.createElement(p.b,{to:"/"},r.a.createElement("ruby",null,"\u8bb0\u5f55",r.a.createElement("rt",null,"ji lu"))),r.a.createElement("label",{htmlFor:"color"}," \ud83d\udc6b "),r.a.createElement(p.b,{to:"/write"},r.a.createElement("ruby",null,"\u5199\u4f5c",r.a.createElement("rt",null,"xie zuo"))),r.a.createElement("input",{type:"color",id:"color",onChange:this.coloring})),r.a.createElement("div",{className:g.a.content},r.a.createElement(h.c,null,r.a.createElement(h.a,{exact:!0,path:"/"},r.a.createElement(I,{loading:this.loading})),r.a.createElement(h.a,{exact:!0,path:"/write"},r.a.createElement(C,{loading:this.loading})),r.a.createElement(h.a,{exact:!0,path:"/about"},r.a.createElement(F,null)))),r.a.createElement("div",{className:g.a.flagcounter,title:"\u4e00\u4e2a\u7b80\u5355\u7684\u8bbf\u95ee\u91cf\u7edf\u8ba1"}),r.a.createElement(p.b,{to:"/about"},r.a.createElement("ruby",null,"\u5173\u4e8e\u4f5c\u8005",r.a.createElement("rt",null,"guan yu zuo zhe"))),this.state.loading?r.a.createElement("div",{className:g.a.loading}):r.a.createElement("div",{className:g.a.loaded}))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(J,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},76:function(e,t,a){e.exports=a(215)},81:function(e,t,a){}},[[76,1,2]]]);
//# sourceMappingURL=main.78543dfc.chunk.js.map