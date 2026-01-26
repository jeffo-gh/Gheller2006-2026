function contextualize(menuId, color) {
		var loc = location.href;
		var menu = document.getElementById(menuId);
		var refs = menu.getElementsByTagName("a");
		for(var i = 0; i < refs.length; ++i) {
			var ref = refs[i];
			if(ref.href != null && ref.href.length > 0) {
				if(loc == ref.href) {
					var p = ref.parentNode;
					while(p.nodeName.toUpperCase() != "TD") {
						p = p.parentNode;
						if(p == null || p == menu)
							return;
					}
					p.style.background=color;
				}
			}
		}
	}
	
