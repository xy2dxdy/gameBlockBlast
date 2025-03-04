System.register("chunks:///_virtual/GameEvents.ts",["cc"],(function(e){var t,a;return{setters:[function(e){t=e.cclegacy,a=e.EventTarget}],execute:function(){e({triggerAddScore:function(e){n.emit(E,e)},triggerGameOver:function(e){n.emit(S,e)}}),t._RF.push({},"588b9b5SoxDaaCyCMepiiFc","GameEvents",void 0);var n=e("GameEvents",new a),E=(e("CHECK_IF_SHAPE_CAN_BE_PLACED","CheckIfShapeCanBePlaced"),e("MOVE_SHAPE_TO_START_POSITION","MoveShapeToStartPosition"),e("REQUEST_NEW_SHAPES","RequestNewShapes"),e("SET_SHAPE_INACTIVE","SetShapeInactive"),e("ADD_SCORE","AddScore")),S=e("GAME_OVER","GameOver");t._RF.pop()}}}));

System.register("chunks:///_virtual/GameOverPopup.ts",["./rollupPluginModLoBabelHelpers.js","cc","./GameEvents.ts"],(function(e){var t,o,r,n,i,a,p,s,u,c;return{setters:[function(e){t=e.applyDecoratedDescriptor,o=e.inheritsLoose,r=e.initializerDefineProperty,n=e.assertThisInitialized},function(e){i=e.cclegacy,a=e._decorator,p=e.Node,s=e.Component},function(e){u=e.GameEvents,c=e.GAME_OVER}],execute:function(){var l,v,f,m,h;i._RF.push({},"bd7e1wWQ09OPJGHobsgje5h","GameOverPopup",void 0);var O=a.ccclass,G=a.property;e("GameOverPopup",(l=O("GameOverPopup"),v=G(p),l((h=t((m=function(e){function t(){for(var t,o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return t=e.call.apply(e,[this].concat(i))||this,r(t,"gameOverPopup",h,n(t)),t}o(t,e);var i=t.prototype;return i.start=function(){this.gameOverPopup.active=!1},i.onEnable=function(){u.on(c,this.onGameOver,this)},i.onDisable=function(){u.off(c,this.onGameOver,this)},i.onGameOver=function(e){this.gameOverPopup.active=!0},t}(s)).prototype,"gameOverPopup",[v],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),f=m))||f));i._RF.pop()}}}));

System.register("chunks:///_virtual/Grid.ts",["./rollupPluginModLoBabelHelpers.js","cc","./GridSquare.ts","./GameEvents.ts","./ShapeStorage.ts","./LineIndicator.ts"],(function(e){var t,r,i,n,o,a,s,c,u,h,l,f,p,d,S,g,m,b,q,v,C,I,E,y;return{setters:[function(e){t=e.applyDecoratedDescriptor,r=e.inheritsLoose,i=e.initializerDefineProperty,n=e.assertThisInitialized},function(e){o=e.cclegacy,a=e._decorator,s=e.Prefab,c=e.RichText,u=e.Vec2,h=e.instantiate,l=e.Vec3,f=e.UITransform,p=e.Sprite,d=e.Component},function(e){S=e.GridSquare},function(e){g=e.GameEvents,m=e.CHECK_IF_SHAPE_CAN_BE_PLACED,b=e.REQUEST_NEW_SHAPES,q=e.SET_SHAPE_INACTIVE,v=e.MOVE_SHAPE_TO_START_POSITION,C=e.triggerAddScore,I=e.triggerGameOver},function(e){E=e.ShapeStorage},function(e){y=e.LineIndicator}],execute:function(){var P,A,G,T,w,x,_,L,O,k,N,z,B,D,H;o._RF.push({},"f5e63sDCKFJc4k8uLKooG2A","Grid",void 0);var F=a.ccclass,R=a.property;e("Grid",(P=F("Grid"),A=R(E),G=R(s),T=R(c),w=R(c),P((L=t((_=function(e){function t(){for(var t,r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return t=e.call.apply(e,[this].concat(o))||this,i(t,"shapeStorage",L,n(t)),i(t,"columns",O,n(t)),i(t,"rows",k,n(t)),i(t,"gridSquare",N,n(t)),i(t,"startPosition",z,n(t)),i(t,"squareScale",B,n(t)),i(t,"comboText",D,n(t)),i(t,"comboText1",H,n(t)),t.offset=new u(0,0),t.gridSquares=[],t.lineIndicator=void 0,t.comboN=0,t}r(t,e);var o=t.prototype;return o.onEnable=function(){g.on(m,this.onCheckIfShapeCanBePlaced,this)},o.onDisable=function(){g.off(m,this.onCheckIfShapeCanBePlaced,this)},o.start=function(){this.CreateGrid(),this.lineIndicator=this.getComponent(y)},o.CreateGrid=function(){this.SpawnGridSquares(),this.SetGridSquarePosition()},o.SpawnGridSquares=function(){for(var e=0,t=0;t<this.rows;t++)for(var r=0;r<this.columns;r++)this.gridSquares.push(h(this.gridSquare).getComponent(S)),this.gridSquares[this.gridSquares.length-1].node.setParent(this.node),this.gridSquares[this.gridSquares.length-1].node.scale=new l(this.squareScale,this.squareScale,this.squareScale),this.gridSquares[this.gridSquares.length-1].SquareIndex=e,e++},o.SetGridSquarePosition=function(){var e=this,t=0,r=0,i=this.gridSquares[0].node.getComponent(f);this.offset.x=i.width*this.gridSquares[0].node.scale.x,this.offset.y=i.height*this.gridSquares[0].node.scale.y,this.gridSquares.forEach((function(i){t+1>e.columns&&(t=0,r++);var n=e.offset.x*t,o=e.offset.y*r;i.node.getComponent(f).anchorX=e.startPosition.x+n,i.node.getComponent(f).anchorX=e.startPosition.y-o,i.node.position=new l(e.startPosition.x+n,e.startPosition.y-o,0),t++}))},o.onCheckIfShapeCanBePlaced=function(){var e=this,t=[];this.gridSquares.forEach((function(e){var r=e;r.Selected&&!r.SquareOccupied&&(t.push(r.SquareIndex),r.Selected=!1)}));var r=this.shapeStorage.GetCurrentSelectedShape();if(null!=r)if(r.TotalSquareNumber==t.length){t.forEach((function(t){e.gridSquares[t].PlaceShapeOnBoard(r.squareShapeImage.getComponent(p).spriteFrame)}));var i=0;this.shapeStorage.shapeList.forEach((function(e){e.IsAnyOfShapeSquareActive()&&e.IsOnStartPosition()&&i++})),0==i?g.emit(b):g.emit(q),this.CheckIfAnyLineIsCompleted()}else g.emit(v)},o.CheckIfAnyLineIsCompleted=function(){var e=this,t=[];this.lineIndicator.column_indexes.forEach((function(r){t.push(e.lineIndicator.GetVerticalLines(r))}));for(var r=0;r<8;r++){for(var i=[],n=0;n<8;n++)i.push(this.lineIndicator.line_data[r][n]);t.push(i)}var o=this.CheckIfSquareAreCompleted(t);o>0?this.comboN++>0&&(this.comboText.string="<b>Combo "+this.comboN+"</b>",this.comboText1.string="<b>Combo "+this.comboN+"</b>",this.comboText.node.active=!0,this.comboText1.node.active=!0,this.scheduleOnce((function(){e.comboText.node.active=!1,e.comboText1.node.active=!1}),4)):this.comboN=0,C(10*o),this.CheckIsPlayerLost()},o.CheckIfSquareAreCompleted=function(e){var t=this,r=[],i=0;return e.forEach((function(e){var i=!0;e.forEach((function(e){0==t.gridSquares[e].getComponent(S).SquareOccupied&&(i=!1)})),i&&r.push(e)})),r.forEach((function(e){var r=!1;e.forEach((function(e){t.gridSquares[e].Deactivate(),r=!0})),e.forEach((function(e){t.gridSquares[e].ClearOccupied()})),r&&i++})),i},o.CheckIsPlayerLost=function(){for(var e=0,t=0;t<this.shapeStorage.shapeList.length;t++){var r,i=this.shapeStorage.shapeList[t].IsAnyOfShapeSquareActive();if(this.CheckIfShapeCanBePlacedOnGrid(this.shapeStorage.shapeList[t])&&i)null==(r=this.shapeStorage.shapeList[t])||r.ActivateShape(),e++}0==e&&I(!1)},o.CheckIfShapeCanBePlacedOnGrid=function(e){for(var t=this,r=e.shapeData,i=r.columns,n=r.rows,o=[],a=0,s=0;s<n;s++)for(var c=0;c<i;c++)r.board[s].column[c]&&o.push(a),a++;e.TotalSquareNumber!=o.length&&console.error("Number of filled up squares are not the same at the original shape have");var u=this.GetAllSquareCombination(i,n),h=!1;return u.forEach((function(e){var r=!0;o.forEach((function(i){t.gridSquares[e[i]].getComponent(S).SquareOccupied&&(r=!1)})),r&&(h=!0)})),h},o.GetAllSquareCombination=function(e,t){for(var r=[],i=0,n=0,o=0;n+(t-1)<8;){for(var a=[],s=n;s<n+t;s++)for(var c=i;c<i+e;c++)a.push(this.lineIndicator.line_data[s][c]);if(r.push(a),++i+(e-1)>=8&&(n++,i=0),++o>100)break}return r},t}(d)).prototype,"shapeStorage",[A],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),O=t(_.prototype,"columns",[R],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 8}}),k=t(_.prototype,"rows",[R],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 8}}),N=t(_.prototype,"gridSquare",[G],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),z=t(_.prototype,"startPosition",[R],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new u(0,0)}}),B=t(_.prototype,"squareScale",[R],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.5}}),D=t(_.prototype,"comboText",[T],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),H=t(_.prototype,"comboText1",[w],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),x=_))||x));o._RF.pop()}}}));

