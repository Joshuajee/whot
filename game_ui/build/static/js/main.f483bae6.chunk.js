/*! For license information please see main.f483bae6.chunk.js.LICENSE.txt */
(this.webpackJsonpwhot=this.webpackJsonpwhot||[]).push([[0],{25:function(e){e.exports=JSON.parse('{"cards":["whot:20","whot:20","whot:20","whot:20","whot:20","star:1","star:2","star:3","star:4","star:5","star:7","star:8","circle:1","circle:2","circle:3","circle:4","circle:5","circle:7","circle:8","circle:10","circle:11","circle:12","circle:13","circle:14","triangle:1","triangle:2","triangle:3","triangle:4","triangle:5","triangle:7","triangle:8","triangle:10","triangle:11","triangle:12","triangle:13","triangle:14","cross:1","cross:2","cross:3","cross:4","cross:5","cross:7","cross:10","cross:11","cross:13","cross:14","square:1","square:2","square:3","square:4","square:5","square:7","square:10","square:11","square:13","square:14"]}')},55:function(e,t,n){},56:function(e,t,n){},75:function(e,t,n){},78:function(e,t,n){},79:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(1),r=n.n(c),s=n(21),i=n.n(s),l=n(19),o=(n(55),n(56),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,80)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))}),j=n(23),d=n(7),b=n(5),O="GAME_STATE",h="PLAYER_ONE_STATE",u="PLAYER_TWO_STATE",x="PLAYER_ONE_ACTION",p="PLAYER_TWO_ACTION",g="PLAYER_ONE_INDEX",f="PLAYER_TWO_INDEX",y="REMOVE_LAST",m=function(){return{gameState:{playerOne:{cardAtHand:[""],name:""},playerTwo:{cardAtHand:[""],name:""},market:[""],cardPlayed:[],rules:"rules"},playerOneStates:[],playerTwoStates:[],playerOneActions:[],playerTwoActions:[],playerOneCardIndex:0,playerTwoCardIndex:0,cards:["whot:20","whot:20","whot:20","whot:20","whot:20","star:1","star:2","star:3","star:4","star:5","star:7","star:8","circle:1","circle:2","circle:3","circle:4","circle:5","circle:7","circle:8","circle:10","circle:11","circle:12","circle:13","circle:14","triangle:1","triangle:2","triangle:3","triangle:4","triangle:5","triangle:7","triangle:8","triangle:10","triangle:11","triangle:12","triangle:13","triangle:14","cross:1","cross:2","cross:3","cross:4","cross:5","cross:7","cross:10","cross:11","cross:13","cross:14","square:1","square:2","square:3","square:4","square:5","square:7","square:10","square:11","square:13","square:14"]}}(),v={gameState:m.gameState,playerOneStates:m.playerOneStates,playerTwoStates:m.playerTwoStates,playerOneActions:m.playerOneActions,playerTwoActions:m.playerTwoActions,playerOneCardIndex:m.playerOneCardIndex,playerTwoCardIndex:m.playerTwoCardIndex};console.log(v);var w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments.length>1?arguments[1]:void 0;console.log("Action Type",t.type);var n=t.payload;switch(t.type){case O:return Object(b.a)(Object(b.a)({},e),{},{gameState:n});case h:return Object(b.a)(Object(b.a)({},e),{},{playerOneStates:[].concat(Object(d.a)(e.playerOneStates),[n])});case u:return Object(b.a)(Object(b.a)({},e),{},{playerTwoStates:[].concat(Object(d.a)(e.playerTwoStates),[n])});case x:return Object(b.a)(Object(b.a)({},e),{},{playerOneActions:[].concat(Object(d.a)(e.playerOneActions),[n])});case p:return Object(b.a)(Object(b.a)({},e),{},{playerTwoActions:[].concat(Object(d.a)(e.playerTwoActions),[n])});case g:return Object(b.a)(Object(b.a)({},e),{},{playerOneIndex:n});case f:return Object(b.a)(Object(b.a)({},e),{},{playerTwoIndex:n});case y:return console.log(t),n.pop(),Object(b.a)(Object(b.a)({},e),{},{payload:n});default:return e}},T=Object(j.b)(w),S=n(26),C=n(6),A=n(25);var P=function(e){return Object(a.jsx)("svg",{children:Object(a.jsx)("g",{fill:"brown",className:"center",children:Object(a.jsx)("rect",{x:e.marginLeft,y:e.marginTop,width:e.width,height:e.height})})})};var N=function(e){var t=e.text,n=e.fontSize,c=e.x,r=e.y,s=e.z,i=e.color;return Object(a.jsx)("svg",{children:Object(a.jsx)("g",{fill:i,transform:"rotate("+c+" "+r+" "+s+")",children:Object(a.jsx)("text",{color:i,x:e.marginLeft,y:e.marginTop,fontSize:n,children:t})})})};var k=function(e){var t=e.size,n=t,c=1.5*t,r=.7*n,s=.4*c,i=(n-r)/2,l=(c-s)/2,o=.8*i,j=.8*i,d=.2*i,b=1.6*i,O=.8*i,h=.8*i,u=r+i,x=c-2.4*i,p=.01*n,g=.12*c,f=.01*n,y=.18*c,m=t/5,v=.5*n,w=.8*n;return Object(a.jsxs)("svg",{className:"card",width:n,height:c,children:[Object(a.jsx)(N,{x:0,y:0,z:0,marginLeft:p,marginTop:g,text:e.number,fontSize:m,color:"brown"}),Object(a.jsx)(P,{width:o,height:j,marginLeft:d,marginTop:b}),Object(a.jsx)(P,{width:r,height:s,marginLeft:i,marginTop:l}),Object(a.jsx)(P,{width:O,height:h,marginLeft:u,marginTop:x}),Object(a.jsx)(N,{x:180,y:v,z:w,marginLeft:f,marginTop:y,text:e.number,fontSize:m,color:"brown"})]})};var z=function(e){return Object(a.jsx)("svg",{children:Object(a.jsx)("g",{fill:"brown",children:Object(a.jsx)("circle",{cx:e.marginLeft,cy:e.marginTop,r:e.radius})})})};var L=function(e){var t=e.size,n=t,c=1.5*t,r=n/2,s=c/2,i=n/3,l=.2*n/2,o=.4*c/2,j=.2*n/3,d=1.8*n/2,b=1.6*c/2,O=.2*n/3,h=.01*n,u=.12*c,x=.01*n,p=.18*c,g=t/5,f=.5*n,y=.8*n;return Object(a.jsxs)("svg",{className:"card",width:n,height:c,children:[Object(a.jsx)(N,{x:0,y:0,z:0,marginLeft:h,marginTop:u,text:e.number,fontSize:g,color:"brown"}),Object(a.jsx)(z,{marginLeft:l,marginTop:o,radius:j}),Object(a.jsx)(z,{marginLeft:r,marginTop:s,radius:i}),Object(a.jsx)(z,{marginLeft:d,marginTop:b,radius:O}),Object(a.jsx)(N,{x:180,y:f,z:y,marginLeft:x,marginTop:p,text:e.number,fontSize:g,color:"brown"})]})};var H=function(e){return Object(a.jsx)("svg",{children:Object(a.jsxs)("g",{fill:"brown",children:[Object(a.jsx)("rect",{x:e.marginLeft+e.width/4,y:e.marginTop,width:e.width/2,height:e.height}),Object(a.jsx)("rect",{x:e.marginLeft,y:e.marginTop+e.height/4,width:e.width,height:e.height/2})]})})};var M=function(e){var t=e.size,n=t,c=1.5*t,r=.7*n,s=.4*c,i=(n-r)/2,l=(c-s)/2,o=.7*n*.2,j=.4*c*.2,d=.2*(n-r)/2,b=.5*(c-s)/2,O=.7*n*.2,h=.4*c*.2,u=5.5*(n-r)/2,x=2.5*(c-s)/2,p=.01*n,g=.12*c,f=.01*n,y=.18*c,m=t/5,v=.5*n,w=.8*n;return Object(a.jsxs)("svg",{className:"card",width:n,height:c,children:[Object(a.jsx)(N,{x:0,y:0,z:0,marginLeft:p,marginTop:g,text:e.number,fontSize:m,color:"brown"}),Object(a.jsx)(H,{width:o,height:j,marginLeft:d,marginTop:b}),Object(a.jsx)(H,{width:r,height:s,marginLeft:i,marginTop:l}),Object(a.jsx)(H,{width:O,height:h,marginLeft:u,marginTop:x}),Object(a.jsx)(N,{x:180,y:v,z:w,marginLeft:f,marginTop:y,text:e.number,fontSize:m,color:"brown"})]})};var I=function(e){var t=e.XA,n=e.YA,c=e.XB,r=e.YB,s=e.XC,i=e.YC;return Object(a.jsx)("svg",{children:Object(a.jsx)("g",{fill:"brown",children:Object(a.jsx)("polygon",{points:t+","+n+","+c+","+r+","+s+","+i})})})};var X=function(e){var t=e.size,n=t,c=1.5*t,r=.05*n,s=.7*c,i=.5*n,l=.2*c,o=.95*n,j=.7*c,d=.03*n,b=.21*c,O=.1*n,h=.12*c,u=.17*n,x=.21*c,p=.825*n,g=.756*c,f=.9*n,y=.84*c,m=.9775*n,v=.756*c,w=.01*n,T=.12*c,S=.01*n,C=.18*c,A=t/5,P=.5*n,k=.8*n;return Object(a.jsxs)("svg",{className:"card",width:n,height:c,children:[Object(a.jsx)(N,{x:0,y:0,z:0,marginLeft:w,marginTop:T,text:e.number,fontSize:A,color:"brown"}),Object(a.jsx)(I,{XA:d,YA:b,XB:O,YB:h,XC:u,YC:x}),Object(a.jsx)(I,{XA:r,YA:s,XB:i,YB:l,XC:o,YC:j}),Object(a.jsx)(I,{XA:p,YA:g,XB:f,YB:y,XC:m,YC:v}),Object(a.jsx)(N,{x:180,y:P,z:k,marginLeft:S,marginTop:C,text:e.number,fontSize:A,color:"brown"})]})};var E=function(e){var t=e.XCenter,n=e.top,c=e.XTop,r=e.XTopLeft,s=e.XTopRight,i=e.bottom,l=e.XBottomLeft,o=e.XBottomRight;return Object(a.jsx)("svg",{children:Object(a.jsx)("g",{fill:"brown",children:Object(a.jsx)("polygon",{points:t+","+n+","+l+","+i+","+s+","+c+","+r+","+c+","+o+","+i})})})};var Y=function(e){var t=e.size,n=t,c=1.5*t,r=n/2,s=.2*c,i=.42*c,l=.1*n,o=.9*n,j=.75*c,d=.2*n,b=.8*n,O=.24*n,h=.12*c,u=.195*c,x=.08*n,p=.382*n,g=.32*c,f=.12*n,y=.34*n,m=.8*n,v=.9*c,w=.83*c,T=.94*n,S=.66*n,C=.72*c,A=.9*n,P=.7*n,k=.01*n,z=.12*c,L=.01*n,H=.18*c,M=.21*n,I=.25*c,X=.17*n,Y=.295*c;e.number>4&&(M=.17*n,I=.25*c,X=.14*n,Y=.295*c);var q=t/5,W=t/10,R=.5*n,B=.8*n,G=parseInt(e.number),_=2*G;return e.need&&(G="",_=""),Object(a.jsxs)("svg",{className:"card",width:n,height:c,children:[Object(a.jsx)(N,{x:0,y:0,z:0,marginLeft:k,marginTop:z,text:G,fontSize:q,color:"brown"}),Object(a.jsx)(E,{XCenter:O,top:h,XTop:u,XTopLeft:x,XTopRight:p,bottom:g,XBottomLeft:f,XBottomRight:y}),Object(a.jsx)(N,{x:0,y:0,z:0,marginLeft:M,marginTop:I,text:_,fontSize:W,color:"white"}),Object(a.jsx)(E,{XCenter:r,top:s,XTop:i,XTopLeft:l,XTopRight:o,bottom:j,XBottomLeft:d,XBottomRight:b}),Object(a.jsx)(E,{XCenter:m,top:v,XTop:w,XTopLeft:T,XTopRight:S,bottom:C,XBottomLeft:A,XBottomRight:P}),Object(a.jsx)(N,{x:180,y:R,z:B,marginLeft:L,marginTop:H,text:G,fontSize:q,color:"brown"}),Object(a.jsx)(N,{x:180,y:R,z:B,marginLeft:X,marginTop:Y,text:_,fontSize:W,color:"white"})]})};var q=function(e){var t=e.size,n=t,c=1.5*t,r=n/5,s=c/2.1,i=n/5,l=c/1.9,o=.1*n,j=.25*c,d=.1*n,b=.3*c,O=.01*n,h=.12*c,u=.01*n,x=.18*c,p=t/4,g=t/6,f=t/5,y=.5*n,m=.8*n;return Object(a.jsxs)("svg",{className:"card",width:n,height:c,children:[Object(a.jsx)(N,{x:0,y:0,z:0,marginLeft:O,marginTop:h,text:20,fontSize:f,color:"brown"}),Object(a.jsx)(N,{x:0,y:0,z:0,marginLeft:o,marginTop:j,text:"W",fontSize:g,color:"brown"}),Object(a.jsx)(N,{x:0,y:0,z:0,marginLeft:r,marginTop:s,text:"Whot",fontSize:p,color:"brown"}),Object(a.jsx)(N,{x:180,y:y,z:m,marginLeft:i,marginTop:l,text:"Whot",fontSize:p,color:"brown"}),Object(a.jsx)(N,{x:180,y:y,z:m,marginLeft:d,marginTop:b,text:"W",fontSize:g,color:"brown"}),Object(a.jsx)(N,{x:180,y:y,z:m,marginLeft:u,marginTop:x,text:20,fontSize:f,color:"brown"})]})};var W=function(e){var t=e.size,n=t,c=1.5*t,r=n/5,s=c/2.1,i=n/5,l=c/1.9,o=t/4,j=.5*n,d=.8*n;return Object(a.jsxs)("svg",{className:"card card-cover",width:n,height:c,children:[Object(a.jsx)(N,{x:0,y:0,z:0,marginLeft:r,marginTop:s,text:"Whot",fontSize:o,color:"white"}),Object(a.jsx)(N,{x:180,y:j,z:d,marginLeft:i,marginTop:l,text:"Whot",fontSize:o,color:"white"})]})};var R=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],c=e.indexOf(":"),r=e.slice(c+1,e.length),s=e.slice(0,c);switch(s){case"star":return Object(a.jsx)(Y,{size:t,number:r,need:n});case"circle":return Object(a.jsx)(L,{size:t,number:r});case"square":return Object(a.jsx)(k,{size:t,number:r});case"cross":return Object(a.jsx)(M,{size:t,number:r});case"triangle":return Object(a.jsx)(X,{size:t,number:r});case"whot":return Object(a.jsx)(q,{size:t,number:r});default:return Object(a.jsx)(W,{size:t})}},B=n(13),G=n.n(B);function _(e){return console.log("Update GAME STATE",e),{type:O,payload:e}}function D(e){return console.log("Update Player One States",e),{type:h,payload:e}}function F(e){return console.log("Update Player One Actions",e),{type:x,payload:e}}function U(e){return console.log("Update Player Two Actions",e),{type:p,payload:e}}function J(e){return console.log("Remove Last",e),{type:y,payload:e}}function V(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,a=arguments.length>3?arguments[3]:void 0,c=Object(b.a)({},e),r=c.market,s=0;s<n;s++)r.length>0&&(t===e.playerOne.name?c.playerOne.cardAtHand.push(r[r.length-1]):t===e.playerTwo.name&&c.playerTwo.cardAtHand.push(r[r.length-1]),c.market.pop());a(_(c))}function K(e,t,n,a){var c=e.playerTwo.name,r=e.playerOne.name,s=r;n===r?s=c:n===c&&(s=r);var i=e.rules,l=t[0].indexOf(":")+1,o=parseInt(t[0].slice(l,t[0].length));return-2!==t[1]&&function(e,t,n,a,c){var r=Object(b.a)({},e),s=r.playerTwo.cardAtHand;r.playerOne.name===t&&(s=r.playerOne.cardAtHand);if(console.log("game played ",n),20===a)r.cardPlayed.pop(),r.cardPlayed.push(n[0]);else if("z:goMarket"!==n[0]){r.cardPlayed.push(n[0]);for(var i=0;i<s.length;i++)s[i]===n[0]&&s.splice(i,1)}c(_(r)),console.log(" Game State ",r)}(e,n,t,o,a),(!i.holdOn.active||o!==i.holdOn.card)&&(i.pickTwo.active&&o===i.pickTwo.card?(V(e,s,2,a),!1):i.pickThree.active&&o===i.pickThree.card?(V(e,s,3,a),!1):(!i.suspension.active||o!==i.suspension.card)&&(!i.generalMarket.active||o!==i.generalMarket.card||(V(e,s,1,a),!1)))}function Q(e,t,n,a,c,r){setTimeout(Z,1500,0,e,t,n,a,c,r)}function Z(e,t,n,a,c,r,s){var i,l=n.playerTwo.name,o=n.playerTwo.cardAtHand,j=n.cardPlayed,d=t[e][0].indexOf(":")+1,O=parseInt(t[e][0].slice(d,t[e][0].length)),h=ce(n,ae(o,j[j.length-1]),!1,c);if(t[e][1]>=0&&r((i=h,console.log("Update Player Two States",i),{type:u,payload:i})),20===O){var x=Object(b.a)({},n);x.cardPlayed.push(t[e][0]);for(var p=0;p<o.length;p++)"whot:20"===o[p]&&x.playerTwo.cardAtHand.splice(p,1);r(_(x))}else"z:goMarket"!==t[e][0]?K(n,t[e],l,r):V(n,l,1,r);e+1<t.length?setTimeout(Z,1500,e+1,t,n,a,c,r,s):s(!1)}function $(e,t,n,a,c,r){var s=Object(b.a)({},e),i=s.playerOne.cardAtHand,l=s.playerTwo.cardAtHand,o=s.market,j=s.cardPlayed;if(console.log(" state 1",t),console.log(" state 2",a),console.log(" action 1",n),console.log(" action 2",c),i.length<1||l.length<1)ne(e,t,n,a,c,r),e.playerOne.cardAtHand<1&&alert(e.playerOne.name+" Wins "),e.playerTwo.cardAtHand<1&&alert(e.playerTwo.name+" Wins ");else if(o.length<1){ne(e,t,n,a,c,r);var O=function(e){for(var t=[],n=0;n<e.length;n++){var a=e[n].indexOf(":")+1;20===parseInt(e[n].slice(a,e.length))?t.push("whot:20"):t.push(e[n])}return t}(j);s.market=O,s.cardPlayed=[j[j.length-1]],s.market.pop(),s.market=ee(Object(d.a)(s.market)),r(_(s)),console.log(s)}}function ee(e){for(var t=e.length;0!==t;){var n=Math.floor(Math.random()*t),a=e[--t];e[t]=e[n],e[n]=a}return e}function te(e,t,n,a,c){var r=Object(b.a)({},e);r.playerOne.cardAtHand.push(t[0]),r.cardPlayed.pop(),c(J(n)),c(J(a)),c(_(r))}function ne(e,t,n,a,c,r){var s=se(t,n),i=se(a,c);console.log("PPPPPPPPPPPPPPPPPPPP"),console.log(t),console.log(n),G.a.post("/api/v1/save",{agentName:e.playerTwo.name,user:e.playerOne.name,gameState:e,playerOneStatesAndActions:s,playerTwoStatesAndActions:i}).then((function(e){console.log(e)})).catch((function(e){console.log(e),alert(e)}))}function ae(e,t){for(var n=t.indexOf(":")+1,a=parseInt(t.slice(n,t.length)),c=t.slice(0,n),r=["z:goMarket"],s=0;s<e.length;s++){var i=e[s].indexOf(":")+1,l=parseInt(e[s].slice(i,e[s].length)),o=e[s].slice(0,i);if(20===l)return r.sort(),r.push("circle:20","cross:20","square:20","star:20","triangle:20"),r;(l===a||o===c)&&r.push(e[s])}return r.sort()}function ce(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if(n)return{agentName:e.playerOne.name,cardAtHand:Object(d.a)(e.playerOne.cardAtHand),cardInPlay:e.cardPlayed[e.cardPlayed.length-1],cardPlayed:Object(d.a)(e.cardPlayed),noOfCardsInMarket:e.market.length,noOfCardsWithOpponent:e.playerTwo.cardAtHand.length,noOfCardPlayed:e.cardPlayed.length,noOfCardAtHand:e.playerOne.cardAtHand.length,availableMove:Object(d.a)(t),rules:e.rules};var c={agentName:e.playerTwo.name,availableMove:Object(d.a)(t)};return a.useCardAtHand&&(c.cardAtHand=Object(d.a)(e.playerTwo.cardAtHand)),a.useNoOfCardAtHand&&(c.noOfCardAtHand=e.playerTwo.cardAtHand.length),a.useCardInPlay&&(c.cardInPlay=e.cardPlayed[e.cardPlayed.length-1]),a.useCardPlayed&&(c.cardPlayed=Object(d.a)(e.cardPlayed)),a.useNoOfCardPlayed&&(c.noOfCardPlayed=e.cardPlayed.length),a.useNoOfCardsInMarket&&(c.noOfCardsInMarket=e.market.length),a.useNoOfCardsWithOpponent&&(c.noOfCardsWithOpponent=e.playerOne.cardAtHand.length),a.useRules&&(c.rules=e.rules),c}function re(e,t){if(0===e.length)return-1;for(var n=0;n<e.length;n++)if(e[n]===t)return n}function se(e,t){for(var n=[],a=[],c=0;c<t.length;c++)t[c][1]>-1&&(n.push(e[c]),a.push([t[c][0],t[c][1]]));return[n,a]}var ie=Object(d.a)(A.cards);ie.push("cover:20");var le=function(){var e=window.innerWidth*window.innerHeight,t=Math.sqrt(e/114);ie=ee(ie);for(var n=[],c=0;c<ie.length;c++)n.push(R(ie[c],t));return Object(a.jsx)("div",{className:"start-page",children:n})};var oe=function(e){return Object(a.jsx)("div",{children:Object(a.jsx)(S.b,{to:e.link,children:Object(a.jsx)("button",{className:e.class,children:e.text})})})},je=n(42),de=n(43),be=n(45),Oe=n(44),he=(n(75),function(e){Object(be.a)(n,e);var t=Object(Oe.a)(n);function n(){return Object(je.a)(this,n),t.apply(this,arguments)}return Object(de.a)(n,[{key:"render",value:function(){var e=this.props.visibility,t=this.props.close;return Object(a.jsx)("div",{children:Object(a.jsx)("div",{className:"modal "+e,children:Object(a.jsxs)("div",{className:"modal-content",children:[Object(a.jsx)("span",{className:"close",onClick:function(){return t("cccc")},children:"\xd7"}),Object(a.jsx)("center",{children:this.props.text})]})})})}}]),n}(r.a.Component)),ue=function(){var e={marginTop:.25*window.innerHeight};return Object(a.jsxs)("center",{children:[Object(a.jsx)(le,{}),Object(a.jsxs)("div",{style:e,children:[Object(a.jsx)(oe,{text:"Play Game",link:"/leaderboard",class:"btn-start"}),Object(a.jsx)(oe,{text:"Rules",link:"/rules",class:"btn-rules"}),Object(a.jsx)(oe,{text:"Leaderboard",link:"/leaderboard",class:"btn-leader"}),Object(a.jsx)(oe,{text:"Create Agent",link:"/create-agent",class:"btn-create"}),Object(a.jsx)(oe,{text:"Settings",link:"/settings",class:"btn-settings"}),Object(a.jsx)(he,{})]})]})};var xe=function(){var e=window.innerWidth/2-175,t=window.innerHeight/2-262.5;return Object(a.jsx)("center",{className:"whot-background",style:{top:t,left:e},children:R("",350)})},pe=function(){return Object(a.jsxs)("div",{children:[Object(a.jsx)(xe,{}),Object(a.jsx)("center",{style:{marginTop:"30vh"},children:Object(a.jsxs)("table",{children:[Object(a.jsx)("thead",{children:Object(a.jsxs)("tr",{children:[" ",Object(a.jsx)("th",{children:" Action "})," ",Object(a.jsx)("th",{children:" Card Number "})," ",Object(a.jsx)("th",{children:" Active "})," ",Object(a.jsx)("th",{children:" Defend "})," "]})}),Object(a.jsxs)("tbody",{children:[Object(a.jsxs)("tr",{children:[" ",Object(a.jsx)("td",{children:" Hold On "})," ",Object(a.jsx)("td",{children:" 1 "})," ",Object(a.jsx)("td",{children:" Yes "})," ",Object(a.jsx)("td",{children:" No "})," "]}),Object(a.jsxs)("tr",{children:[" ",Object(a.jsx)("td",{children:" Pick Two "})," ",Object(a.jsx)("td",{children:" 2 "})," ",Object(a.jsx)("td",{children:" Yes "})," ",Object(a.jsx)("td",{children:" No "})," "]}),Object(a.jsxs)("tr",{children:[" ",Object(a.jsx)("td",{children:" Pick Three "})," ",Object(a.jsx)("td",{children:" 5 "})," ",Object(a.jsx)("td",{children:" Yes "})," ",Object(a.jsx)("td",{children:" No "})," "]}),Object(a.jsxs)("tr",{children:[" ",Object(a.jsx)("td",{children:" Suspension "})," ",Object(a.jsx)("td",{children:" 8 "})," ",Object(a.jsx)("td",{children:" Yes "})," ",Object(a.jsx)("td",{children:" No "})," "]}),Object(a.jsxs)("tr",{children:[" ",Object(a.jsx)("td",{children:" General Market "})," ",Object(a.jsx)("td",{children:" 14 "})," ",Object(a.jsx)("td",{children:" Yes "})," ",Object(a.jsx)("td",{children:" No "})," "]})]})]})})]})},ge=n(2),fe=n(17),ye=n(18),me=function(e){return Object(a.jsx)("div",{className:"agents",children:Object(a.jsx)("table",{children:Object(a.jsxs)("tr",{children:[Object(a.jsx)("td",{children:Object(a.jsx)(fe.a,{size:"5x",color:"gray",icon:ye.c})}),Object(a.jsxs)("td",{children:["Name ",e.agentName," ",Object(a.jsx)("br",{}),"Wins  ",e.wins," ",Object(a.jsx)("br",{}),"Loss ",e.losses," ",Object(a.jsx)("br",{}),"points ",parseFloat(e.points.toPrecision(6))," ",Object(a.jsx)("br",{}),Object(a.jsx)(oe,{text:"Play Agent",class:"btn-play",link:"/game/".concat(e.agentName)})]})]})})})},ve=Object(d.a)(A.cards);var we=function(e){var t=window.innerWidth,n=window.innerHeight,c=n/5,r=Math.floor(Math.random()*ve.length),s={position:"absolute",top:n/2-c,left:t/2-.6666666667*c};return Object(a.jsx)("div",{style:s,className:"loader",children:R(ve[r],c)})},Te=function(){var e=Object(c.useState)(!1),t=Object(ge.a)(e,2),n=t[0],r=t[1],s=Object(c.useState)(null),i=Object(ge.a)(s,2),l=i[0],o=i[1],j=Object(c.useState)(null),d=Object(ge.a)(j,2),b=d[0],O=d[1],h=Object(c.useState)(0),u=Object(ge.a)(h,2),x=u[0],p=u[1];return Object(c.useEffect)((function(){r(!0),G.a.get("/api/v1/leaderboard/".concat(x)).then((function(e){var t;o(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.data),r(!1)}),(function(e){}))}),[x]),Object(c.useEffect)((function(){for(var e=[],t=0;t<(null===l||void 0===l?void 0:l.length);t++)e.push(Object(a.jsx)(me,{agentName:l[t].agentName,points:l[t].points,wins:l[t].wins,losses:l[t].losses}));O(e)}),[l]),n?Object(a.jsx)(we,{}):Object(a.jsxs)("div",{children:[Object(a.jsx)(le,{}),Object(a.jsx)("div",{className:"leaderboard",children:b}),Object(a.jsx)("button",{onClick:function(){return p((function(e){return e-1}))},children:" Prev "}),Object(a.jsx)("button",{onClick:function(){return p((function(e){return e+1}))},children:" Next "})]})},Se=r.a.memo(Te),Ce=function(){return Object(a.jsxs)("div",{children:[Object(a.jsx)(xe,{}),Object(a.jsx)("center",{style:{marginTop:"30vh"},children:Object(a.jsxs)("table",{children:[Object(a.jsx)("thead",{children:Object(a.jsxs)("tr",{children:[" ",Object(a.jsx)("th",{children:" Action "})," ",Object(a.jsx)("th",{children:" Card Number "})," ",Object(a.jsx)("th",{children:" Active "})," ",Object(a.jsx)("th",{children:" Defend "})," "]})}),Object(a.jsxs)("tbody",{children:[Object(a.jsxs)("tr",{children:[" ",Object(a.jsx)("td",{children:" Hold On "})," ",Object(a.jsx)("td",{children:" 1 "})," ",Object(a.jsx)("td",{children:" Yes "})," ",Object(a.jsx)("td",{children:" No "})," "]}),Object(a.jsxs)("tr",{children:[" ",Object(a.jsx)("td",{children:" Pick Two "})," ",Object(a.jsx)("td",{children:" 2 "})," ",Object(a.jsx)("td",{children:" Yes "})," ",Object(a.jsx)("td",{children:" No "})," "]}),Object(a.jsxs)("tr",{children:[" ",Object(a.jsx)("td",{children:" Pick Three "})," ",Object(a.jsx)("td",{children:" 5 "})," ",Object(a.jsx)("td",{children:" Yes "})," ",Object(a.jsx)("td",{children:" No "})," "]}),Object(a.jsxs)("tr",{children:[" ",Object(a.jsx)("td",{children:" Suspension "})," ",Object(a.jsx)("td",{children:" 8 "})," ",Object(a.jsx)("td",{children:" Yes "})," ",Object(a.jsx)("td",{children:" No "})," "]}),Object(a.jsxs)("tr",{children:[" ",Object(a.jsx)("td",{children:" General Market "})," ",Object(a.jsx)("td",{children:" 14 "})," ",Object(a.jsx)("td",{children:" Yes "})," ",Object(a.jsx)("td",{children:" No "})," "]})]})]})})]})},Ae=function(e){return Object(a.jsx)("div",{className:"card-number",children:e.cardNumber})},Pe=function(e){var t=e.height,n=e.width,r=e.isLandscape,s=Object(c.useState)(0),i=Object(ge.a)(s,2),l=i[0],o=i[1],j=Object(c.useState)({}),d=Object(ge.a)(j,2),b=d[0],O=d[1];return Object(c.useEffect)((function(){var e={position:"absolute",top:t/2-l,left:n/2-.6666666667*l};r?o(t/6):(o(n/6),e.top=n/2-l,e.left=t/2-.6666666667*l),O(e)}),[t,n,l,r]),Object(a.jsxs)("div",{style:b,children:[R(e.cards,l),Object(a.jsx)(Ae,{cardNumber:e.cardNumber})]})},Ne=function(e){var t=e.height,n=e.width,r=e.playable,s=e.action,i=e.cardNumber,l=e.isLandscape,o=Object(c.useState)({}),j=Object(ge.a)(o,2),d=j[0],b=j[1],O=Object(c.useState)(0),h=Object(ge.a)(O,2),u=h[0],x=h[1];return Object(c.useEffect)((function(){var e={position:"absolute",top:t/2-u,left:.05*n};l?x(t/6):(x(n/6),e.top=n/2-u,e.left=.05*t),b(e)}),[t,n,l,u]),r?Object(a.jsxs)("div",{style:d,children:[Object(a.jsx)("span",{onClick:function(){return s(["z:goMarket"])},children:R("ff",u)}),Object(a.jsx)(Ae,{cardNumber:i})]}):Object(a.jsxs)("div",{style:d,children:[Object(a.jsx)("span",{children:R("ff",u)}),Object(a.jsx)(Ae,{cardNumber:i})]})},ke=function(e){var t=e.cards,n=e.action,r=e.playable,s=e.index,i=e.isLandscape,l=e.width,o=e.height,j=Object(c.useState)(s),d=Object(ge.a)(j,2),b=d[0],O=d[1],h=Object(c.useState)(0),u=Object(ge.a)(h,2),x=u[0],p=u[1],g=Object(c.useState)(0),f=Object(ge.a)(g,2),y=f[0],m=f[1],v=Object(c.useState)({}),w=Object(ge.a)(v,2),T=w[0],S=w[1],C=Object(c.useState)(null),A=Object(ge.a)(C,2),P=A[0],N=A[1],k=Object(c.useState)(null),z=Object(ge.a)(k,2),L=z[0],H=z[1],M=Object(c.useState)(0),I=Object(ge.a)(M,2),X=I[0],E=I[1],Y=Object(c.useState)(0),q=Object(ge.a)(Y,2),W=q[0],B=q[1],G=Object(c.useState)(0),_=Object(ge.a)(G,2),D=_[0],F=_[1],U=Object(c.useState)({}),J=Object(ge.a)(U,2),V=J[0],K=J[1];Object(c.useEffect)((function(){i?(E(o/6),B(e.top*o-X),p(.05*l),m(l-2*x)):(E(l/6),B(e.top*l-X),p(.1408*o),m(o-2*x))}),[e.top,l,o,X,i]),Object(c.useEffect)((function(){F(y/(1.1*X)),K({height:1.5*X})}),[X,y,l,x]),Object(c.useEffect)((function(){S({position:"absolute",top:W,left:x,width:y,height:X})}),[X,y,x,W,o,l,i]),Object(c.useEffect)((function(){b<t.length-D?H(Object(a.jsx)("span",{style:{top:100},onClick:function(){b<t.length-D&&O(b+1)},children:Object(a.jsx)(fe.a,{style:V,color:"blue",icon:ye.b})})):H(null),N(0!==b?Object(a.jsx)("span",{style:{top:100},onClick:function(){O(b-1)},children:Object(a.jsx)(fe.a,{style:V,color:"blue",icon:ye.a})}):null)}),[V,b,t,D]);return Object(a.jsxs)("div",{style:T,children:[P,function(e,t,n){for(var c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,s=[],i=function(i){if(1.1*(i+1-c)*t>=y)return"break";r?s.push(Object(a.jsxs)("span",{onClick:function(){return n([e[i]])},children:[" ",R(e[i],t)," "]},i)):s.push(Object(a.jsxs)("span",{children:[" ",R(e[i],t)," "]},i))},l=c;l<e.length;l++){var o=i(l);if("break"===o)break}return s}(t.sort(),X,n,b),L,Object(a.jsx)(Ae,{cardNumber:t.length})]})},ze=function(e){var t=e.need,n=window.innerWidth*window.innerHeight,c=Math.sqrt(n/27);return Object(a.jsxs)("div",{className:"need-bar",children:[Object(a.jsx)("div",{className:"background"}),Object(a.jsxs)("div",{className:"cards",children:[Object(a.jsxs)("span",{onClick:function(){return t(["star:20"])},children:[" ",R("star:",c,!0)," "]}),Object(a.jsxs)("span",{onClick:function(){return t(["triangle:20"])},children:[" ",R("triangle:",c),"   "]}),Object(a.jsxs)("span",{onClick:function(){return t(["square:20"])},children:[" ",R("square:",c),"     "]}),Object(a.jsxs)("span",{onClick:function(){return t(["circle:20"])},children:[" ",R("circle:",c),"     "]}),Object(a.jsxs)("span",{onClick:function(){return t(["cross:20"])},children:[" ",R("cross:",c),"      "]})]})]})},Le={holdOn:{active:!0,card:1,defend:!1},pickTwo:{active:!0,card:2,defend:!1},pickThree:{active:!0,card:5,defend:!1},suspension:{active:!0,card:8,defend:!1},generalMarket:{active:!0,card:14,defend:!1},marketFinishGameEnd:!1},He=function(){var e=Object(C.e)().user,t=Object(l.c)((function(e){return e})),n=t.gameState,r=t.playerOneStates,s=t.playerOneActions,i=t.playerTwoStates,o=t.playerTwoActions,j=t.playerOneCardIndex,O=t.playerTwoCardIndex,h=Object(l.b)(),u=Object(c.useState)(window.innerHeight),x=Object(ge.a)(u,2),p=x[0],g=x[1],f=Object(c.useState)(window.innerWidth),y=Object(ge.a)(f,2),m=y[0],v=y[1],w=Object(c.useState)({}),T=Object(ge.a)(w,2),S=T[0],A=T[1],P=Object(c.useState)({}),N=Object(ge.a)(P,2),k=N[0],z=N[1],L=Object(c.useState)(!1),H=Object(ge.a)(L,2),M=H[0],I=H[1],X=Object(c.useState)([]),E=Object(ge.a)(X,2),Y=E[0],q=E[1],W=Object(c.useState)([]),R=Object(ge.a)(W,2),B=R[0],Z=R[1],ee=Object(c.useState)([]),ne=Object(ge.a)(ee,2),se=ne[0],ie=ne[1],le=Object(c.useState)([]),oe=Object(ge.a)(le,2),je=oe[0],de=oe[1],be=Object(c.useState)(!1),Oe=Object(ge.a)(be,2),he=Oe[0],ue=Oe[1],xe=Object(c.useState)(!1),pe=Object(ge.a)(xe,2),fe=pe[0],ye=pe[1],me=Object(c.useState)([]),ve=Object(ge.a)(me,2),Te=ve[0],Se=ve[1],Ce=Object(c.useState)(!0),Ae=Object(ge.a)(Ce,2),He=Ae[0],Me=Ae[1],Ie=Object(c.useState)({}),Xe=Object(ge.a)(Ie,2),Ee=Xe[0],Ye=Xe[1],qe=Object(c.useState)({}),We=Object(ge.a)(qe,2),Re=We[0],Be=We[1];Object(c.useEffect)((function(){window.onresize=function(){g(window.innerHeight),v(window.innerWidth)},window.onorientationchange=function(){g(window.innerHeight),v(window.innerWidth)}}),[]),Object(c.useEffect)((function(){p>m?(Me(!1),Ye({transform:"rotate(90deg)"}),Be({height:.98*m,width:.96*p})):(Me(!0),Ye({}),Be({height:.97*p,width:.98*m}))}),[p,m]),Object(c.useEffect)((function(){G.a.post("/api/v1/start",{agentName:e,user:"Guest",rules:Le,start:5}).then((function(e){var t=e.data;h(_(t.gameState)),A(t.playerInfo),z(t.agentInfo),ue(!1),ye(!1),Se(t.moves)})).catch((function(e){console.log(e),alert(e)}))}),[h,e]),Object(c.useEffect)((function(){Te.length&&(Q(Te,n,i,k,h,ye),Te.forEach((function(e){e[1]>=0&&h(U(e))})),Se([]))}),[n,Te,o,k,i,h]);var Ge=function(t){var a=ae(n.playerOne.cardAtHand,n.cardPlayed[n.cardPlayed.length-1]);t.push(re(a,t[0])),h(F(t));var c=ce(n,a,!0,S);if(h(D(c)),ue(!0),"z:goMarket"===t[0]){ye(!0),V(n,n.playerOne.name,1,h),ye(!1),ue(!0);var l={agentName:e,user:"Guest",gameState:n,playerMove:"z:goMarket",rules:Le};G.a.post("/api/v1/play",l).then((function(e){var t=e.data;ue(!1),ye(!0),Q(t,n,i,k,h,ye),h(U.apply(void 0,Object(d.a)(t)))})).catch((function(e){te(n,t,r,s,h),ue(!1),ye(!1),alert(e)}))}else{var o=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=e.indexOf(":")+1,c=parseInt(e.slice(a,e.length)),r=e.slice(0,a),s=t.indexOf(":")+1,i=parseInt(t.slice(s,t.length)),l=t.slice(0,s);return 20===c?[!0,!0]:!(c!==i&&r!==l&&!n)&&[!0,!1]}(t[0],n.cardPlayed[n.cardPlayed.length-1]);if(I(o[1]),o[0])if(o[1])I(!0),ue(!1),h(J(r)),h(J(s));else{var j=K(n,t,"Guest",h),b={agentName:e,user:"Guest",gameState:n,playerMove:t[0],rules:Le};j?G.a.post("/api/v1/play",b).then((function(e){var t=e.data;ue(!1),ye(!0),Q(t,n,i,k,h,ye),h(U.apply(void 0,Object(d.a)(t)))})).catch((function(e){te(n,t,r,s,h),ue(!1),ye(!1),alert(e)})):ue(!1)}else ue(!1),alert("illegal move")}};return Object(c.useEffect)((function(){q(n.playerOne.cardAtHand),Z(n.playerTwo.cardAtHand),ie(n.cardPlayed[n.cardPlayed.length-1]),de(n.cardPlayed)}),[n]),Object(c.useEffect)((function(){$(n,r,s,i,o,h)}),[n,r,s,i,o,h]),he?Object(a.jsxs)("center",{style:Re,className:"game-table",children:[Object(a.jsx)(we,{})," "]}):Object(a.jsxs)("div",{style:Ee,children:[Object(a.jsx)("center",{style:Re,className:"game-table",children:Object(a.jsxs)("div",{style:Re,children:[Object(a.jsx)(ke,{top:.2,isLandscape:He,angle:180,height:p,width:m,cards:B,action:Ge,playable:!1,index:O}),Object(a.jsx)(ke,{top:.8,isLandscape:He,angle:0,height:p,width:m,cards:Y,action:Ge,playable:!fe,index:j}),se&&Object(a.jsx)(Pe,{isLandscape:He,height:p,width:m,className:"center",cards:se,cardNumber:null===je||void 0===je?void 0:je.length}),Object(a.jsx)(Ne,{action:Ge,isLandscape:He,height:p,width:m,playable:!fe,cardNumber:n.market.length})]})}),M&&Object(a.jsx)(ze,{need:function(t){var a=ae(n.playerOne.cardAtHand,n.cardPlayed[n.cardPlayed.length-1]),c=ce(n,a,!0,S);h(D(c)),t.push(re(a,t[0])),h(F(t)),ue(!0),I(!1),ye(!1);var l={agentName:e,user:"Guest",gameState:n,playerMove:t,rules:Le},o=n.playerOne.cardAtHand.indexOf("whot:20"),j=Object(b.a)({},n);j.playerOne.cardAtHand.splice(o,1),j.cardPlayed.push(t[0]),h(_(j)),G.a.post("/api/v1/play",l).then((function(e){var t=e.data;Q(t,n,i,k,h,ye),ye(!1),ue(!1),h(U.apply(void 0,Object(d.a)(t)))})).catch((function(e){te(n,t,r,s,h),ue(!1),ye(!1),alert(e)}))}})]})};var Me=function(e){var t=e.identifier;return"text"===e.type?Object(a.jsxs)("div",{class:"row",children:[Object(a.jsxs)("div",{class:"col-25",children:[" ",Object(a.jsx)("label",{for:t,children:e.label})," "]}),Object(a.jsx)("div",{class:"col-75",children:Object(a.jsx)("input",{type:"text",required:!0,id:t,name:t,onChange:e.onChange,placeholder:"eg Joe"})})]}):e.yes?Object(a.jsxs)("div",{class:"row",children:[Object(a.jsx)("div",{class:"col-25",children:Object(a.jsx)("label",{for:t,children:e.label})}),Object(a.jsx)("div",{class:"col-75",children:Object(a.jsxs)("select",{id:t,name:t,onChange:e.onChange,children:[Object(a.jsx)("option",{value:!0,children:"Yes"}),Object(a.jsx)("option",{value:!1,children:"No"})]})})]}):Object(a.jsxs)("div",{class:"row",children:[Object(a.jsx)("div",{class:"col-25",children:Object(a.jsx)("label",{for:t,children:e.label})}),Object(a.jsx)("div",{class:"col-75",children:Object(a.jsxs)("select",{id:t,name:t,onChange:e.onChange,children:[Object(a.jsx)("option",{value:!1,children:"No"}),Object(a.jsx)("option",{value:!0,children:"Yes"})]})})]})},Ie=(n(78),{agentName:"",availableMove:!0,canGoMarket:!0,canNeedAnyCard:!0,cardAtHand:!1,noOfCardAtHand:!1,cardInPlay:!1,cardPlayed:!1,noOfCardPlayed:!1,noOfCardsInMarket:!1,noOfCardsWithOpponent:!1,rules:!1}),Xe=function(){var e=Object(c.useState)(Ie),t=Object(ge.a)(e,2),n=t[0],r=t[1],s=Object(c.useState)(!1),i=Object(ge.a)(s,2),l=i[0],o=i[1];function j(e){var t=e.target.name,n=e.target.value;r((function(e){return e[t]=n,e}))}return l?Object(a.jsx)(we,{}):Object(a.jsxs)("center",{children:[Object(a.jsx)(le,{}),Object(a.jsx)("div",{class:"container",children:Object(a.jsxs)("form",{method:"post",action:"/api/create-agent",children:[Object(a.jsx)("div",{class:"row",children:Object(a.jsx)("h3",{children:"Create Agent"})}),Object(a.jsx)(Me,{label:"Agent Name",type:"text",identifier:"agentName",onChange:j}),Object(a.jsxs)("div",{class:"row",children:[Object(a.jsx)("h5",{children:"Agent Settings"})," ",Object(a.jsx)("br",{}),Object(a.jsx)("p",{children:"select yes if you want the agent to considered these fields while learning"})]}),Object(a.jsxs)("div",{class:"row",children:[Object(a.jsx)("div",{class:"col-25",children:Object(a.jsx)("label",{for:"avialableMove",children:"Available Move"})}),Object(a.jsx)("div",{class:"col-75",children:Object(a.jsxs)("select",{id:"avialableMove",name:"avialableMove",disabled:!0,children:[Object(a.jsx)("option",{value:!0,children:"Yes"}),Object(a.jsx)("option",{value:!1,children:"No"})]})})]}),Object(a.jsx)(Me,{label:"Can Go Market",type:"select",identifier:"canGoMarket",onChange:j,yes:!0}),Object(a.jsx)(Me,{label:"Can Need Any Card",type:"select",identifier:"canNeedAnyCard",onChange:j,yes:!0}),Object(a.jsx)(Me,{label:"Cards At Hand",type:"select",identifier:"cardAtHand",onChange:j}),Object(a.jsx)(Me,{label:"No Cards At Hand",type:"select",identifier:"noOfCardAtHand",onChange:j}),Object(a.jsx)(Me,{label:"Card In Play",type:"select",identifier:"cardInPlay",onChange:j}),Object(a.jsx)(Me,{label:"Card Played",type:"select",identifier:"cardPlayed",onChange:j}),Object(a.jsx)(Me,{label:"No Cards Played",type:"select",identifier:"noOfCardPlayed",onChange:j}),Object(a.jsx)(Me,{label:"Number Of Cards In Market",type:"select",identifier:"noOfCardsInMarket",onChange:j}),Object(a.jsx)(Me,{label:"Number Of Cards With Opponent",type:"select",identifier:"noOfCardsWithOpponent",onChange:j}),Object(a.jsx)(Me,{label:"Rules",type:"select",identifier:"rules",onChange:j}),Object(a.jsxs)("div",{class:"row",style:{marginTop:20},children:["   ",Object(a.jsx)("input",{type:"submit",value:"Submit",onClick:function(e){e.preventDefault(),o(!1),G.a.post("/api/v1/create-agent",{agent:n}).then((function(e){alert(e.data.msg),o(!0),e.data.status}))}})," "]})]})})]})},Ee=function(){return Object(a.jsx)(ue,{})},Ye=function(){return Object(a.jsx)(pe,{})},qe=function(){return Object(a.jsx)(Se,{})},We=function(){return Object(a.jsx)(Ce,{})},Re=function(){return Object(a.jsx)(He,{})},Be=function(){return Object(a.jsx)(Xe,{})},Ge=function(){return Object(a.jsxs)(S.a,{children:[Object(a.jsx)(C.a,{path:"/",exact:!0,component:Ee}),Object(a.jsx)(C.a,{path:"/home",exact:!0,component:Ee}),Object(a.jsx)(C.a,{path:"/rules",exact:!0,component:Ye}),Object(a.jsx)(C.a,{path:"/leaderboard",exact:!0,component:qe}),Object(a.jsx)(C.a,{path:"/settings",exact:!0,component:We}),Object(a.jsx)(C.a,{path:"/create-agent",exact:!1,component:Be}),Object(a.jsx)(C.a,{path:"/game/:user",exact:!1,component:Re})]})};i.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(l.a,{store:T,children:Object(a.jsx)(Ge,{})})}),document.getElementById("root")),o()}},[[79,1,2]]]);
//# sourceMappingURL=main.f483bae6.chunk.js.map