tinymce.PluginManager.add("template",function(e){function t(){function t(e){var t=e.control.value();t.url?tinymce.util.XHR.send({url:t.url,success:function(e){n=e,a.find("iframe")[0].html(e)}}):(n=t.content,a.find("iframe")[0].html(t.content)),a.find("#description")[0].text(e.control.value().description)}var a,n,r=[];return e.settings.templates?(tinymce.each(e.settings.templates,function(e){r.push({selected:!r.length,text:e.title,value:{url:e.url,content:e.content,description:e.description}})}),a=e.windowManager.open({title:"Insert template",body:[{type:"listbox",name:"template",flex:0,label:"Templates",values:r,onselect:t},{type:"label",name:"description",label:"Description",text:" "},{type:"iframe",minWidth:600,minHeight:400,border:1}],onsubmit:function(){l(!1,n)}}),a.find("listbox")[0].fire("select"),void 0):(e.windowManager.alert("No templates defined"),void 0)}function a(t,a){function n(e,t){if(e=""+e,e.length<t)for(var a=0;a<t-e.length;a++)e="0"+e;return e}var l="Sun Mon Tue Wed Thu Fri Sat Sun".split(" "),r="Sunday Monday Tuesday Wednesday Thursday Friday Saturday Sunday".split(" "),c="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),s="January February March April May June July August September October November December".split(" ");return a=a||new Date,t=t.replace("%D","%m/%d/%Y"),t=t.replace("%r","%I:%M:%S %p"),t=t.replace("%Y",""+a.getFullYear()),t=t.replace("%y",""+a.getYear()),t=t.replace("%m",n(a.getMonth()+1,2)),t=t.replace("%d",n(a.getDate(),2)),t=t.replace("%H",""+n(a.getHours(),2)),t=t.replace("%M",""+n(a.getMinutes(),2)),t=t.replace("%S",""+n(a.getSeconds(),2)),t=t.replace("%I",""+((a.getHours()+11)%12+1)),t=t.replace("%p",""+(a.getHours()<12?"AM":"PM")),t=t.replace("%B",""+e.translate(s[a.getMonth()])),t=t.replace("%b",""+e.translate(c[a.getMonth()])),t=t.replace("%A",""+e.translate(r[a.getDay()])),t=t.replace("%a",""+e.translate(l[a.getDay()])),t=t.replace("%%","%")}function n(t){var a=e.dom,n=e.getParam("template_replace_values");r(a.select("*",t),function(e){r(n,function(t,l){a.hasClass(e,l)&&"function"==typeof n[l]&&n[l](e)})})}function l(t,l){function c(e,t){return new RegExp("\\b"+t+"\\b","g").test(e.className)}var s,i,o=e.dom,m=e.selection.getContent();r(e.getParam("template_replace_values"),function(e,t){"function"!=typeof e&&(l=l.replace(new RegExp("\\{\\$"+t+"\\}","g"),e))}),s=o.create("div",null,l),i=o.select(".mceTmpl",s),i&&i.length>0&&(s=o.create("div",null),s.appendChild(i[0].cloneNode(!0))),r(o.select("*",s),function(t){c(t,e.getParam("template_cdate_classes","cdate").replace(/\s+/g,"|"))&&(t.innerHTML=a(e.getParam("template_cdate_format",e.getLang("template.cdate_format")))),c(t,e.getParam("template_mdate_classes","mdate").replace(/\s+/g,"|"))&&(t.innerHTML=a(e.getParam("template_mdate_format",e.getLang("template.mdate_format")))),c(t,e.getParam("template_selected_content_classes","selcontent").replace(/\s+/g,"|"))&&(t.innerHTML=m)}),n(s),e.execCommand("mceInsertContent",!1,s.innerHTML),e.addVisual()}var r=tinymce.each;e.addCommand("mceInsertTemplate",l),e.addButton("template",{title:"Insert template",onclick:t}),e.addMenuItem("template",{text:"Insert template",onclick:t,context:"insert"}),e.on("PreProcess",function(t){var l=e.dom;r(l.select("div",t.node),function(t){l.hasClass(t,"mceTmpl")&&(r(l.select("*",t),function(t){l.hasClass(t,e.getParam("template_mdate_classes","mdate").replace(/\s+/g,"|"))&&(t.innerHTML=a(e.getParam("template_mdate_format",e.getLang("template.mdate_format"))))}),n(t))})})});