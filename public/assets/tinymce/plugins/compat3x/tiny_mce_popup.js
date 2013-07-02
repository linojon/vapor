/**
 * Popup.js
 *
 * Copyright, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
var tinymce=null,tinyMCEPopup,tinyMCE;tinyMCEPopup={init:function(){var e,t,n=this;e=n.getWin(),tinymce=e.tinymce,tinyMCE=e.tinyMCE,n.editor=tinymce.EditorManager.activeEditor,n.params=n.editor.windowManager.params,n.features=n.editor.windowManager.features,t=n.editor.settings,t.popup_css!==!1&&(t.popup_css=t.popup_css?n.documentBaseURI.toAbsolute(t.popup_css):n.baseURI.toAbsolute("themes/"+t.theme+"/skins/"+t.skin+"/dialog.css")),t.popup_css_add&&(t.popup_css+=","+n.documentBaseURI.toAbsolute(t.popup_css_add)),n.dom=n.editor.windowManager.createInstance("tinymce.dom.DOMUtils",document,{ownEvents:!0,proxy:tinyMCEPopup._eventProxy}),n.dom.bind(window,"ready",n._onDOMLoaded,n),n.features.popup_css!==!1&&n.dom.loadCSS(n.features.popup_css||n.editor.settings.popup_css),n.listeners=[],n.onInit={add:function(e,t){n.listeners.push({func:e,scope:t})}},n.isWindow=!n.getWindowArg("mce_inline"),n.id=n.getWindowArg("mce_window_id")},getWin:function(){return!window.frameElement&&window.dialogArguments||opener||parent||top},getWindowArg:function(e,t){var n=this.params[e];return tinymce.is(n)?n:t},getParam:function(e,t){return this.editor.getParam(e,t)},getLang:function(e,t){return this.editor.getLang(e,t)},execCommand:function(e,t,n,o){return o=o||{},o.skip_focus=1,this.restoreSelection(),this.editor.execCommand(e,t,n,o)},resizeToInnerSize:function(){var e=this;setTimeout(function(){var t=e.dom.getViewPort(window);e.editor.windowManager.resizeBy(e.getWindowArg("mce_width")-t.w,e.getWindowArg("mce_height")-t.h,e.id||window)},10)},executeOnLoad:function(s){this.onInit.add(function(){eval(s)})},storeSelection:function(){this.editor.windowManager.bookmark=tinyMCEPopup.editor.selection.getBookmark(1)},restoreSelection:function(){var e=tinyMCEPopup;!e.isWindow&&tinymce.isIE&&e.editor.selection.moveToBookmark(e.editor.windowManager.bookmark)},requireLangPack:function(){var e=this,t=e.getWindowArg("plugin_url")||e.getWindowArg("theme_url");t&&e.editor.settings.language&&e.features.translate_i18n!==!1&&e.editor.settings.language_load!==!1&&(t+="/langs/"+e.editor.settings.language+"_dlg.js",tinymce.ScriptLoader.isDone(t)||(document.write('<script type="text/javascript" src="'+t+'"></script>'),tinymce.ScriptLoader.markDone(t)))},pickColor:function(e,t){this.execCommand("mceColorPicker",!0,{color:document.getElementById(t).value,func:function(e){document.getElementById(t).value=e;try{document.getElementById(t).onchange()}catch(n){}}})},openBrowser:function(e,t){tinyMCEPopup.restoreSelection(),this.editor.execCallback("file_browser_callback",e,document.getElementById(e).value,t,window)},confirm:function(e,t,n){this.editor.windowManager.confirm(e,t,n,window)},alert:function(e,t,n){this.editor.windowManager.alert(e,t,n,window)},close:function(){function e(){t.editor.windowManager.close(window),tinymce=tinyMCE=t.editor=t.params=t.dom=t.dom.doc=null}var t=this;tinymce.isOpera?t.getWin().setTimeout(e,0):e()},_restoreSelection:function(){var e=window.event.srcElement;"INPUT"!=e.nodeName||"submit"!=e.type&&"button"!=e.type||tinyMCEPopup.restoreSelection()},_onDOMLoaded:function(){var e,t,n=tinyMCEPopup,o=document.title;n.features.translate_i18n!==!1&&(e=document.body.innerHTML,tinymce.isIE&&(e=e.replace(/ (value|title|alt)=([^"][^\s>]+)/gi,' $1="$2"')),document.dir=n.editor.getParam("directionality",""),(t=n.editor.translate(e))&&t!=e&&(document.body.innerHTML=t),(t=n.editor.translate(o))&&t!=o&&(document.title=o=t)),n.editor.getParam("browser_preferred_colors",!1)&&n.isWindow||n.dom.addClass(document.body,"forceColors"),document.body.style.display="",tinymce.isIE&&(document.attachEvent("onmouseup",tinyMCEPopup._restoreSelection),n.dom.add(n.dom.select("head")[0],"base",{target:"_self"})),n.restoreSelection(),n.resizeToInnerSize(),n.isWindow?window.focus():n.editor.windowManager.setTitle(window,o),tinymce.isIE||n.isWindow||n.dom.bind(document,"focus",function(){n.editor.windowManager.focus(n.id)}),tinymce.each(n.dom.select("select"),function(e){e.onkeydown=tinyMCEPopup._accessHandler}),tinymce.each(n.listeners,function(e){e.func.call(e.scope,n.editor)}),n.getWindowArg("mce_auto_focus",!0)&&(window.focus(),tinymce.each(document.forms,function(e){tinymce.each(e.elements,function(e){return n.dom.hasClass(e,"mceFocus")&&!e.disabled?(e.focus(),!1):void 0})})),document.onkeyup=tinyMCEPopup._closeWinKeyHandler},_accessHandler:function(e){if(e=e||window.event,13==e.keyCode||32==e.keyCode){var t=e.target||e.srcElement;return t.onchange&&t.onchange(),tinymce.dom.Event.cancel(e)}},_closeWinKeyHandler:function(e){e=e||window.event,27==e.keyCode&&tinyMCEPopup.close()},_eventProxy:function(e){return function(t){tinyMCEPopup.dom.events.callNativeHandler(e,t)}}},tinyMCEPopup.init();