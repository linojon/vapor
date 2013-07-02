tinymce.PluginManager.add("media",function(e,t){function i(e){return-1!=e.indexOf(".mp3")?"audio/mpeg":-1!=e.indexOf(".wav")?"audio/wav":-1!=e.indexOf(".mp4")?"video/mp4":-1!=e.indexOf(".webm")?"video/webm":-1!=e.indexOf(".ogg")?"video/ogg":""}function o(){function t(e){var t,a,r,c;t=i.find("#width")[0],a=i.find("#height")[0],r=t.value(),c=a.value(),i.find("#constrain")[0].checked()&&o&&s&&r&&c&&(e.control==t?(c=Math.round(r/o*c),a.value(c)):(r=Math.round(c/s*r),t.value(r))),o=r,s=c}var i,o,s,m;m=n(e.selection.getNode()),o=m.width,s=m.height,i=e.windowManager.open({title:"Insert/edit video",data:m,bodyType:"tabpanel",body:[{title:"General",type:"form",onShowTab:function(){this.fromJSON(c(this.next().find("#embed").value()))},items:[{name:"source1",type:"filepicker",filetype:"media",size:40,autofocus:!0,label:"Source"},{name:"source2",type:"filepicker",filetype:"media",size:40,label:"Alternative source"},{name:"poster",type:"filepicker",filetype:"image",size:40,label:"Poster"},{type:"container",label:"Dimensions",layout:"flex",direction:"row",align:"center",spacing:5,items:[{name:"width",type:"textbox",maxLength:3,size:3,onchange:t},{type:"label",text:"x"},{name:"height",type:"textbox",maxLength:3,size:3,onchange:t},{name:"constrain",type:"checkbox",checked:!0,text:"Constrain proportions"}]}]},{title:"Embed",type:"panel",layout:"flex",direction:"column",align:"stretch",padding:10,spacing:10,onShowTab:function(){this.find("#embed").value(r(this.parent().toJSON()))},items:[{type:"label",text:"Paste your embed code below:"},{type:"textbox",flex:1,name:"embed",value:a(),multiline:!0,label:"Source"}]}],onSubmit:function(){e.insertContent(r(this.toJSON()))}})}function a(){var t=e.selection.getNode();return t.getAttribute("data-mce-object")?e.selection.getContent():void 0}function r(o){var a="";return o.source1||(tinymce.extend(o,c(o.embed)),o.source1)?(o.source1=e.convertURL(o.source1,"source"),o.source2=e.convertURL(o.source2,"source"),o.source1mime=i(o.source1),o.source2mime=i(o.source2),o.poster=e.convertURL(o.poster,"poster"),o.flashPlayerUrl=e.convertURL(t+"/moxieplayer.swf","movie"),o.embed?a=s(o.embed,o,!0):(tinymce.each(m,function(e){var t,i,a;if(t=e.regex.exec(o.source1)){for(a=e.url,i=0;t[i];i++)a=a.replace("$"+i,function(){return t[i]});o.source1=a,o.type=e.type,o.width=e.w,o.height=e.h}}),o.width=o.width||300,o.height=o.height||150,tinymce.each(o,function(t,i){o[i]=e.dom.encode(t)}),"iframe"==o.type?a+='<iframe src="'+o.source1+'" width="'+o.width+'" height="'+o.height+'"></iframe>':-1!=o.source1mime.indexOf("audio")?e.settings.audio_template_callback?a=e.settings.audio_template_callback(o):a+='<audio controls="controls" src="'+o.source1+'">'+(o.source2?'\n<source src="'+o.source2+'"'+(o.source2mime?' type="'+o.source2mime+'"':"")+" />\n":"")+"</audio>":a=e.settings.video_template_callback?e.settings.video_template_callback(o):'<video width="'+o.width+'" height="'+o.height+'"'+(o.poster?' poster="'+o.poster+'"':"")+' controls="controls">\n'+'<source src="'+o.source1+'"'+(o.source1mime?' type="'+o.source1mime+'"':"")+" />\n"+(o.source2?'<source src="'+o.source2+'"'+(o.source2mime?' type="'+o.source2mime+'"':"")+" />\n":"")+"</video>"),a):""}function c(e){var t={};return new tinymce.html.SaxParser({validate:!1,special:"script,noscript",start:function(e,i){t.source1||"param"!=e||(t.source1=i.map.movie),("iframe"==e||"object"==e||"embed"==e||"video"==e||"audio"==e)&&(t=tinymce.extend(i.map,t)),"source"==e&&(t.source1?t.source2||(t.source2=i.map.src):t.source1=i.map.src)}}).parse(e),t.source1=t.source1||t.src||t.data,t.source2=t.source2||"",t.poster=t.poster||"",t}function n(t){return t.getAttribute("data-mce-object")?c(e.serializer.serialize(t,{selection:!0})):{}}function s(e,t,i){function o(e,t){var i,o,a,r;for(i in t)if(a=""+t[i],e.map[i])for(o=e.length;o--;)r=e[o],r.name==i&&(a?(e.map[i]=a,r.value=a):(delete e.map[i],e.splice(o,1)));else a&&(e.push({name:i,value:a}),e.map[i]=a)}var a=new tinymce.html.Writer,r=0;return new tinymce.html.SaxParser({validate:!1,special:"script,noscript",comment:function(e){a.comment(e)},cdata:function(e){a.cdata(e)},text:function(e,t){a.text(e,t)},start:function(e,c,n){switch(e){case"video":case"object":case"img":case"iframe":o(c,{width:t.width,height:t.height})}if(i)switch(e){case"video":o(c,{poster:t.poster,src:""}),t.source2&&o(c,{src:""});break;case"iframe":o(c,{src:t.source1});break;case"source":if(r++,2>=r&&(o(c,{src:t["source"+r],type:t["source"+r+"mime"]}),!t["source"+r]))return}a.start(e,c,n)},end:function(e){if("video"==e&&i)for(var c=1;2>=c;c++)if(t["source"+c]){var n=[];n.map={},c>r&&(o(n,{src:t["source"+c],type:t["source"+c+"mime"]}),a.start("source",n,!0))}a.end(e)}},new tinymce.html.Schema({})).parse(e),a.getContent()}var m=[{regex:/youtu\.be\/([a-z1-9.-_]+)/,type:"iframe",w:425,h:350,url:"http://www.youtube.com/embed/$1"},{regex:/youtube\.com(.+)v=([^&]+)/,type:"iframe",w:425,h:350,url:"http://www.youtube.com/embed/$2"},{regex:/vimeo\.com\/([0-9]+)/,type:"iframe",w:425,h:350,url:"http://player.vimeo.com/video/$1?title=0&byline=0&portrait=0&color=8dc7dc"},{regex:/maps\.google\.([a-z]{2,3})\/maps\/(.+)msid=(.+)/,type:"iframe",w:425,h:350,url:'http://maps.google.com/maps/ms?msid=$2&output=embed"'}];e.on("ResolveName",function(e){var t;1==e.target.nodeType&&(t=e.target.getAttribute("data-mce-object"))&&(e.name=t)}),e.on("preInit",function(){var t=e.schema.getSpecialElements();tinymce.each("video audio iframe object".split(" "),function(e){t[e]=new RegExp("</"+e+"[^>]*>","gi")}),e.schema.addValidElements("object[id|style|width|height|classid|codebase|*],embed[id|style|width|height|type|src|*],video[*],audio[*]");var i=e.schema.getBoolAttrs();tinymce.each("webkitallowfullscreen mozallowfullscreen allowfullscreen".split(" "),function(e){i[e]={}}),e.parser.addNodeFilter("iframe,video,audio,object,embed",function(t,i){for(var o,a,r,c,n,s,m,u=t.length;u--;){for(a=t[u],r=new tinymce.html.Node("img",1),r.shortEnded=!0,s=a.attributes,o=s.length;o--;)c=s[o].name,n=s[o].value,"width"!==c&&"height"!==c&&"style"!==c&&(("data"==c||"src"==c)&&(n=e.convertURL(n,c)),r.attr("data-mce-p-"+c,n));m=a.firstChild&&a.firstChild.value,m&&(r.attr("data-mce-html",escape(m)),r.firstChild=null),r.attr({width:a.attr("width")||"300",height:a.attr("height")||("audio"==i?"30":"150"),style:a.attr("style"),src:tinymce.Env.transparentSrc,"data-mce-object":i,"class":"mce-object mce-object-"+i}),a.replace(r)}}),e.serializer.addAttributeFilter("data-mce-object",function(e,t){for(var i,o,a,r,c,n,s=e.length;s--;){for(i=e[s],o=new tinymce.html.Node(i.attr(t),1),"audio"!=i.attr(t)&&o.attr({width:i.attr("width"),height:i.attr("height")}),o.attr({style:i.attr("style")}),r=i.attributes,a=r.length;a--;){var m=r[a].name;0===m.indexOf("data-mce-p-")&&o.attr(m.substr(11),r[a].value)}c=i.attr("data-mce-html"),c&&(n=new tinymce.html.Node("#text",3),n.raw=!0,n.value=unescape(c),o.append(n)),i.replace(o)}})}),e.on("ObjectSelected",function(e){"audio"==e.target.getAttribute("data-mce-object")&&e.preventDefault()}),e.on("objectResized",function(e){var t,i=e.target;i.getAttribute("data-mce-object")&&(t=i.getAttribute("data-mce-html"),t&&(t=unescape(t),i.setAttribute("data-mce-html",escape(s(t,{width:e.width,height:e.height})))))}),e.addButton("media",{tooltip:"Insert/edit video",onclick:o,stateSelector:"img[data-mce-object=video]"}),e.addMenuItem("media",{icon:"media",text:"Insert video",onclick:o,context:"insert",prependToContext:!0})});