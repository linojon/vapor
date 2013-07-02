/**
 * editable_selects.js
 *
 * Copyright, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
var TinyMCE_EditableSelects={editSelectElm:null,init:function(){var e,t,l=document.getElementsByTagName("select");for(e=0;e<l.length;e++)-1!=l[e].className.indexOf("mceEditableSelect")&&(t=new Option(tinyMCEPopup.editor.translate("value"),"__mce_add_custom__"),t.className="mceAddSelectValue",l[e].options[l[e].options.length]=t,l[e].onchange=TinyMCE_EditableSelects.onChangeEditableSelect)},onChangeEditableSelect:function(e){var t,l=document,n=window.event?window.event.srcElement:e.target;"__mce_add_custom__"==n.options[n.selectedIndex].value&&(t=l.createElement("input"),t.id=n.id+"_custom",t.name=n.name+"_custom",t.type="text",t.style.width=n.offsetWidth+"px",n.parentNode.insertBefore(t,n),n.style.display="none",t.focus(),t.onblur=TinyMCE_EditableSelects.onBlurEditableSelectInput,t.onkeydown=TinyMCE_EditableSelects.onKeyDown,TinyMCE_EditableSelects.editSelectElm=n)},onBlurEditableSelectInput:function(){var e=TinyMCE_EditableSelects.editSelectElm;e&&(""!=e.previousSibling.value?(addSelectValue(document.forms[0],e.id,e.previousSibling.value,e.previousSibling.value),selectByValue(document.forms[0],e.id,e.previousSibling.value)):selectByValue(document.forms[0],e.id,""),e.style.display="inline",e.parentNode.removeChild(e.previousSibling),TinyMCE_EditableSelects.editSelectElm=null)},onKeyDown:function(e){e=e||window.event,13==e.keyCode&&TinyMCE_EditableSelects.onBlurEditableSelectInput()}};