System.register("chunks:///_virtual/GridSquare.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){var i,t,n,o,a,r,c,l,s,u,h,d;return{setters:[function(e){i=e.applyDecoratedDescriptor,t=e.inheritsLoose,n=e.initializerDefineProperty,o=e.assertThisInitialized,a=e.createForOfIteratorHelperLoose},function(e){r=e.cclegacy,c=e._decorator,l=e.Sprite,s=e.BoxCollider2D,u=e.Animation,h=e.Vec3,d=e.Component}],execute:function(){var p,v,m,f,g,S,I,q,y;r._RF.push({},"f6896hXO2ZLx4+9WK1sU6hd","GridSquare",void 0);var b=c.ccclass,A=c.property;e("GridSquare",(p=b("GridSquare"),v=A(l),m=A(l),f=A(l),p((I=i((S=function(e){function i(){for(var i,t=arguments.length,a=new Array(t),r=0;r<t;r++)a[r]=arguments[r];return i=e.call.apply(e,[this].concat(a))||this,n(i,"normalImage",I,o(i)),n(i,"hooverImage",q,o(i)),n(i,"activeImage",y,o(i)),i.animation=null,i.Selected=void 0,i.SquareIndex=void 0,i.SquareOccupied=void 0,i.collider=void 0,i.colliders=[],i.D=void 0,i}t(i,e);var r=i.prototype;return r.start=function(){this.Selected=!1,this.SquareOccupied=!1,this.collider=this.getComponent(s),this.animation=this.activeImage.getComponent(u),this.animation&&this.animation.on(u.EventType.FINISHED,this.onAnimationFinished,this),this.colliders=this.node.scene.getComponentsInChildren(s)},r.update=function(e){if(this.collider){for(var i,t=this.collider.worldAABB,n=!1,o=this.node.scene.getComponentsInChildren(s),r=a(o);!(i=r()).done;){var c=i.value;if(c!==this.collider&&t.intersects(c.worldAABB)){n=!0;break}}!this.SquareOccupied&&n?(this.Selected=!0,this.hooverImage.node.active=!0):(this.Selected=!1,this.hooverImage.node.active=!1)}},r.PlaceShapeOnBoard=function(e){this.ActivateSquare(e)},r.CanWeUseThisSquare=function(){return this.hooverImage.node.active},r.ActivateSquare=function(e){this.hooverImage.node.active=!1,this.activeImage.spriteFrame=e,this.activeImage.node.active=!0,this.Selected=!0,this.SquareOccupied=!0},r.Deactivate=function(){this.animation&&this.animation.play("ScaleAnimation")},r.ClearOccupied=function(){this.Selected=!1,this.SquareOccupied=!1},r.onAnimationFinished=function(){this.activeImage.node.active=!1,this.activeImage.node.scale=new h(1,1,1)},i}(d)).prototype,"normalImage",[v],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),q=i(S.prototype,"hooverImage",[m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),y=i(S.prototype,"activeImage",[f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),g=S))||g));r._RF.pop()}}}));

System.register("chunks:///_virtual/LineIndicator.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(n){var t,r,e,i;return{setters:[function(n){t=n.inheritsLoose},function(n){r=n.cclegacy,e=n._decorator,i=n.Component}],execute:function(){var o;r._RF.push({},"e5cfa9z2dxJD5qbQSCMQbnE","LineIndicator",void 0);var a=e.ccclass;e.property,n("LineIndicator",a("LineIndicator")(o=function(n){function r(){for(var t,r=arguments.length,e=new Array(r),i=0;i<r;i++)e[i]=arguments[i];return(t=n.call.apply(n,[this].concat(e))||this).line_data=[[0,1,2,3,4,5,6,7],[8,9,10,11,12,13,14,15],[16,17,18,19,20,21,22,23],[24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39],[40,41,42,43,44,45,46,47],[48,49,50,51,52,53,54,55],[56,57,58,59,60,61,62,63]],t.column_indexes=[0,1,2,3,4,5,6,7],t}t(r,n);var e=r.prototype;return e.GetSquarePosition=function(n){for(var t=0,r=0,e=0;e<8;e++)for(var i=0;i<8;i++)this.line_data[e][i]==n&&(t=e,r=i);return[t,r]},e.GetVerticalLines=function(n){for(var t=[],r=this.GetSquarePosition(n)[1],e=0;e<8;e++)t.push(this.line_data[e][r]);return t},r}(i))||o);r._RF.pop()}}}));

System.register("chunks:///_virtual/main",["./GameEvents.ts","./GameOverPopup.ts","./Grid.ts","./GridSquare.ts","./LineIndicator.ts","./MenuController.ts","./Row.ts","./Scores.ts","./Shape.ts","./ShapeData.ts","./ShapeSquare.ts","./ShapeStorage.ts"],(function(){return{setters:[null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){}}}));

System.register("chunks:///_virtual/MenuController.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){var n,r,o,t,c;return{setters:[function(e){n=e.inheritsLoose},function(e){r=e.cclegacy,o=e._decorator,t=e.director,c=e.Component}],execute:function(){var u;r._RF.push({},"87eb0KCIvJNxIxBscS5ymdg","MenuController",void 0);var l=o.ccclass;o.property,e("MenuController",l("MenuController")(u=function(e){function r(){return e.apply(this,arguments)||this}return n(r,e),r.prototype.tryAgain=function(){t.loadScene("scene")},r}(c))||u);r._RF.pop()}}}));

System.register("chunks:///_virtual/Row.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){var o,t,i,r;return{setters:[function(e){o=e.applyDecoratedDescriptor,t=e.initializerDefineProperty},function(e){i=e.cclegacy,r=e._decorator}],execute:function(){var n,c,u,s,a;i._RF.push({},"4e7f5HqTV1PzZTFuZTsc8bB","Row",void 0);var l=r.ccclass,p=r.property;e("Row",(n=l("Row"),c=p([Boolean]),n((a=o((s=function(){function e(){t(this,"column",a,this),this.size=0}var o=e.prototype;return o.Row=function(e){this.CreateRow(e)},o.CreateRow=function(e){this.size=e,this.column=new Boolean[e],this.ClearRow()},o.ClearRow=function(){for(var e=0;e<this.size;e++)this.column[e]=!1},e}()).prototype,"column",[c],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),u=s))||u));i._RF.pop()}}}));

System.register("chunks:///_virtual/Scores.ts",["./rollupPluginModLoBabelHelpers.js","cc","./GameEvents.ts"],(function(e){var t,r,o,n,c,i,s,a,u,l;return{setters:[function(e){t=e.applyDecoratedDescriptor,r=e.inheritsLoose,o=e.initializerDefineProperty,n=e.assertThisInitialized},function(e){c=e.cclegacy,i=e._decorator,s=e.RichText,a=e.Component},function(e){u=e.GameEvents,l=e.ADD_SCORE}],execute:function(){var p,h,f,S,d;c._RF.push({},"011d8XTsnxLhrYwLOIq5TQl","Scores",void 0);var v=i.ccclass,y=i.property;e("Scores",(p=v("Scores"),h=y(s),p((d=t((S=function(e){function t(){for(var t,r=arguments.length,c=new Array(r),i=0;i<r;i++)c[i]=arguments[i];return t=e.call.apply(e,[this].concat(c))||this,o(t,"scoreText",d,n(t)),t.currentScores=void 0,t}r(t,e);var c=t.prototype;return c.start=function(){this.currentScores=0},c.onEnable=function(){u.on(l,this.onAddScore,this)},c.onDisable=function(){u.off(l,this.onAddScore,this)},c.onAddScore=function(e){this.currentScores+=e,this.UpdateScoreText()},c.UpdateScoreText=function(){this.scoreText.string=this.currentScores.toString()},t}(a)).prototype,"scoreText",[h],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),f=S))||f));c._RF.pop()}}}));

System.register("chunks:///_virtual/Shape.ts",["./rollupPluginModLoBabelHelpers.js","cc","./GameEvents.ts","./ShapeSquare.ts"],(function(e){var t,a,n,i,r,o,s,h,u,c,p,l,S,f,m,g,v,b,d,P,q;return{setters:[function(e){t=e.applyDecoratedDescriptor,a=e.inheritsLoose,n=e.initializerDefineProperty,i=e.assertThisInitialized,r=e.createForOfIteratorHelperLoose},function(e){o=e.cclegacy,s=e._decorator,h=e.Prefab,u=e.Vec3,c=e.SpriteFrame,p=e.instantiate,l=e.Canvas,S=e.randomRangeInt,f=e.Sprite,m=e.UITransform,g=e.Vec2,v=e.Component},function(e){b=e.GameEvents,d=e.MOVE_SHAPE_TO_START_POSITION,P=e.SET_SHAPE_INACTIVE},function(e){q=e.ShapeSquare}],execute:function(){var I,w,y,A,C,E,T,F,O,z,D,_,N;o._RF.push({},"0a402ZazzxNtodpuR54hrKm","Shape",void 0);var x=s.ccclass,R=s.property;e("Shape",(I=x("Shape"),w=R(h),y=R(u),A=R(u),C=R([c]),E=R(u),I((O=t((F=function(e){function t(){for(var t,a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return t=e.call.apply(e,[this].concat(r))||this,n(t,"prefabSquareShapeImage",O,i(t)),n(t,"shapeSelectedScale",z,i(t)),n(t,"offset",D,i(t)),n(t,"spriteFrames",_,i(t)),t.squareShapeImage=null,t.shapeData=null,t.currentShape=[],t.TotalSquareNumber=void 0,t.shapeStartScale=null,t.canvas=null,t.shapeDraggable=!0,n(t,"startPosition",N,i(t)),t.shapeActive=!0,t}a(t,e);var o=t.prototype;return o.onLoad=function(){this.squareShapeImage=p(this.prefabSquareShapeImage),this.shapeStartScale=this.node.scale.toVec2(),this.canvas=this.node.getParent().getComponent(l),this.shapeDraggable=!0,this.startPosition=new u(this.node.position),this.shapeActive=!0},o.onEnable=function(){b.on(d,this.moveShapeToStartPosition,this),b.on(P,this.SetShapeInactive,this)},o.onDisable=function(){b.off(d,this.moveShapeToStartPosition,this),b.on(P,this.SetShapeInactive,this)},o.IsOnStartPosition=function(){return this.node.position.equals(this.startPosition)},o.IsAnyOfShapeSquareActive=function(){for(var e,t=r(this.currentShape);!(e=t()).done;){if(e.value.active)return!0}return!1},o.SetShapeInactive=function(){0==this.IsOnStartPosition()&&this.IsAnyOfShapeSquareActive()&&this.currentShape.forEach((function(e){e.active=!1}))},o.DeactivateShape=function(){this.shapeActive&&this.currentShape.forEach((function(e){null==e||e.getComponent(q).DeactivateShape()})),this.shapeActive=!1},o.ActivateShape=function(){this.shapeActive||this.currentShape.forEach((function(e){null==e||e.getComponent(q).ActivateShape()})),this.shapeActive=!0},o.RequestNewShape=function(e){this.node.setPosition(this.startPosition),this.CreateShape(e),this.adjustChildrenToCenterOfParent(this.node)},o.CreateShape=function(e){var t=this,a=S(0,this.spriteFrames.length);for(this.squareShapeImage.getComponent(f).spriteFrame=this.spriteFrames[a],this.shapeData=e,this.TotalSquareNumber=this.getNumberOfSquares(e),this.currentShape.forEach((function(e){e.getComponent(f).spriteFrame=t.squareShapeImage.getComponent(f).spriteFrame}));this.currentShape.length<this.TotalSquareNumber;)this.currentShape.push(p(this.squareShapeImage)),this.currentShape[this.currentShape.length-1].setParent(this.node);this.currentShape.forEach((function(e){e.position=new u(0,0,0),e.active=!1}));for(var n=this.squareShapeImage.getComponent(m),i=new g(n.width*this.squareShapeImage.scale.x,n.height*this.squareShapeImage.scale.y),r=0,o=0;o<e.rows;o++)for(var s=0;s<e.columns;s++)e.board[o].column[s]&&(this.currentShape[r].position=new u(this.getXPositionForShapeSquare(e,s,i),this.getYPositionForShapeSquare(e,o,i)),this.currentShape[r].active=!0,r++)},o.getNumberOfSquares=function(e){var t=0;return e.board.forEach((function(e){e.column.forEach((function(e){e&&t++}))})),t},o.getYPositionForShapeSquare=function(e,t,a){var n=0;e.rows>1&&(n=(e.rows%2!=0?e.rows/2*a.y:(e.rows/2-1)*a.y+a.y/2)-t*a.y);return n},o.getXPositionForShapeSquare=function(e,t,a){var n=0;e.columns>1&&(n=(e.columns%2!=0?e.columns/2*a.x*-1:(e.columns/2-1)*a.x/2)+t*a.x);return n},o.moveShapeToStartPosition=function(){this.node.position=new u(this.startPosition)},o.adjustChildrenToCenterOfParent=function(e){var t=[];if(e.children.forEach((function(e){e.active&&t.push(e)})),0!=t.length){for(var a=new u(0,0,0),n=0,i=t;n<i.length;n++){var r=i[n];a.add(r.position)}a.x/=t.length,a.y/=t.length,a.z/=t.length;for(var o=a.subtract(new u(0,0,0)),s=0,h=t;s<h.length;s++){var c=h[s],p=c.position.subtract(o);c.setPosition(p)}}},t}(v)).prototype,"prefabSquareShapeImage",[w],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),z=t(F.prototype,"shapeSelectedScale",[y],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),D=t(F.prototype,"offset",[A],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new u(0,700,0)}}),_=t(F.prototype,"spriteFrames",[C],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),N=t(F.prototype,"startPosition",[E],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),T=F))||T));o._RF.pop()}}}));

System.register("chunks:///_virtual/ShapeData.ts",["./rollupPluginModLoBabelHelpers.js","cc","./Row.ts"],(function(r){var e,t,o,i,a,n,s,c;return{setters:[function(r){e=r.applyDecoratedDescriptor,t=r.inheritsLoose,o=r.initializerDefineProperty,i=r.assertThisInitialized},function(r){a=r.cclegacy,n=r._decorator,s=r.Component},function(r){c=r.Row}],execute:function(){var u,l,p,f,h,b,w;a._RF.push({},"77e93NexcRMiap8Wv7qoWoE","ShapeData",void 0);var d=n.ccclass,y=n.property;r("ShapeData",(u=d("ShapeData"),l=y([c]),u((h=e((f=function(r){function e(){for(var e,t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];return e=r.call.apply(r,[this].concat(a))||this,o(e,"columns",h,i(e)),o(e,"rows",b,i(e)),o(e,"board",w,i(e)),e}t(e,r);var a=e.prototype;return a.Clear=function(){for(var r=0;r<this.rows;r++)this.board[r].ClearRow()},a.CreateNewBoard=function(){this.board=new c[this.rows];for(var r=0;r<this.rows;r++)this.board[r]=new c,this.board[r].Row(this.columns)},e}(s)).prototype,"columns",[y],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),b=e(f.prototype,"rows",[y],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),w=e(f.prototype,"board",[l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),p=f))||p));a._RF.pop()}}}));

System.register("chunks:///_virtual/ShapeSquare.ts",["./rollupPluginModLoBabelHelpers.js","cc","./Shape.ts","./GameEvents.ts"],(function(e){var t,n,o,a,s,h,i,c,p,r;return{setters:[function(e){t=e.inheritsLoose},function(e){n=e.cclegacy,o=e._decorator,a=e.Node,s=e.BoxCollider2D,h=e.Vec3,i=e.Component},function(e){c=e.Shape},function(e){p=e.GameEvents,r=e.CHECK_IF_SHAPE_CAN_BE_PLACED}],execute:function(){var u;n._RF.push({},"a1ef7PvGPZGFLDfOPTA+hzE","ShapeSquare",void 0);var d=o.ccclass;o.property,e("ShapeSquare",d("ShapeSquare")(u=function(e){function n(){for(var t,n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return(t=e.call.apply(e,[this].concat(o))||this).shape=null,t}t(n,e);var o=n.prototype;return o.start=function(){this.shape=this.node.parent.getComponent(c)},o.onLoad=function(){this.node.on(a.EventType.TOUCH_START,this.onTouchStart,this),this.node.on(a.EventType.TOUCH_MOVE,this.onTouchMove,this),this.node.on(a.EventType.TOUCH_END,this.onTouchEnd,this),this.node.on(a.EventType.TOUCH_CANCEL,this.onTouchEnd,this),this.node.on(a.EventType.MOUSE_UP,this.onTouchEnd,this)},o.DeactivateShape=function(){this.getComponent(s).enabled=!1,this.node.active=!1},o.ActivateShape=function(){this.getComponent(s).enabled=!0,this.node.active=!0},o.onTouchStart=function(e){this.shape.node.scale=this.shape.shapeSelectedScale},o.onTouchMove=function(e){if(this.shape.shapeDraggable){var t=e.getDelta();this.shape.node.position=this.shape.node.position.add(new h(t.x,t.y,0))}},o.onTouchEnd=function(e){this.shape.node.scale=new h(this.shape.shapeStartScale.x,this.shape.shapeStartScale.y,1),p.emit(r)},n}(i))||u);n._RF.pop()}}}));

System.register("chunks:///_virtual/ShapeStorage.ts",["./rollupPluginModLoBabelHelpers.js","cc","./ShapeData.ts","./Shape.ts","./GameEvents.ts"],(function(e){var t,a,n,r,i,o,s,p,h,u,c,f,l,S,v;return{setters:[function(e){t=e.applyDecoratedDescriptor,a=e.inheritsLoose,n=e.initializerDefineProperty,r=e.assertThisInitialized,i=e.createForOfIteratorHelperLoose},function(e){o=e.cclegacy,s=e._decorator,p=e.Prefab,h=e.instantiate,u=e.randomRangeInt,c=e.Component},function(e){f=e.ShapeData},function(e){l=e.Shape},function(e){S=e.GameEvents,v=e.REQUEST_NEW_SHAPES}],execute:function(){var b,D,g,d,y,E,m;o._RF.push({},"bed57O4Y1ZAIbOyYIoWplnW","ShapeStorage",void 0);var L=s.ccclass,R=s.property;e("ShapeStorage",(b=L("ShapeStorage"),D=R([p]),g=R([l]),b((E=t((y=function(e){function t(){for(var t,a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return t=e.call.apply(e,[this].concat(i))||this,n(t,"prefabShapeData",E,r(t)),n(t,"shapeList",m,r(t)),t.shapeData=[],t}a(t,e);var o=t.prototype;return o.onEnable=function(){S.on(v,this.RequestNewShapes,this)},o.onDisable=function(){S.off(v,this.RequestNewShapes,this)},o.start=function(){var e=this;this.prefabShapeData.forEach((function(t){e.shapeData.push(h(t).getComponent(f))})),this.shapeList.forEach((function(t){var a=u(0,e.shapeData.length);t.CreateShape(e.shapeData[a]),t.adjustChildrenToCenterOfParent(t.node)}))},o.GetCurrentSelectedShape=function(){for(var e,t=i(this.shapeList);!(e=t()).done;){var a=e.value;if(0==a.IsOnStartPosition()&&a.IsAnyOfShapeSquareActive())return a}return console.error("There is no shape selected!"),null},o.RequestNewShapes=function(){var e=this;this.shapeList.forEach((function(t){var a=u(0,e.shapeData.length);t.RequestNewShape(e.shapeData[a])}))},t}(c)).prototype,"prefabShapeData",[D],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),m=t(y.prototype,"shapeList",[g],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),d=y))||d));o._RF.pop()}}}));

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});