(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{63:function(t,e,i){},64:function(t,e,i){},71:function(t,e,i){"use strict";i.r(e);var n=i(0),c=i(9),a=i.n(c),r=(i(63),i(41)),o=i(13),l=i(23),s=i(17),j=(i(64),i(106)),d=i(115),u=i(105),b=i(5);var O=function(t){var e=Object(n.useState)(""),i=Object(s.a)(e,2),c=i[0],a=i[1],r=Object(n.useState)(!1),o=Object(s.a)(r,2),l=o[0],O=o[1],h=function(){var e=c.trim();e?t.addItem(e):O(!0),a("")};return Object(b.jsxs)("div",{children:[Object(b.jsx)(d.a,{variant:"outlined",error:l,value:c,onChange:function(t){a(t.currentTarget.value),O(!1)},onKeyPress:function(t){"Enter"===t.key&&h()},label:"Title",helperText:l&&"Title is required!",size:"small"}),Object(b.jsx)(u.a,{onClick:h,color:"primary",children:Object(b.jsx)(j.a,{})})]})};var h=function(t){var e=Object(n.useState)(!1),i=Object(s.a)(e,2),c=i[0],a=i[1],r=Object(n.useState)(t.title),o=Object(s.a)(r,2),l=o[0],j=o[1];return c?Object(b.jsx)(d.a,{color:"primary",variant:"filled",value:l,autoFocus:!0,onChange:function(t){return j(t.currentTarget.value)},onBlur:function(){a(!1),t.changeTitle(l)}}):Object(b.jsxs)("span",{onDoubleClick:function(){return a(!0)},children:["  ",t.title,"  "]})},f=i(117),x=i(108),v=i(73),m=i(107);var p=function(t){var e=t.filter,i=t.tasks.map((function(e){var i=e.isDone?"is-done":"";return Object(b.jsxs)("li",{className:i,children:[Object(b.jsxs)("span",{className:i,children:[Object(b.jsx)(f.a,{color:"primary",checked:e.isDone,onChange:function(i){t.changeTaskStatus(e.id,i.currentTarget.checked,t.todoListID)}}),Object(b.jsx)(h,{title:e.title,changeTitle:function(i){return t.changeTaskTitle(e.id,i,t.todoListID)}})]}),Object(b.jsx)(u.a,{onClick:function(){return t.removeTask(e.id,t.todoListID)},color:"secondary",children:Object(b.jsx)(m.a,{})})]},e.id)}));return Object(b.jsx)("div",{children:Object(b.jsxs)("div",{children:[Object(b.jsxs)("h3",{children:[Object(b.jsx)(h,{title:t.title,changeTitle:function(e){return t.changeTodolistTitle(e,t.todoListID)}}),Object(b.jsx)(u.a,{onClick:function(){return t.removeTodolist(t.todoListID)},color:"secondary",children:Object(b.jsx)(m.a,{})})]}),Object(b.jsx)(O,{addItem:function(e){return t.addTask(e,t.todoListID)}}),Object(b.jsx)("ul",{style:{listStyle:"none",paddingLeft:"0px"},children:i}),Object(b.jsx)("div",{children:Object(b.jsxs)(x.a,{children:[Object(b.jsx)(v.a,{size:"small",variant:"all"===e?"contained":"text",color:"primary",onClick:function(){return t.changeFilter("all",t.todoListID)},children:"All"}),Object(b.jsx)(v.a,{size:"small",style:{marginLeft:3},variant:"active"===e?"contained":"text",color:"primary",onClick:function(){return t.changeFilter("active",t.todoListID)},children:"Active"}),Object(b.jsx)(v.a,{size:"small",style:{marginLeft:3},variant:"completed"===e?"contained":"text",color:"primary",onClick:function(){return t.changeFilter("completed",t.todoListID)},children:"Completed"})]})})]})})},g=i(116),T=i(109),k=i(72),y=i(110),D=i(111),L=i(113),I=i(114),C=i(112);var S=function(){var t,e=Object(g.a)(),i=Object(g.a)(),c=Object(n.useState)([{id:e,title:"What to learn",filter:"all"},{id:i,title:"What to buy",filter:"all"}]),a=Object(s.a)(c,2),j=a[0],d=a[1],h=Object(n.useState)((t={},Object(l.a)(t,e,[{id:Object(g.a)(),title:"HTML",isDone:!0},{id:Object(g.a)(),title:"CSS",isDone:!1},{id:Object(g.a)(),title:"React",isDone:!0}]),Object(l.a)(t,i,[{id:Object(g.a)(),title:"Milk",isDone:!0},{id:Object(g.a)(),title:"Meat",isDone:!0},{id:Object(g.a)(),title:"Bread",isDone:!0}]),t)),f=Object(s.a)(h,2),x=f[0],m=f[1];function S(t,e){x[e]=x[e].filter((function(e){return e.id!==t})),m(Object(o.a)({},x))}function w(t,e){var i={id:Object(g.a)(),title:t,isDone:!1};m(Object(o.a)(Object(o.a)({},x),{},Object(l.a)({},e,[i].concat(Object(r.a)(x[e])))))}function F(t,e,i){x[i]=x[i].map((function(i){return i.id===t?Object(o.a)(Object(o.a)({},i),{},{isDone:e}):i})),m(Object(o.a)({},x))}function z(t,e,i){x[i]=x[i].map((function(i){return i.id===t?Object(o.a)(Object(o.a)({},i),{},{title:e}):i})),m(Object(o.a)({},x))}function B(t,e){d(j.map((function(i){return i.id===e?Object(o.a)(Object(o.a)({},i),{},{filter:t}):i})))}function W(t,e){d(j.map((function(i){return i.id===e?Object(o.a)(Object(o.a)({},i),{},{title:t}):i})))}function M(t){switch(t.filter){case"active":return x[t.id].filter((function(t){return!t.isDone}));case"completed":return x[t.id].filter((function(t){return t.isDone}));default:return x[t.id]}}function A(t){d(j.filter((function(e){return e.id!==t})))}var E=j.map((function(t){return Object(b.jsx)(T.a,{item:!0,children:Object(b.jsx)(k.a,{elevation:10,style:{padding:"15px",borderRadius:"10px",border:"1px solid lightblue"},children:Object(b.jsx)(p,{todoListID:t.id,title:t.title,tasks:M(t),filter:t.filter,addTask:w,removeTask:S,changeFilter:B,changeTaskStatus:F,removeTodolist:A,changeTaskTitle:z,changeTodolistTitle:W},t.id)})},t.id)}));return Object(b.jsxs)("div",{children:[Object(b.jsx)(y.a,{position:"static",children:Object(b.jsxs)(D.a,{style:{justifyContent:"space-between"},children:[Object(b.jsx)(u.a,{color:"inherit",children:Object(b.jsx)(C.a,{})}),Object(b.jsx)(L.a,{variant:"h6",children:"Todolists"}),Object(b.jsx)(v.a,{color:"inherit",variant:"outlined",children:"Login"})]})}),Object(b.jsxs)(I.a,{fixed:!0,children:[Object(b.jsx)(T.a,{container:!0,style:{padding:"20px 0px "},children:Object(b.jsx)(O,{addItem:function(t){var e=Object(g.a)(),i={id:e,title:t,filter:"all"};d([].concat(Object(r.a)(j),[i])),m(Object(o.a)(Object(o.a)({},x),{},Object(l.a)({},e,[])))}})}),Object(b.jsx)(T.a,{container:!0,spacing:3,children:E})]})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(Object(b.jsx)(S,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[71,1,2]]]);
//# sourceMappingURL=main.bd1215ae.chunk.js.map