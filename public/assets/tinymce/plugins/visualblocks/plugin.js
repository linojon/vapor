tinymce.PluginManager.add("visualblocks",function(e,s){var o,l,t;window.NodeList&&(e.addCommand("mceVisualBlocks",function(){var a,c=e.dom;o||(o=c.uniqueId(),a=c.create("link",{id:o,rel:"stylesheet",href:s+"/css/visualblocks.css"}),e.getDoc().getElementsByTagName("head")[0].appendChild(a)),e.on("PreviewFormats AfterPreviewFormats",function(s){t&&c.toggleClass(e.getBody(),"mce-visualblocks","afterpreviewformats"==s.type)}),c.toggleClass(e.getBody(),"mce-visualblocks"),t=e.dom.hasClass(e.getBody(),"mce-visualblocks"),l&&l.active(c.hasClass(e.getBody(),"mce-visualblocks"))}),e.addButton("visualblocks",{title:"Show blocks",cmd:"mceVisualBlocks"}),e.addMenuItem("visualblocks",{text:"Show blocks",cmd:"mceVisualBlocks",onPostRender:function(){l=this,l.active(e.dom.hasClass(e.getBody(),"mce-visualblocks"))},selectable:!0,context:"view",prependToContext:!0}),e.on("init",function(){e.settings.visualblocks_default_state&&e.execCommand("mceVisualBlocks",!1,null,{skip_focus:!0})}),e.on("remove",function(){e.dom.removeClass(e.getBody(),"mce-visualblocks")}))});