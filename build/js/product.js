$(document).ready(function(){
	/*
	== malihu jquery custom scrollbar plugin == 
	Version: 3.1.5 
	Plugin URI: http://manos.malihu.gr/jquery-custom-content-scroller 
	Author: malihu
	Author URI: http://manos.malihu.gr
	License: MIT License (MIT)
	*/
	
	/*
	Copyright Manos Malihutsakis (email: manos@malihu.gr)
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	*/
	
	/*
	The code below is fairly long, fully commented and should be normally used in development. 
	For production, use either the minified jquery.mCustomScrollbar.min.js script or 
	the production-ready jquery.mCustomScrollbar.concat.min.js which contains the plugin 
	and dependencies (minified). 
	*/
	
	(function(factory){
		if(typeof define==="function" && define.amd){
			define(["jquery"],factory);
		}else if(typeof module!=="undefined" && module.exports){
			module.exports=factory;
		}else{
			factory(jQuery,window,document);
		}
	}(function($){
	(function(init){
		var _rjs=typeof define==="function" && define.amd, /* RequireJS */
			_njs=typeof module !== "undefined" && module.exports, /* NodeJS */
			_dlp=("https:"==document.location.protocol) ? "https:" : "http:", /* location protocol */
			_url="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
		if(!_rjs){
			if(_njs){
				require("jquery-mousewheel")($);
			}else{
				/* load jquery-mousewheel plugin (via CDN) if it's not present or not loaded via RequireJS 
				(works when mCustomScrollbar fn is called on window load) */
				$.event.special.mousewheel || $("head").append(decodeURI("%3Cscript src="+_dlp+"//"+_url+"%3E%3C/script%3E"));
			}
		}
		init();
	}(function(){
		
		/* 
		----------------------------------------
		PLUGIN NAMESPACE, PREFIX, DEFAULT SELECTOR(S) 
		----------------------------------------
		*/
		
		var pluginNS="mCustomScrollbar",
			pluginPfx="mCS",
			defaultSelector=".mCustomScrollbar",
		
		
			
		
		
		/* 
		----------------------------------------
		DEFAULT OPTIONS 
		----------------------------------------
		*/
		
			defaults={
				/*
				set element/content width/height programmatically 
				values: boolean, pixels, percentage 
					option						default
					-------------------------------------
					setWidth					false
					setHeight					false
				*/
				/*
				set the initial css top property of content  
				values: string (e.g. "-100px", "10%" etc.)
				*/
				setTop:0,
				/*
				set the initial css left property of content  
				values: string (e.g. "-100px", "10%" etc.)
				*/
				setLeft:0,
				/* 
				scrollbar axis (vertical and/or horizontal scrollbars) 
				values (string): "y", "x", "yx"
				*/
				axis:"y",
				/*
				position of scrollbar relative to content  
				values (string): "inside", "outside" ("outside" requires elements with position:relative)
				*/
				scrollbarPosition:"inside",
				/*
				scrolling inertia
				values: integer (milliseconds)
				*/
				scrollInertia:950,
				/* 
				auto-adjust scrollbar dragger length
				values: boolean
				*/
				autoDraggerLength:true,
				/*
				auto-hide scrollbar when idle 
				values: boolean
					option						default
					-------------------------------------
					autoHideScrollbar			false
				*/
				/*
				auto-expands scrollbar on mouse-over and dragging
				values: boolean
					option						default
					-------------------------------------
					autoExpandScrollbar			false
				*/
				/*
				always show scrollbar, even when there's nothing to scroll 
				values: integer (0=disable, 1=always show dragger rail and buttons, 2=always show dragger rail, dragger and buttons), boolean
				*/
				alwaysShowScrollbar:0,
				/*
				scrolling always snaps to a multiple of this number in pixels
				values: integer, array ([y,x])
					option						default
					-------------------------------------
					snapAmount					null
				*/
				/*
				when snapping, snap with this number in pixels as an offset 
				values: integer
				*/
				snapOffset:0,
				/* 
				mouse-wheel scrolling
				*/
				mouseWheel:{
					/* 
					enable mouse-wheel scrolling
					values: boolean
					*/
					enable:true,
					/* 
					scrolling amount in pixels
					values: "auto", integer 
					*/
					scrollAmount:"auto",
					/* 
					mouse-wheel scrolling axis 
					the default scrolling direction when both vertical and horizontal scrollbars are present 
					values (string): "y", "x" 
					*/
					axis:"y",
					/* 
					prevent the default behaviour which automatically scrolls the parent element(s) when end of scrolling is reached 
					values: boolean
						option						default
						-------------------------------------
						preventDefault				null
					*/
					/*
					the reported mouse-wheel delta value. The number of lines (translated to pixels) one wheel notch scrolls.  
					values: "auto", integer 
					"auto" uses the default OS/browser value 
					*/
					deltaFactor:"auto",
					/*
					normalize mouse-wheel delta to -1 or 1 (disables mouse-wheel acceleration) 
					values: boolean
						option						default
						-------------------------------------
						normalizeDelta				null
					*/
					/*
					invert mouse-wheel scrolling direction 
					values: boolean
						option						default
						-------------------------------------
						invert						null
					*/
					/*
					the tags that disable mouse-wheel when cursor is over them
					*/
					disableOver:["select","option","keygen","datalist","textarea"]
				},
				/* 
				scrollbar buttons
				*/
				scrollButtons:{ 
					/*
					enable scrollbar buttons
					values: boolean
						option						default
						-------------------------------------
						enable						null
					*/
					/*
					scrollbar buttons scrolling type 
					values (string): "stepless", "stepped"
					*/
					scrollType:"stepless",
					/*
					scrolling amount in pixels
					values: "auto", integer 
					*/
					scrollAmount:"auto"
					/*
					tabindex of the scrollbar buttons
					values: false, integer
						option						default
						-------------------------------------
						tabindex					null
					*/
				},
				/* 
				keyboard scrolling
				*/
				keyboard:{ 
					/*
					enable scrolling via keyboard
					values: boolean
					*/
					enable:true,
					/*
					keyboard scrolling type 
					values (string): "stepless", "stepped"
					*/
					scrollType:"stepless",
					/*
					scrolling amount in pixels
					values: "auto", integer 
					*/
					scrollAmount:"auto"
				},
				/*
				enable content touch-swipe scrolling 
				values: boolean, integer, string (number)
				integer values define the axis-specific minimum amount required for scrolling momentum
				*/
				contentTouchScroll:25,
				/*
				enable/disable document (default) touch-swipe scrolling 
				*/
				documentTouchScroll:true,
				/*
				advanced option parameters
				*/
				advanced:{
					/*
					auto-expand content horizontally (for "x" or "yx" axis) 
					values: boolean, integer (the value 2 forces the non scrollHeight/scrollWidth method, the value 3 forces the scrollHeight/scrollWidth method)
						option						default
						-------------------------------------
						autoExpandHorizontalScroll	null
					*/
					/*
					auto-scroll to elements with focus
					*/
					autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
					/*
					auto-update scrollbars on content, element or viewport resize 
					should be true for fluid layouts/elements, adding/removing content dynamically, hiding/showing elements, content with images etc. 
					values: boolean
					*/
					updateOnContentResize:true,
					/*
					auto-update scrollbars each time each image inside the element is fully loaded 
					values: "auto", boolean
					*/
					updateOnImageLoad:"auto",
					/*
					auto-update scrollbars based on the amount and size changes of specific selectors 
					useful when you need to update the scrollbar(s) automatically, each time a type of element is added, removed or changes its size 
					values: boolean, string (e.g. "ul li" will auto-update scrollbars each time list-items inside the element are changed) 
					a value of true (boolean) will auto-update scrollbars each time any element is changed
						option						default
						-------------------------------------
						updateOnSelectorChange		null
					*/
					/*
					extra selectors that'll allow scrollbar dragging upon mousemove/up, pointermove/up, touchend etc. (e.g. "selector-1, selector-2")
						option						default
						-------------------------------------
						extraDraggableSelectors		null
					*/
					/*
					extra selectors that'll release scrollbar dragging upon mouseup, pointerup, touchend etc. (e.g. "selector-1, selector-2")
						option						default
						-------------------------------------
						releaseDraggableSelectors	null
					*/
					/*
					auto-update timeout 
					values: integer (milliseconds)
					*/
					autoUpdateTimeout:60
				},
				/* 
				scrollbar theme 
				values: string (see CSS/plugin URI for a list of ready-to-use themes)
				*/
				theme:"light",
				/*
				user defined callback functions
				*/
				callbacks:{
					/*
					Available callbacks: 
						callback					default
						-------------------------------------
						onCreate					null
						onInit						null
						onScrollStart				null
						onScroll					null
						onTotalScroll				null
						onTotalScrollBack			null
						whileScrolling				null
						onOverflowY					null
						onOverflowX					null
						onOverflowYNone				null
						onOverflowXNone				null
						onImageLoad					null
						onSelectorChange			null
						onBeforeUpdate				null
						onUpdate					null
					*/
					onTotalScrollOffset:0,
					onTotalScrollBackOffset:0,
					alwaysTriggerOffsets:true
				}
				/*
				add scrollbar(s) on all elements matching the current selector, now and in the future 
				values: boolean, string 
				string values: "on" (enable), "once" (disable after first invocation), "off" (disable)
				liveSelector values: string (selector)
					option						default
					-------------------------------------
					live						false
					liveSelector				null
				*/
			},
		
		
		
		
		
		/* 
		----------------------------------------
		VARS, CONSTANTS 
		----------------------------------------
		*/
		
			totalInstances=0, /* plugin instances amount */
			liveTimers={}, /* live option timers */
			oldIE=(window.attachEvent && !window.addEventListener) ? 1 : 0, /* detect IE < 9 */
			touchActive=false,touchable, /* global touch vars (for touch and pointer events) */
			/* general plugin classes */
			classes=[
				"mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar",
				"mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer",
				"mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"
			],
			
		
		
		
		
		/* 
		----------------------------------------
		METHODS 
		----------------------------------------
		*/
		
			methods={
				
				/* 
				plugin initialization method 
				creates the scrollbar(s), plugin data object and options
				----------------------------------------
				*/
				
				init:function(options){
					
					var options=$.extend(true,{},defaults,options),
						selector=_selector.call(this); /* validate selector */
					
					/* 
					if live option is enabled, monitor for elements matching the current selector and 
					apply scrollbar(s) when found (now and in the future) 
					*/
					if(options.live){
						var liveSelector=options.liveSelector || this.selector || defaultSelector, /* live selector(s) */
							$liveSelector=$(liveSelector); /* live selector(s) as jquery object */
						if(options.live==="off"){
							/* 
							disable live if requested 
							usage: $(selector).mCustomScrollbar({live:"off"}); 
							*/
							removeLiveTimers(liveSelector);
							return;
						}
						liveTimers[liveSelector]=setTimeout(function(){
							/* call mCustomScrollbar fn on live selector(s) every half-second */
							$liveSelector.mCustomScrollbar(options);
							if(options.live==="once" && $liveSelector.length){
								/* disable live after first invocation */
								removeLiveTimers(liveSelector);
							}
						},500);
					}else{
						removeLiveTimers(liveSelector);
					}
					
					/* options backward compatibility (for versions < 3.0.0) and normalization */
					options.setWidth=(options.set_width) ? options.set_width : options.setWidth;
					options.setHeight=(options.set_height) ? options.set_height : options.setHeight;
					options.axis=(options.horizontalScroll) ? "x" : _findAxis(options.axis);
					options.scrollInertia=options.scrollInertia>0 && options.scrollInertia<17 ? 17 : options.scrollInertia;
					if(typeof options.mouseWheel!=="object" &&  options.mouseWheel==true){ /* old school mouseWheel option (non-object) */
						options.mouseWheel={enable:true,scrollAmount:"auto",axis:"y",preventDefault:false,deltaFactor:"auto",normalizeDelta:false,invert:false}
					}
					options.mouseWheel.scrollAmount=!options.mouseWheelPixels ? options.mouseWheel.scrollAmount : options.mouseWheelPixels;
					options.mouseWheel.normalizeDelta=!options.advanced.normalizeMouseWheelDelta ? options.mouseWheel.normalizeDelta : options.advanced.normalizeMouseWheelDelta;
					options.scrollButtons.scrollType=_findScrollButtonsType(options.scrollButtons.scrollType); 
					
					_theme(options); /* theme-specific options */
					
					/* plugin constructor */
					return $(selector).each(function(){
						
						var $this=$(this);
						
						if(!$this.data(pluginPfx)){ /* prevent multiple instantiations */
						
							/* store options and create objects in jquery data */
							$this.data(pluginPfx,{
								idx:++totalInstances, /* instance index */
								opt:options, /* options */
								scrollRatio:{y:null,x:null}, /* scrollbar to content ratio */
								overflowed:null, /* overflowed axis */
								contentReset:{y:null,x:null}, /* object to check when content resets */
								bindEvents:false, /* object to check if events are bound */
								tweenRunning:false, /* object to check if tween is running */
								sequential:{}, /* sequential scrolling object */
								langDir:$this.css("direction"), /* detect/store direction (ltr or rtl) */
								cbOffsets:null, /* object to check whether callback offsets always trigger */
								/* 
								object to check how scrolling events where last triggered 
								"internal" (default - triggered by this script), "external" (triggered by other scripts, e.g. via scrollTo method) 
								usage: object.data("mCS").trigger
								*/
								trigger:null,
								/* 
								object to check for changes in elements in order to call the update method automatically 
								*/
								poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}
							});
							
							var d=$this.data(pluginPfx),o=d.opt,
								/* HTML data attributes */
								htmlDataAxis=$this.data("mcs-axis"),htmlDataSbPos=$this.data("mcs-scrollbar-position"),htmlDataTheme=$this.data("mcs-theme");
							 
							if(htmlDataAxis){o.axis=htmlDataAxis;} /* usage example: data-mcs-axis="y" */
							if(htmlDataSbPos){o.scrollbarPosition=htmlDataSbPos;} /* usage example: data-mcs-scrollbar-position="outside" */
							if(htmlDataTheme){ /* usage example: data-mcs-theme="minimal" */
								o.theme=htmlDataTheme;
								_theme(o); /* theme-specific options */
							}
							
							_pluginMarkup.call(this); /* add plugin markup */
							
							if(d && o.callbacks.onCreate && typeof o.callbacks.onCreate==="function"){o.callbacks.onCreate.call(this);} /* callbacks: onCreate */
							
							$("#mCSB_"+d.idx+"_container img:not(."+classes[2]+")").addClass(classes[2]); /* flag loaded images */
							
							methods.update.call(null,$this); /* call the update method */
						
						}
						
					});
					
				},
				/* ---------------------------------------- */
				
				
				
				/* 
				plugin update method 
				updates content and scrollbar(s) values, events and status 
				----------------------------------------
				usage: $(selector).mCustomScrollbar("update");
				*/
				
				update:function(el,cb){
					
					var selector=el || _selector.call(this); /* validate selector */
					
					return $(selector).each(function(){
						
						var $this=$(this);
						
						if($this.data(pluginPfx)){ /* check if plugin has initialized */
							
							var d=$this.data(pluginPfx),o=d.opt,
								mCSB_container=$("#mCSB_"+d.idx+"_container"),
								mCustomScrollBox=$("#mCSB_"+d.idx),
								mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
							
							if(!mCSB_container.length){return;}
							
							if(d.tweenRunning){_stop($this);} /* stop any running tweens while updating */
							
							if(cb && d && o.callbacks.onBeforeUpdate && typeof o.callbacks.onBeforeUpdate==="function"){o.callbacks.onBeforeUpdate.call(this);} /* callbacks: onBeforeUpdate */
							
							/* if element was disabled or destroyed, remove class(es) */
							if($this.hasClass(classes[3])){$this.removeClass(classes[3]);}
							if($this.hasClass(classes[4])){$this.removeClass(classes[4]);}
							
							/* css flexbox fix, detect/set max-height */
							mCustomScrollBox.css("max-height","none");
							if(mCustomScrollBox.height()!==$this.height()){mCustomScrollBox.css("max-height",$this.height());}
							
							_expandContentHorizontally.call(this); /* expand content horizontally */
							
							if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
								mCSB_container.css("width",_contentWidth(mCSB_container));
							}
							
							d.overflowed=_overflowed.call(this); /* determine if scrolling is required */
							
							_scrollbarVisibility.call(this); /* show/hide scrollbar(s) */
							
							/* auto-adjust scrollbar dragger length analogous to content */
							if(o.autoDraggerLength){_setDraggerLength.call(this);}
							
							_scrollRatio.call(this); /* calculate and store scrollbar to content ratio */
							
							_bindEvents.call(this); /* bind scrollbar events */
							
							/* reset scrolling position and/or events */
							var to=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)];
							if(o.axis!=="x"){ /* y/yx axis */
								if(!d.overflowed[0]){ /* y scrolling is not required */
									_resetContentPosition.call(this); /* reset content position */
									if(o.axis==="y"){
										_unbindEvents.call(this);
									}else if(o.axis==="yx" && d.overflowed[1]){
										_scrollTo($this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
									}
								}else if(mCSB_dragger[0].height()>mCSB_dragger[0].parent().height()){
									_resetContentPosition.call(this); /* reset content position */
								}else{ /* y scrolling is required */
									_scrollTo($this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
									d.contentReset.y=null;
								}
							}
							if(o.axis!=="y"){ /* x/yx axis */
								if(!d.overflowed[1]){ /* x scrolling is not required */
									_resetContentPosition.call(this); /* reset content position */
									if(o.axis==="x"){
										_unbindEvents.call(this);
									}else if(o.axis==="yx" && d.overflowed[0]){
										_scrollTo($this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
									}
								}else if(mCSB_dragger[1].width()>mCSB_dragger[1].parent().width()){
									_resetContentPosition.call(this); /* reset content position */
								}else{ /* x scrolling is required */
									_scrollTo($this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
									d.contentReset.x=null;
								}
							}
							
							/* callbacks: onImageLoad, onSelectorChange, onUpdate */
							if(cb && d){
								if(cb===2 && o.callbacks.onImageLoad && typeof o.callbacks.onImageLoad==="function"){
									o.callbacks.onImageLoad.call(this);
								}else if(cb===3 && o.callbacks.onSelectorChange && typeof o.callbacks.onSelectorChange==="function"){
									o.callbacks.onSelectorChange.call(this);
								}else if(o.callbacks.onUpdate && typeof o.callbacks.onUpdate==="function"){
									o.callbacks.onUpdate.call(this);
								}
							}
							
							_autoUpdate.call(this); /* initialize automatic updating (for dynamic content, fluid layouts etc.) */
							
						}
						
					});
					
				},
				/* ---------------------------------------- */
				
				
				
				/* 
				plugin scrollTo method 
				triggers a scrolling event to a specific value
				----------------------------------------
				usage: $(selector).mCustomScrollbar("scrollTo",value,options);
				*/
			
				scrollTo:function(val,options){
					
					/* prevent silly things like $(selector).mCustomScrollbar("scrollTo",undefined); */
					if(typeof val=="undefined" || val==null){return;}
					
					var selector=_selector.call(this); /* validate selector */
					
					return $(selector).each(function(){
						
						var $this=$(this);
						
						if($this.data(pluginPfx)){ /* check if plugin has initialized */
						
							var d=$this.data(pluginPfx),o=d.opt,
								/* method default options */
								methodDefaults={
									trigger:"external", /* method is by default triggered externally (e.g. from other scripts) */
									scrollInertia:o.scrollInertia, /* scrolling inertia (animation duration) */
									scrollEasing:"mcsEaseInOut", /* animation easing */
									moveDragger:false, /* move dragger instead of content */
									timeout:60, /* scroll-to delay */
									callbacks:true, /* enable/disable callbacks */
									onStart:true,
									onUpdate:true,
									onComplete:true
								},
								methodOptions=$.extend(true,{},methodDefaults,options),
								to=_arr.call(this,val),dur=methodOptions.scrollInertia>0 && methodOptions.scrollInertia<17 ? 17 : methodOptions.scrollInertia;
							
							/* translate yx values to actual scroll-to positions */
							to[0]=_to.call(this,to[0],"y");
							to[1]=_to.call(this,to[1],"x");
							
							/* 
							check if scroll-to value moves the dragger instead of content. 
							Only pixel values apply on dragger (e.g. 100, "100px", "-=100" etc.) 
							*/
							if(methodOptions.moveDragger){
								to[0]*=d.scrollRatio.y;
								to[1]*=d.scrollRatio.x;
							}
							
							methodOptions.dur=_isTabHidden() ? 0 : dur; //skip animations if browser tab is hidden
							
							setTimeout(function(){ 
								/* do the scrolling */
								if(to[0]!==null && typeof to[0]!=="undefined" && o.axis!=="x" && d.overflowed[0]){ /* scroll y */
									methodOptions.dir="y";
									methodOptions.overwrite="all";
									_scrollTo($this,to[0].toString(),methodOptions);
								}
								if(to[1]!==null && typeof to[1]!=="undefined" && o.axis!=="y" && d.overflowed[1]){ /* scroll x */
									methodOptions.dir="x";
									methodOptions.overwrite="none";
									_scrollTo($this,to[1].toString(),methodOptions);
								}
							},methodOptions.timeout);
							
						}
						
					});
					
				},
				/* ---------------------------------------- */
				
				
				
				/*
				plugin stop method 
				stops scrolling animation
				----------------------------------------
				usage: $(selector).mCustomScrollbar("stop");
				*/
				stop:function(){
					
					var selector=_selector.call(this); /* validate selector */
					
					return $(selector).each(function(){
						
						var $this=$(this);
						
						if($this.data(pluginPfx)){ /* check if plugin has initialized */
											
							_stop($this);
						
						}
						
					});
					
				},
				/* ---------------------------------------- */
				
				
				
				/*
				plugin disable method 
				temporarily disables the scrollbar(s) 
				----------------------------------------
				usage: $(selector).mCustomScrollbar("disable",reset); 
				reset (boolean): resets content position to 0 
				*/
				disable:function(r){
					
					var selector=_selector.call(this); /* validate selector */
					
					return $(selector).each(function(){
						
						var $this=$(this);
						
						if($this.data(pluginPfx)){ /* check if plugin has initialized */
							
							var d=$this.data(pluginPfx);
							
							_autoUpdate.call(this,"remove"); /* remove automatic updating */
							
							_unbindEvents.call(this); /* unbind events */
							
							if(r){_resetContentPosition.call(this);} /* reset content position */
							
							_scrollbarVisibility.call(this,true); /* show/hide scrollbar(s) */
							
							$this.addClass(classes[3]); /* add disable class */
						
						}
						
					});
					
				},
				/* ---------------------------------------- */
				
				
				
				/*
				plugin destroy method 
				completely removes the scrollbar(s) and returns the element to its original state
				----------------------------------------
				usage: $(selector).mCustomScrollbar("destroy"); 
				*/
				destroy:function(){
					
					var selector=_selector.call(this); /* validate selector */
					
					return $(selector).each(function(){
						
						var $this=$(this);
						
						if($this.data(pluginPfx)){ /* check if plugin has initialized */
						
							var d=$this.data(pluginPfx),o=d.opt,
								mCustomScrollBox=$("#mCSB_"+d.idx),
								mCSB_container=$("#mCSB_"+d.idx+"_container"),
								scrollbar=$(".mCSB_"+d.idx+"_scrollbar");
						
							if(o.live){removeLiveTimers(o.liveSelector || $(selector).selector);} /* remove live timers */
							
							_autoUpdate.call(this,"remove"); /* remove automatic updating */
							
							_unbindEvents.call(this); /* unbind events */
							
							_resetContentPosition.call(this); /* reset content position */
							
							$this.removeData(pluginPfx); /* remove plugin data object */
							
							_delete(this,"mcs"); /* delete callbacks object */
							
							/* remove plugin markup */
							scrollbar.remove(); /* remove scrollbar(s) first (those can be either inside or outside plugin's inner wrapper) */
							mCSB_container.find("img."+classes[2]).removeClass(classes[2]); /* remove loaded images flag */
							mCustomScrollBox.replaceWith(mCSB_container.contents()); /* replace plugin's inner wrapper with the original content */
							/* remove plugin classes from the element and add destroy class */
							$this.removeClass(pluginNS+" _"+pluginPfx+"_"+d.idx+" "+classes[6]+" "+classes[7]+" "+classes[5]+" "+classes[3]).addClass(classes[4]);
						
						}
						
					});
					
				}
				/* ---------------------------------------- */
				
			},
		
		
		
		
			
		/* 
		----------------------------------------
		FUNCTIONS
		----------------------------------------
		*/
		
			/* validates selector (if selector is invalid or undefined uses the default one) */
			_selector=function(){
				return (typeof $(this)!=="object" || $(this).length<1) ? defaultSelector : this;
			},
			/* -------------------- */
			
			
			/* changes options according to theme */
			_theme=function(obj){
				var fixedSizeScrollbarThemes=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],
					nonExpandedScrollbarThemes=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],
					disabledScrollButtonsThemes=["minimal","minimal-dark"],
					enabledAutoHideScrollbarThemes=["minimal","minimal-dark"],
					scrollbarPositionOutsideThemes=["minimal","minimal-dark"];
				obj.autoDraggerLength=$.inArray(obj.theme,fixedSizeScrollbarThemes) > -1 ? false : obj.autoDraggerLength;
				obj.autoExpandScrollbar=$.inArray(obj.theme,nonExpandedScrollbarThemes) > -1 ? false : obj.autoExpandScrollbar;
				obj.scrollButtons.enable=$.inArray(obj.theme,disabledScrollButtonsThemes) > -1 ? false : obj.scrollButtons.enable;
				obj.autoHideScrollbar=$.inArray(obj.theme,enabledAutoHideScrollbarThemes) > -1 ? true : obj.autoHideScrollbar;
				obj.scrollbarPosition=$.inArray(obj.theme,scrollbarPositionOutsideThemes) > -1 ? "outside" : obj.scrollbarPosition;
			},
			/* -------------------- */
			
			
			/* live option timers removal */
			removeLiveTimers=function(selector){
				if(liveTimers[selector]){
					clearTimeout(liveTimers[selector]);
					_delete(liveTimers,selector);
				}
			},
			/* -------------------- */
			
			
			/* normalizes axis option to valid values: "y", "x", "yx" */
			_findAxis=function(val){
				return (val==="yx" || val==="xy" || val==="auto") ? "yx" : (val==="x" || val==="horizontal") ? "x" : "y";
			},
			/* -------------------- */
			
			
			/* normalizes scrollButtons.scrollType option to valid values: "stepless", "stepped" */
			_findScrollButtonsType=function(val){
				return (val==="stepped" || val==="pixels" || val==="step" || val==="click") ? "stepped" : "stepless";
			},
			/* -------------------- */
			
			
			/* generates plugin markup */
			_pluginMarkup=function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					expandClass=o.autoExpandScrollbar ? " "+classes[1]+"_expand" : "",
					scrollbar=["<div id='mCSB_"+d.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_vertical"+expandClass+"'><div class='"+classes[12]+"'><div id='mCSB_"+d.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+d.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_horizontal"+expandClass+"'><div class='"+classes[12]+"'><div id='mCSB_"+d.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
					wrapperClass=o.axis==="yx" ? "mCSB_vertical_horizontal" : o.axis==="x" ? "mCSB_horizontal" : "mCSB_vertical",
					scrollbars=o.axis==="yx" ? scrollbar[0]+scrollbar[1] : o.axis==="x" ? scrollbar[1] : scrollbar[0],
					contentWrapper=o.axis==="yx" ? "<div id='mCSB_"+d.idx+"_container_wrapper' class='mCSB_container_wrapper' />" : "",
					autoHideClass=o.autoHideScrollbar ? " "+classes[6] : "",
					scrollbarDirClass=(o.axis!=="x" && d.langDir==="rtl") ? " "+classes[7] : "";
				if(o.setWidth){$this.css("width",o.setWidth);} /* set element width */
				if(o.setHeight){$this.css("height",o.setHeight);} /* set element height */
				o.setLeft=(o.axis!=="y" && d.langDir==="rtl") ? "989999px" : o.setLeft; /* adjust left position for rtl direction */
				$this.addClass(pluginNS+" _"+pluginPfx+"_"+d.idx+autoHideClass+scrollbarDirClass).wrapInner("<div id='mCSB_"+d.idx+"' class='mCustomScrollBox mCS-"+o.theme+" "+wrapperClass+"'><div id='mCSB_"+d.idx+"_container' class='mCSB_container' style='position:relative; top:"+o.setTop+"; left:"+o.setLeft+";' dir='"+d.langDir+"' /></div>");
				var mCustomScrollBox=$("#mCSB_"+d.idx),
					mCSB_container=$("#mCSB_"+d.idx+"_container");
				if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
					mCSB_container.css("width",_contentWidth(mCSB_container));
				}
				if(o.scrollbarPosition==="outside"){
					if($this.css("position")==="static"){ /* requires elements with non-static position */
						$this.css("position","relative");
					}
					$this.css("overflow","visible");
					mCustomScrollBox.addClass("mCSB_outside").after(scrollbars);
				}else{
					mCustomScrollBox.addClass("mCSB_inside").append(scrollbars);
					mCSB_container.wrap(contentWrapper);
				}
				_scrollButtons.call(this); /* add scrollbar buttons */
				/* minimum dragger length */
				var mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
				mCSB_dragger[0].css("min-height",mCSB_dragger[0].height());
				mCSB_dragger[1].css("min-width",mCSB_dragger[1].width());
			},
			/* -------------------- */
			
			
			/* calculates content width */
			_contentWidth=function(el){
				var val=[el[0].scrollWidth,Math.max.apply(Math,el.children().map(function(){return $(this).outerWidth(true);}).get())],w=el.parent().width();
				return val[0]>w ? val[0] : val[1]>w ? val[1] : "100%";
			},
			/* -------------------- */
			
			
			/* expands content horizontally */
			_expandContentHorizontally=function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					mCSB_container=$("#mCSB_"+d.idx+"_container");
				if(o.advanced.autoExpandHorizontalScroll && o.axis!=="y"){
					/* calculate scrollWidth */
					mCSB_container.css({"width":"auto","min-width":0,"overflow-x":"scroll"});
					var w=Math.ceil(mCSB_container[0].scrollWidth);
					if(o.advanced.autoExpandHorizontalScroll===3 || (o.advanced.autoExpandHorizontalScroll!==2 && w>mCSB_container.parent().width())){
						mCSB_container.css({"width":w,"min-width":"100%","overflow-x":"inherit"});
					}else{
						/* 
						wrap content with an infinite width div and set its position to absolute and width to auto. 
						Setting width to auto before calculating the actual width is important! 
						We must let the browser set the width as browser zoom values are impossible to calculate.
						*/
						mCSB_container.css({"overflow-x":"inherit","position":"absolute"})
							.wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />")
							.css({ /* set actual width, original position and un-wrap */
								/* 
								get the exact width (with decimals) and then round-up. 
								Using jquery outerWidth() will round the width value which will mess up with inner elements that have non-integer width
								*/
								"width":(Math.ceil(mCSB_container[0].getBoundingClientRect().right+0.4)-Math.floor(mCSB_container[0].getBoundingClientRect().left)),
								"min-width":"100%",
								"position":"relative"
							}).unwrap();
					}
				}
			},
			/* -------------------- */
			
			
			/* adds scrollbar buttons */
			_scrollButtons=function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					mCSB_scrollTools=$(".mCSB_"+d.idx+"_scrollbar:first"),
					tabindex=!_isNumeric(o.scrollButtons.tabindex) ? "" : "tabindex='"+o.scrollButtons.tabindex+"'",
					btnHTML=[
						"<a href='#' class='"+classes[13]+"' "+tabindex+" />",
						"<a href='#' class='"+classes[14]+"' "+tabindex+" />",
						"<a href='#' class='"+classes[15]+"' "+tabindex+" />",
						"<a href='#' class='"+classes[16]+"' "+tabindex+" />"
					],
					btn=[(o.axis==="x" ? btnHTML[2] : btnHTML[0]),(o.axis==="x" ? btnHTML[3] : btnHTML[1]),btnHTML[2],btnHTML[3]];
				if(o.scrollButtons.enable){
					mCSB_scrollTools.prepend(btn[0]).append(btn[1]).next(".mCSB_scrollTools").prepend(btn[2]).append(btn[3]);
				}
			},
			/* -------------------- */
			
			
			/* auto-adjusts scrollbar dragger length */
			_setDraggerLength=function(){
				var $this=$(this),d=$this.data(pluginPfx),
					mCustomScrollBox=$("#mCSB_"+d.idx),
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
					ratio=[mCustomScrollBox.height()/mCSB_container.outerHeight(false),mCustomScrollBox.width()/mCSB_container.outerWidth(false)],
					l=[
						parseInt(mCSB_dragger[0].css("min-height")),Math.round(ratio[0]*mCSB_dragger[0].parent().height()),
						parseInt(mCSB_dragger[1].css("min-width")),Math.round(ratio[1]*mCSB_dragger[1].parent().width())
					],
					h=oldIE && (l[1]<l[0]) ? l[0] : l[1],w=oldIE && (l[3]<l[2]) ? l[2] : l[3];
				mCSB_dragger[0].css({
					"height":h,"max-height":(mCSB_dragger[0].parent().height()-10)
				}).find(".mCSB_dragger_bar").css({"line-height":l[0]+"px"});
				mCSB_dragger[1].css({
					"width":w,"max-width":(mCSB_dragger[1].parent().width()-10)
				});
			},
			/* -------------------- */
			
			
			/* calculates scrollbar to content ratio */
			_scrollRatio=function(){
				var $this=$(this),d=$this.data(pluginPfx),
					mCustomScrollBox=$("#mCSB_"+d.idx),
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
					scrollAmount=[mCSB_container.outerHeight(false)-mCustomScrollBox.height(),mCSB_container.outerWidth(false)-mCustomScrollBox.width()],
					ratio=[
						scrollAmount[0]/(mCSB_dragger[0].parent().height()-mCSB_dragger[0].height()),
						scrollAmount[1]/(mCSB_dragger[1].parent().width()-mCSB_dragger[1].width())
					];
				d.scrollRatio={y:ratio[0],x:ratio[1]};
			},
			/* -------------------- */
			
			
			/* toggles scrolling classes */
			_onDragClasses=function(el,action,xpnd){
				var expandClass=xpnd ? classes[0]+"_expanded" : "",
					scrollbar=el.closest(".mCSB_scrollTools");
				if(action==="active"){
					el.toggleClass(classes[0]+" "+expandClass); scrollbar.toggleClass(classes[1]); 
					el[0]._draggable=el[0]._draggable ? 0 : 1;
				}else{
					if(!el[0]._draggable){
						if(action==="hide"){
							el.removeClass(classes[0]); scrollbar.removeClass(classes[1]);
						}else{
							el.addClass(classes[0]); scrollbar.addClass(classes[1]);
						}
					}
				}
			},
			/* -------------------- */
			
			
			/* checks if content overflows its container to determine if scrolling is required */
			_overflowed=function(){
				var $this=$(this),d=$this.data(pluginPfx),
					mCustomScrollBox=$("#mCSB_"+d.idx),
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					contentHeight=d.overflowed==null ? mCSB_container.height() : mCSB_container.outerHeight(false),
					contentWidth=d.overflowed==null ? mCSB_container.width() : mCSB_container.outerWidth(false),
					h=mCSB_container[0].scrollHeight,w=mCSB_container[0].scrollWidth;
				if(h>contentHeight){contentHeight=h;}
				if(w>contentWidth){contentWidth=w;}
				return [contentHeight>mCustomScrollBox.height(),contentWidth>mCustomScrollBox.width()];
			},
			/* -------------------- */
			
			
			/* resets content position to 0 */
			_resetContentPosition=function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					mCustomScrollBox=$("#mCSB_"+d.idx),
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
				_stop($this); /* stop any current scrolling before resetting */
				if((o.axis!=="x" && !d.overflowed[0]) || (o.axis==="y" && d.overflowed[0])){ /* reset y */
					mCSB_dragger[0].add(mCSB_container).css("top",0);
					_scrollTo($this,"_resetY");
				}
				if((o.axis!=="y" && !d.overflowed[1]) || (o.axis==="x" && d.overflowed[1])){ /* reset x */
					var cx=dx=0;
					if(d.langDir==="rtl"){ /* adjust left position for rtl direction */
						cx=mCustomScrollBox.width()-mCSB_container.outerWidth(false);
						dx=Math.abs(cx/d.scrollRatio.x);
					}
					mCSB_container.css("left",cx);
					mCSB_dragger[1].css("left",dx);
					_scrollTo($this,"_resetX");
				}
			},
			/* -------------------- */
			
			
			/* binds scrollbar events */
			_bindEvents=function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt;
				if(!d.bindEvents){ /* check if events are already bound */
					_draggable.call(this);
					if(o.contentTouchScroll){_contentDraggable.call(this);}
					_selectable.call(this);
					if(o.mouseWheel.enable){ /* bind mousewheel fn when plugin is available */
						function _mwt(){
							mousewheelTimeout=setTimeout(function(){
								if(!$.event.special.mousewheel){
									_mwt();
								}else{
									clearTimeout(mousewheelTimeout);
									_mousewheel.call($this[0]);
								}
							},100);
						}
						var mousewheelTimeout;
						_mwt();
					}
					_draggerRail.call(this);
					_wrapperScroll.call(this);
					if(o.advanced.autoScrollOnFocus){_focus.call(this);}
					if(o.scrollButtons.enable){_buttons.call(this);}
					if(o.keyboard.enable){_keyboard.call(this);}
					d.bindEvents=true;
				}
			},
			/* -------------------- */
			
			
			/* unbinds scrollbar events */
			_unbindEvents=function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					namespace=pluginPfx+"_"+d.idx,
					sb=".mCSB_"+d.idx+"_scrollbar",
					sel=$("#mCSB_"+d.idx+",#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,"+sb+" ."+classes[12]+",#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal,"+sb+">a"),
					mCSB_container=$("#mCSB_"+d.idx+"_container");
				if(o.advanced.releaseDraggableSelectors){sel.add($(o.advanced.releaseDraggableSelectors));}
				if(o.advanced.extraDraggableSelectors){sel.add($(o.advanced.extraDraggableSelectors));}
				if(d.bindEvents){ /* check if events are bound */
					/* unbind namespaced events from document/selectors */
					$(document).add($(!_canAccessIFrame() || top.document)).unbind("."+namespace);
					sel.each(function(){
						$(this).unbind("."+namespace);
					});
					/* clear and delete timeouts/objects */
					clearTimeout($this[0]._focusTimeout); _delete($this[0],"_focusTimeout");
					clearTimeout(d.sequential.step); _delete(d.sequential,"step");
					clearTimeout(mCSB_container[0].onCompleteTimeout); _delete(mCSB_container[0],"onCompleteTimeout");
					d.bindEvents=false;
				}
			},
			/* -------------------- */
			
			
			/* toggles scrollbar visibility */
			_scrollbarVisibility=function(disabled){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					contentWrapper=$("#mCSB_"+d.idx+"_container_wrapper"),
					content=contentWrapper.length ? contentWrapper : $("#mCSB_"+d.idx+"_container"),
					scrollbar=[$("#mCSB_"+d.idx+"_scrollbar_vertical"),$("#mCSB_"+d.idx+"_scrollbar_horizontal")],
					mCSB_dragger=[scrollbar[0].find(".mCSB_dragger"),scrollbar[1].find(".mCSB_dragger")];
				if(o.axis!=="x"){
					if(d.overflowed[0] && !disabled){
						scrollbar[0].add(mCSB_dragger[0]).add(scrollbar[0].children("a")).css("display","block");
						content.removeClass(classes[8]+" "+classes[10]);
					}else{
						if(o.alwaysShowScrollbar){
							if(o.alwaysShowScrollbar!==2){mCSB_dragger[0].css("display","none");}
							content.removeClass(classes[10]);
						}else{
							scrollbar[0].css("display","none");
							content.addClass(classes[10]);
						}
						content.addClass(classes[8]);
					}
				}
				if(o.axis!=="y"){
					if(d.overflowed[1] && !disabled){
						scrollbar[1].add(mCSB_dragger[1]).add(scrollbar[1].children("a")).css("display","block");
						content.removeClass(classes[9]+" "+classes[11]);
					}else{
						if(o.alwaysShowScrollbar){
							if(o.alwaysShowScrollbar!==2){mCSB_dragger[1].css("display","none");}
							content.removeClass(classes[11]);
						}else{
							scrollbar[1].css("display","none");
							content.addClass(classes[11]);
						}
						content.addClass(classes[9]);
					}
				}
				if(!d.overflowed[0] && !d.overflowed[1]){
					$this.addClass(classes[5]);
				}else{
					$this.removeClass(classes[5]);
				}
			},
			/* -------------------- */
			
			
			/* returns input coordinates of pointer, touch and mouse events (relative to document) */
			_coordinates=function(e){
				var t=e.type,o=e.target.ownerDocument!==document && frameElement!==null ? [$(frameElement).offset().top,$(frameElement).offset().left] : null,
					io=_canAccessIFrame() && e.target.ownerDocument!==top.document && frameElement!==null ? [$(e.view.frameElement).offset().top,$(e.view.frameElement).offset().left] : [0,0];
				switch(t){
					case "pointerdown": case "MSPointerDown": case "pointermove": case "MSPointerMove": case "pointerup": case "MSPointerUp":
						return o ? [e.originalEvent.pageY-o[0]+io[0],e.originalEvent.pageX-o[1]+io[1],false] : [e.originalEvent.pageY,e.originalEvent.pageX,false];
						break;
					case "touchstart": case "touchmove": case "touchend":
						var touch=e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
							touches=e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
						return e.target.ownerDocument!==document ? [touch.screenY,touch.screenX,touches>1] : [touch.pageY,touch.pageX,touches>1];
						break;
					default:
						return o ? [e.pageY-o[0]+io[0],e.pageX-o[1]+io[1],false] : [e.pageY,e.pageX,false];
				}
			},
			/* -------------------- */
			
			
			/* 
			SCROLLBAR DRAG EVENTS
			scrolls content via scrollbar dragging 
			*/
			_draggable=function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					namespace=pluginPfx+"_"+d.idx,
					draggerId=["mCSB_"+d.idx+"_dragger_vertical","mCSB_"+d.idx+"_dragger_horizontal"],
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					mCSB_dragger=$("#"+draggerId[0]+",#"+draggerId[1]),
					draggable,dragY,dragX,
					rds=o.advanced.releaseDraggableSelectors ? mCSB_dragger.add($(o.advanced.releaseDraggableSelectors)) : mCSB_dragger,
					eds=o.advanced.extraDraggableSelectors ? $(!_canAccessIFrame() || top.document).add($(o.advanced.extraDraggableSelectors)) : $(!_canAccessIFrame() || top.document);
				mCSB_dragger.bind("contextmenu."+namespace,function(e){
					e.preventDefault(); //prevent right click
				}).bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
					e.stopImmediatePropagation();
					e.preventDefault();
					if(!_mouseBtnLeft(e)){return;} /* left mouse button only */
					touchActive=true;
					if(oldIE){document.onselectstart=function(){return false;}} /* disable text selection for IE < 9 */
					_iframe.call(mCSB_container,false); /* enable scrollbar dragging over iframes by disabling their events */
					_stop($this);
					draggable=$(this);
					var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left,
						h=draggable.height()+offset.top,w=draggable.width()+offset.left;
					if(y<h && y>0 && x<w && x>0){
						dragY=y; 
						dragX=x;
					}
					_onDragClasses(draggable,"active",o.autoExpandScrollbar); 
				}).bind("touchmove."+namespace,function(e){
					e.stopImmediatePropagation();
					e.preventDefault();
					var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
					_drag(dragY,dragX,y,x);
				});
				$(document).add(eds).bind("mousemove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace,function(e){
					if(draggable){
						var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
						if(dragY===y && dragX===x){return;} /* has it really moved? */
						_drag(dragY,dragX,y,x);
					}
				}).add(rds).bind("mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
					if(draggable){
						_onDragClasses(draggable,"active",o.autoExpandScrollbar); 
						draggable=null;
					}
					touchActive=false;
					if(oldIE){document.onselectstart=null;} /* enable text selection for IE < 9 */
					_iframe.call(mCSB_container,true); /* enable iframes events */
				});
				function _drag(dragY,dragX,y,x){
					mCSB_container[0].idleTimer=o.scrollInertia<233 ? 250 : 0;
					if(draggable.attr("id")===draggerId[1]){
						var dir="x",to=((draggable[0].offsetLeft-dragX)+x)*d.scrollRatio.x;
					}else{
						var dir="y",to=((draggable[0].offsetTop-dragY)+y)*d.scrollRatio.y;
					}
					_scrollTo($this,to.toString(),{dir:dir,drag:true});
				}
			},
			/* -------------------- */
			
			
			/* 
			TOUCH SWIPE EVENTS
			scrolls content via touch swipe 
			Emulates the native touch-swipe scrolling with momentum found in iOS, Android and WP devices 
			*/
			_contentDraggable=function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					namespace=pluginPfx+"_"+d.idx,
					mCustomScrollBox=$("#mCSB_"+d.idx),
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
					draggable,dragY,dragX,touchStartY,touchStartX,touchMoveY=[],touchMoveX=[],startTime,runningTime,endTime,distance,speed,amount,
					durA=0,durB,overwrite=o.axis==="yx" ? "none" : "all",touchIntent=[],touchDrag,docDrag,
					iframe=mCSB_container.find("iframe"),
					events=[
						"touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace, //start
						"touchmove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace, //move
						"touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace //end
					],
					touchAction=document.body.style.touchAction!==undefined && document.body.style.touchAction!=="";
				mCSB_container.bind(events[0],function(e){
					_onTouchstart(e);
				}).bind(events[1],function(e){
					_onTouchmove(e);
				});
				mCustomScrollBox.bind(events[0],function(e){
					_onTouchstart2(e);
				}).bind(events[2],function(e){
					_onTouchend(e);
				});
				if(iframe.length){
					iframe.each(function(){
						$(this).bind("load",function(){
							/* bind events on accessible iframes */
							if(_canAccessIFrame(this)){
								$(this.contentDocument || this.contentWindow.document).bind(events[0],function(e){
									_onTouchstart(e);
									_onTouchstart2(e);
								}).bind(events[1],function(e){
									_onTouchmove(e);
								}).bind(events[2],function(e){
									_onTouchend(e);
								});
							}
						});
					});
				}
				function _onTouchstart(e){
					if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){touchable=0; return;}
					touchable=1; touchDrag=0; docDrag=0; draggable=1;
					$this.removeClass("mCS_touch_action");
					var offset=mCSB_container.offset();
					dragY=_coordinates(e)[0]-offset.top;
					dragX=_coordinates(e)[1]-offset.left;
					touchIntent=[_coordinates(e)[0],_coordinates(e)[1]];
				}
				function _onTouchmove(e){
					if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){return;}
					if(!o.documentTouchScroll){e.preventDefault();} 
					e.stopImmediatePropagation();
					if(docDrag && !touchDrag){return;}
					if(draggable){
						runningTime=_getTime();
						var offset=mCustomScrollBox.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left,
							easing="mcsLinearOut";
						touchMoveY.push(y);
						touchMoveX.push(x);
						touchIntent[2]=Math.abs(_coordinates(e)[0]-touchIntent[0]); touchIntent[3]=Math.abs(_coordinates(e)[1]-touchIntent[1]);
						if(d.overflowed[0]){
							var limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
								prevent=((dragY-y)>0 && (y-dragY)>-(limit*d.scrollRatio.y) && (touchIntent[3]*2<touchIntent[2] || o.axis==="yx"));
						}
						if(d.overflowed[1]){
							var limitX=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
								preventX=((dragX-x)>0 && (x-dragX)>-(limitX*d.scrollRatio.x) && (touchIntent[2]*2<touchIntent[3] || o.axis==="yx"));
						}
						if(prevent || preventX){ /* prevent native document scrolling */
							if(!touchAction){e.preventDefault();} 
							touchDrag=1;
						}else{
							docDrag=1;
							$this.addClass("mCS_touch_action");
						}
						if(touchAction){e.preventDefault();} 
						amount=o.axis==="yx" ? [(dragY-y),(dragX-x)] : o.axis==="x" ? [null,(dragX-x)] : [(dragY-y),null];
						mCSB_container[0].idleTimer=250;
						if(d.overflowed[0]){_drag(amount[0],durA,easing,"y","all",true);}
						if(d.overflowed[1]){_drag(amount[1],durA,easing,"x",overwrite,true);}
					}
				}
				function _onTouchstart2(e){
					if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){touchable=0; return;}
					touchable=1;
					e.stopImmediatePropagation();
					_stop($this);
					startTime=_getTime();
					var offset=mCustomScrollBox.offset();
					touchStartY=_coordinates(e)[0]-offset.top;
					touchStartX=_coordinates(e)[1]-offset.left;
					touchMoveY=[]; touchMoveX=[];
				}
				function _onTouchend(e){
					if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){return;}
					draggable=0;
					e.stopImmediatePropagation();
					touchDrag=0; docDrag=0;
					endTime=_getTime();
					var offset=mCustomScrollBox.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
					if((endTime-runningTime)>30){return;}
					speed=1000/(endTime-startTime);
					var easing="mcsEaseOut",slow=speed<2.5,
						diff=slow ? [touchMoveY[touchMoveY.length-2],touchMoveX[touchMoveX.length-2]] : [0,0];
					distance=slow ? [(y-diff[0]),(x-diff[1])] : [y-touchStartY,x-touchStartX];
					var absDistance=[Math.abs(distance[0]),Math.abs(distance[1])];
					speed=slow ? [Math.abs(distance[0]/4),Math.abs(distance[1]/4)] : [speed,speed];
					var a=[
						Math.abs(mCSB_container[0].offsetTop)-(distance[0]*_m((absDistance[0]/speed[0]),speed[0])),
						Math.abs(mCSB_container[0].offsetLeft)-(distance[1]*_m((absDistance[1]/speed[1]),speed[1]))
					];
					amount=o.axis==="yx" ? [a[0],a[1]] : o.axis==="x" ? [null,a[1]] : [a[0],null];
					durB=[(absDistance[0]*4)+o.scrollInertia,(absDistance[1]*4)+o.scrollInertia];
					var md=parseInt(o.contentTouchScroll) || 0; /* absolute minimum distance required */
					amount[0]=absDistance[0]>md ? amount[0] : 0;
					amount[1]=absDistance[1]>md ? amount[1] : 0;
					if(d.overflowed[0]){_drag(amount[0],durB[0],easing,"y",overwrite,false);}
					if(d.overflowed[1]){_drag(amount[1],durB[1],easing,"x",overwrite,false);}
				}
				function _m(ds,s){
					var r=[s*1.5,s*2,s/1.5,s/2];
					if(ds>90){
						return s>4 ? r[0] : r[3];
					}else if(ds>60){
						return s>3 ? r[3] : r[2];
					}else if(ds>30){
						return s>8 ? r[1] : s>6 ? r[0] : s>4 ? s : r[2];
					}else{
						return s>8 ? s : r[3];
					}
				}
				function _drag(amount,dur,easing,dir,overwrite,drag){
					if(!amount){return;}
					_scrollTo($this,amount.toString(),{dur:dur,scrollEasing:easing,dir:dir,overwrite:overwrite,drag:drag});
				}
			},
			/* -------------------- */
			
			
			/* 
			SELECT TEXT EVENTS 
			scrolls content when text is selected 
			*/
			_selectable=function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
					namespace=pluginPfx+"_"+d.idx,
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					wrapper=mCSB_container.parent(),
					action;
				mCSB_container.bind("mousedown."+namespace,function(e){
					if(touchable){return;}
					if(!action){action=1; touchActive=true;}
				}).add(document).bind("mousemove."+namespace,function(e){
					if(!touchable && action && _sel()){
						var offset=mCSB_container.offset(),
							y=_coordinates(e)[0]-offset.top+mCSB_container[0].offsetTop,x=_coordinates(e)[1]-offset.left+mCSB_container[0].offsetLeft;
						if(y>0 && y<wrapper.height() && x>0 && x<wrapper.width()){
							if(seq.step){_seq("off",null,"stepped");}
						}else{
							if(o.axis!=="x" && d.overflowed[0]){
								if(y<0){
									_seq("on",38);
								}else if(y>wrapper.height()){
									_seq("on",40);
								}
							}
							if(o.axis!=="y" && d.overflowed[1]){
								if(x<0){
									_seq("on",37);
								}else if(x>wrapper.width()){
									_seq("on",39);
								}
							}
						}
					}
				}).bind("mouseup."+namespace+" dragend."+namespace,function(e){
					if(touchable){return;}
					if(action){action=0; _seq("off",null);}
					touchActive=false;
				});
				function _sel(){
					return 	window.getSelection ? window.getSelection().toString() : 
							document.selection && document.selection.type!="Control" ? document.selection.createRange().text : 0;
				}
				function _seq(a,c,s){
					seq.type=s && action ? "stepped" : "stepless";
					seq.scrollAmount=10;
					_sequentialScroll($this,a,c,"mcsLinearOut",s ? 60 : null);
				}
			},
			/* -------------------- */
			
			
			/* 
			MOUSE WHEEL EVENT
			scrolls content via mouse-wheel 
			via mouse-wheel plugin (https://github.com/brandonaaron/jquery-mousewheel)
			*/
			_mousewheel=function(){
				if(!$(this).data(pluginPfx)){return;} /* Check if the scrollbar is ready to use mousewheel events (issue: #185) */
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					namespace=pluginPfx+"_"+d.idx,
					mCustomScrollBox=$("#mCSB_"+d.idx),
					mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
					iframe=$("#mCSB_"+d.idx+"_container").find("iframe");
				if(iframe.length){
					iframe.each(function(){
						$(this).bind("load",function(){
							/* bind events on accessible iframes */
							if(_canAccessIFrame(this)){
								$(this.contentDocument || this.contentWindow.document).bind("mousewheel."+namespace,function(e,delta){
									_onMousewheel(e,delta);
								});
							}
						});
					});
				}
				mCustomScrollBox.bind("mousewheel."+namespace,function(e,delta){
					_onMousewheel(e,delta);
				});
				function _onMousewheel(e,delta){
					_stop($this);
					if(_disableMousewheel($this,e.target)){return;} /* disables mouse-wheel when hovering specific elements */
					var deltaFactor=o.mouseWheel.deltaFactor!=="auto" ? parseInt(o.mouseWheel.deltaFactor) : (oldIE && e.deltaFactor<100) ? 100 : e.deltaFactor || 100,
						dur=o.scrollInertia;
					if(o.axis==="x" || o.mouseWheel.axis==="x"){
						var dir="x",
							px=[Math.round(deltaFactor*d.scrollRatio.x),parseInt(o.mouseWheel.scrollAmount)],
							amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.width() ? mCustomScrollBox.width()*0.9 : px[0],
							contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetLeft),
							draggerPos=mCSB_dragger[1][0].offsetLeft,
							limit=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
							dlt=o.mouseWheel.axis==="y" ? (e.deltaY || delta) : e.deltaX;
					}else{
						var dir="y",
							px=[Math.round(deltaFactor*d.scrollRatio.y),parseInt(o.mouseWheel.scrollAmount)],
							amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.height() ? mCustomScrollBox.height()*0.9 : px[0],
							contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetTop),
							draggerPos=mCSB_dragger[0][0].offsetTop,
							limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
							dlt=e.deltaY || delta;
					}
					if((dir==="y" && !d.overflowed[0]) || (dir==="x" && !d.overflowed[1])){return;}
					if(o.mouseWheel.invert || e.webkitDirectionInvertedFromDevice){dlt=-dlt;}
					if(o.mouseWheel.normalizeDelta){dlt=dlt<0 ? -1 : 1;}
					if((dlt>0 && draggerPos!==0) || (dlt<0 && draggerPos!==limit) || o.mouseWheel.preventDefault){
						e.stopImmediatePropagation();
						e.preventDefault();
					}
					if(e.deltaFactor<5 && !o.mouseWheel.normalizeDelta){
						//very low deltaFactor values mean some kind of delta acceleration (e.g. osx trackpad), so adjusting scrolling accordingly
						amount=e.deltaFactor; dur=17;
					}
					_scrollTo($this,(contentPos-(dlt*amount)).toString(),{dir:dir,dur:dur});
				}
			},
			/* -------------------- */
			
			
			/* checks if iframe can be accessed */
			_canAccessIFrameCache=new Object(),
			_canAccessIFrame=function(iframe){
			    var result=false,cacheKey=false,html=null;
			    if(iframe===undefined){
					cacheKey="#empty";
			    }else if($(iframe).attr("id")!==undefined){
					cacheKey=$(iframe).attr("id");
			    }
				if(cacheKey!==false && _canAccessIFrameCache[cacheKey]!==undefined){
					return _canAccessIFrameCache[cacheKey];
				}
				if(!iframe){
					try{
						var doc=top.document;
						html=doc.body.innerHTML;
					}catch(err){/* do nothing */}
					result=(html!==null);
				}else{
					try{
						var doc=iframe.contentDocument || iframe.contentWindow.document;
						html=doc.body.innerHTML;
					}catch(err){/* do nothing */}
					result=(html!==null);
				}
				if(cacheKey!==false){_canAccessIFrameCache[cacheKey]=result;}
				return result;
			},
			/* -------------------- */
			
			
			/* switches iframe's pointer-events property (drag, mousewheel etc. over cross-domain iframes) */
			_iframe=function(evt){
				var el=this.find("iframe");
				if(!el.length){return;} /* check if content contains iframes */
				var val=!evt ? "none" : "auto";
				el.css("pointer-events",val); /* for IE11, iframe's display property should not be "block" */
			},
			/* -------------------- */
			
			
			/* disables mouse-wheel when hovering specific elements like select, datalist etc. */
			_disableMousewheel=function(el,target){
				var tag=target.nodeName.toLowerCase(),
					tags=el.data(pluginPfx).opt.mouseWheel.disableOver,
					/* elements that require focus */
					focusTags=["select","textarea"];
				return $.inArray(tag,tags) > -1 && !($.inArray(tag,focusTags) > -1 && !$(target).is(":focus"));
			},
			/* -------------------- */
			
			
			/* 
			DRAGGER RAIL CLICK EVENT
			scrolls content via dragger rail 
			*/
			_draggerRail=function(){
				var $this=$(this),d=$this.data(pluginPfx),
					namespace=pluginPfx+"_"+d.idx,
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					wrapper=mCSB_container.parent(),
					mCSB_draggerContainer=$(".mCSB_"+d.idx+"_scrollbar ."+classes[12]),
					clickable;
				mCSB_draggerContainer.bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
					touchActive=true;
					if(!$(e.target).hasClass("mCSB_dragger")){clickable=1;}
				}).bind("touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
					touchActive=false;
				}).bind("click."+namespace,function(e){
					if(!clickable){return;}
					clickable=0;
					if($(e.target).hasClass(classes[12]) || $(e.target).hasClass("mCSB_draggerRail")){
						_stop($this);
						var el=$(this),mCSB_dragger=el.find(".mCSB_dragger");
						if(el.parent(".mCSB_scrollTools_horizontal").length>0){
							if(!d.overflowed[1]){return;}
							var dir="x",
								clickDir=e.pageX>mCSB_dragger.offset().left ? -1 : 1,
								to=Math.abs(mCSB_container[0].offsetLeft)-(clickDir*(wrapper.width()*0.9));
						}else{
							if(!d.overflowed[0]){return;}
							var dir="y",
								clickDir=e.pageY>mCSB_dragger.offset().top ? -1 : 1,
								to=Math.abs(mCSB_container[0].offsetTop)-(clickDir*(wrapper.height()*0.9));
						}
						_scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
					}
				});
			},
			/* -------------------- */
			
			
			/* 
			FOCUS EVENT
			scrolls content via element focus (e.g. clicking an input, pressing TAB key etc.)
			*/
			_focus=function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					namespace=pluginPfx+"_"+d.idx,
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					wrapper=mCSB_container.parent();
				mCSB_container.bind("focusin."+namespace,function(e){
					var el=$(document.activeElement),
						nested=mCSB_container.find(".mCustomScrollBox").length,
						dur=0;
					if(!el.is(o.advanced.autoScrollOnFocus)){return;}
					_stop($this);
					clearTimeout($this[0]._focusTimeout);
					$this[0]._focusTimer=nested ? (dur+17)*nested : 0;
					$this[0]._focusTimeout=setTimeout(function(){
						var	to=[_childPos(el)[0],_childPos(el)[1]],
							contentPos=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft],
							isVisible=[
								(contentPos[0]+to[0]>=0 && contentPos[0]+to[0]<wrapper.height()-el.outerHeight(false)),
								(contentPos[1]+to[1]>=0 && contentPos[0]+to[1]<wrapper.width()-el.outerWidth(false))
							],
							overwrite=(o.axis==="yx" && !isVisible[0] && !isVisible[1]) ? "none" : "all";
						if(o.axis!=="x" && !isVisible[0]){
							_scrollTo($this,to[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
						}
						if(o.axis!=="y" && !isVisible[1]){
							_scrollTo($this,to[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
						}
					},$this[0]._focusTimer);
				});
			},
			/* -------------------- */
			
			
			/* sets content wrapper scrollTop/scrollLeft always to 0 */
			_wrapperScroll=function(){
				var $this=$(this),d=$this.data(pluginPfx),
					namespace=pluginPfx+"_"+d.idx,
					wrapper=$("#mCSB_"+d.idx+"_container").parent();
				wrapper.bind("scroll."+namespace,function(e){
					if(wrapper.scrollTop()!==0 || wrapper.scrollLeft()!==0){
						$(".mCSB_"+d.idx+"_scrollbar").css("visibility","hidden"); /* hide scrollbar(s) */
					}
				});
			},
			/* -------------------- */
			
			
			/* 
			BUTTONS EVENTS
			scrolls content via up, down, left and right buttons 
			*/
			_buttons=function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
					namespace=pluginPfx+"_"+d.idx,
					sel=".mCSB_"+d.idx+"_scrollbar",
					btn=$(sel+">a");
				btn.bind("contextmenu."+namespace,function(e){
					e.preventDefault(); //prevent right click
				}).bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace+" mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace+" mouseout."+namespace+" pointerout."+namespace+" MSPointerOut."+namespace+" click."+namespace,function(e){
					e.preventDefault();
					if(!_mouseBtnLeft(e)){return;} /* left mouse button only */
					var btnClass=$(this).attr("class");
					seq.type=o.scrollButtons.scrollType;
					switch(e.type){
						case "mousedown": case "touchstart": case "pointerdown": case "MSPointerDown":
							if(seq.type==="stepped"){return;}
							touchActive=true;
							d.tweenRunning=false;
							_seq("on",btnClass);
							break;
						case "mouseup": case "touchend": case "pointerup": case "MSPointerUp":
						case "mouseout": case "pointerout": case "MSPointerOut":
							if(seq.type==="stepped"){return;}
							touchActive=false;
							if(seq.dir){_seq("off",btnClass);}
							break;
						case "click":
							if(seq.type!=="stepped" || d.tweenRunning){return;}
							_seq("on",btnClass);
							break;
					}
					function _seq(a,c){
						seq.scrollAmount=o.scrollButtons.scrollAmount;
						_sequentialScroll($this,a,c);
					}
				});
			},
			/* -------------------- */
			
			
			/* 
			KEYBOARD EVENTS
			scrolls content via keyboard 
			Keys: up arrow, down arrow, left arrow, right arrow, PgUp, PgDn, Home, End
			*/
			_keyboard=function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
					namespace=pluginPfx+"_"+d.idx,
					mCustomScrollBox=$("#mCSB_"+d.idx),
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					wrapper=mCSB_container.parent(),
					editables="input,textarea,select,datalist,keygen,[contenteditable='true']",
					iframe=mCSB_container.find("iframe"),
					events=["blur."+namespace+" keydown."+namespace+" keyup."+namespace];
				if(iframe.length){
					iframe.each(function(){
						$(this).bind("load",function(){
							/* bind events on accessible iframes */
							if(_canAccessIFrame(this)){
								$(this.contentDocument || this.contentWindow.document).bind(events[0],function(e){
									_onKeyboard(e);
								});
							}
						});
					});
				}
				mCustomScrollBox.attr("tabindex","0").bind(events[0],function(e){
					_onKeyboard(e);
				});
				function _onKeyboard(e){
					switch(e.type){
						case "blur":
							if(d.tweenRunning && seq.dir){_seq("off",null);}
							break;
						case "keydown": case "keyup":
							var code=e.keyCode ? e.keyCode : e.which,action="on";
							if((o.axis!=="x" && (code===38 || code===40)) || (o.axis!=="y" && (code===37 || code===39))){
								/* up (38), down (40), left (37), right (39) arrows */
								if(((code===38 || code===40) && !d.overflowed[0]) || ((code===37 || code===39) && !d.overflowed[1])){return;}
								if(e.type==="keyup"){action="off";}
								if(!$(document.activeElement).is(editables)){
									e.preventDefault();
									e.stopImmediatePropagation();
									_seq(action,code);
								}
							}else if(code===33 || code===34){
								/* PgUp (33), PgDn (34) */
								if(d.overflowed[0] || d.overflowed[1]){
									e.preventDefault();
									e.stopImmediatePropagation();
								}
								if(e.type==="keyup"){
									_stop($this);
									var keyboardDir=code===34 ? -1 : 1;
									if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
										var dir="x",to=Math.abs(mCSB_container[0].offsetLeft)-(keyboardDir*(wrapper.width()*0.9));
									}else{
										var dir="y",to=Math.abs(mCSB_container[0].offsetTop)-(keyboardDir*(wrapper.height()*0.9));
									}
									_scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
								}
							}else if(code===35 || code===36){
								/* End (35), Home (36) */
								if(!$(document.activeElement).is(editables)){
									if(d.overflowed[0] || d.overflowed[1]){
										e.preventDefault();
										e.stopImmediatePropagation();
									}
									if(e.type==="keyup"){
										if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
											var dir="x",to=code===35 ? Math.abs(wrapper.width()-mCSB_container.outerWidth(false)) : 0;
										}else{
											var dir="y",to=code===35 ? Math.abs(wrapper.height()-mCSB_container.outerHeight(false)) : 0;
										}
										_scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
									}
								}
							}
							break;
					}
					function _seq(a,c){
						seq.type=o.keyboard.scrollType;
						seq.scrollAmount=o.keyboard.scrollAmount;
						if(seq.type==="stepped" && d.tweenRunning){return;}
						_sequentialScroll($this,a,c);
					}
				}
			},
			/* -------------------- */
			
			
			/* scrolls content sequentially (used when scrolling via buttons, keyboard arrows etc.) */
			_sequentialScroll=function(el,action,trigger,e,s){
				var d=el.data(pluginPfx),o=d.opt,seq=d.sequential,
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					once=seq.type==="stepped" ? true : false,
					steplessSpeed=o.scrollInertia < 26 ? 26 : o.scrollInertia, /* 26/1.5=17 */
					steppedSpeed=o.scrollInertia < 1 ? 17 : o.scrollInertia;
				switch(action){
					case "on":
						seq.dir=[
							(trigger===classes[16] || trigger===classes[15] || trigger===39 || trigger===37 ? "x" : "y"),
							(trigger===classes[13] || trigger===classes[15] || trigger===38 || trigger===37 ? -1 : 1)
						];
						_stop(el);
						if(_isNumeric(trigger) && seq.type==="stepped"){return;}
						_on(once);
						break;
					case "off":
						_off();
						if(once || (d.tweenRunning && seq.dir)){
							_on(true);
						}
						break;
				}
				
				/* starts sequence */
				function _on(once){
					if(o.snapAmount){seq.scrollAmount=!(o.snapAmount instanceof Array) ? o.snapAmount : seq.dir[0]==="x" ? o.snapAmount[1] : o.snapAmount[0];} /* scrolling snapping */
					var c=seq.type!=="stepped", /* continuous scrolling */
						t=s ? s : !once ? 1000/60 : c ? steplessSpeed/1.5 : steppedSpeed, /* timer */
						m=!once ? 2.5 : c ? 7.5 : 40, /* multiplier */
						contentPos=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)],
						ratio=[d.scrollRatio.y>10 ? 10 : d.scrollRatio.y,d.scrollRatio.x>10 ? 10 : d.scrollRatio.x],
						amount=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*(ratio[1]*m)) : contentPos[0]+(seq.dir[1]*(ratio[0]*m)),
						px=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*parseInt(seq.scrollAmount)) : contentPos[0]+(seq.dir[1]*parseInt(seq.scrollAmount)),
						to=seq.scrollAmount!=="auto" ? px : amount,
						easing=e ? e : !once ? "mcsLinear" : c ? "mcsLinearOut" : "mcsEaseInOut",
						onComplete=!once ? false : true;
					if(once && t<17){
						to=seq.dir[0]==="x" ? contentPos[1] : contentPos[0];
					}
					_scrollTo(el,to.toString(),{dir:seq.dir[0],scrollEasing:easing,dur:t,onComplete:onComplete});
					if(once){
						seq.dir=false;
						return;
					}
					clearTimeout(seq.step);
					seq.step=setTimeout(function(){
						_on();
					},t);
				}
				/* stops sequence */
				function _off(){
					clearTimeout(seq.step);
					_delete(seq,"step");
					_stop(el);
				}
			},
			/* -------------------- */
			
			
			/* returns a yx array from value */
			_arr=function(val){
				var o=$(this).data(pluginPfx).opt,vals=[];
				if(typeof val==="function"){val=val();} /* check if the value is a single anonymous function */
				/* check if value is object or array, its length and create an array with yx values */
				if(!(val instanceof Array)){ /* object value (e.g. {y:"100",x:"100"}, 100 etc.) */
					vals[0]=val.y ? val.y : val.x || o.axis==="x" ? null : val;
					vals[1]=val.x ? val.x : val.y || o.axis==="y" ? null : val;
				}else{ /* array value (e.g. [100,100]) */
					vals=val.length>1 ? [val[0],val[1]] : o.axis==="x" ? [null,val[0]] : [val[0],null];
				}
				/* check if array values are anonymous functions */
				if(typeof vals[0]==="function"){vals[0]=vals[0]();}
				if(typeof vals[1]==="function"){vals[1]=vals[1]();}
				return vals;
			},
			/* -------------------- */
			
			
			/* translates values (e.g. "top", 100, "100px", "#id") to actual scroll-to positions */
			_to=function(val,dir){
				if(val==null || typeof val=="undefined"){return;}
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					wrapper=mCSB_container.parent(),
					t=typeof val;
				if(!dir){dir=o.axis==="x" ? "x" : "y";}
				var contentLength=dir==="x" ? mCSB_container.outerWidth(false)-wrapper.width() : mCSB_container.outerHeight(false)-wrapper.height(),
					contentPos=dir==="x" ? mCSB_container[0].offsetLeft : mCSB_container[0].offsetTop,
					cssProp=dir==="x" ? "left" : "top";
				switch(t){
					case "function": /* this currently is not used. Consider removing it */
						return val();
						break;
					case "object": /* js/jquery object */
						var obj=val.jquery ? val : $(val);
						if(!obj.length){return;}
						return dir==="x" ? _childPos(obj)[1] : _childPos(obj)[0];
						break;
					case "string": case "number":
						if(_isNumeric(val)){ /* numeric value */
							return Math.abs(val);
						}else if(val.indexOf("%")!==-1){ /* percentage value */
							return Math.abs(contentLength*parseInt(val)/100);
						}else if(val.indexOf("-=")!==-1){ /* decrease value */
							return Math.abs(contentPos-parseInt(val.split("-=")[1]));
						}else if(val.indexOf("+=")!==-1){ /* inrease value */
							var p=(contentPos+parseInt(val.split("+=")[1]));
							return p>=0 ? 0 : Math.abs(p);
						}else if(val.indexOf("px")!==-1 && _isNumeric(val.split("px")[0])){ /* pixels string value (e.g. "100px") */
							return Math.abs(val.split("px")[0]);
						}else{
							if(val==="top" || val==="left"){ /* special strings */
								return 0;
							}else if(val==="bottom"){
								return Math.abs(wrapper.height()-mCSB_container.outerHeight(false));
							}else if(val==="right"){
								return Math.abs(wrapper.width()-mCSB_container.outerWidth(false));
							}else if(val==="first" || val==="last"){
								var obj=mCSB_container.find(":"+val);
								return dir==="x" ? _childPos(obj)[1] : _childPos(obj)[0];
							}else{
								if($(val).length){ /* jquery selector */
									return dir==="x" ? _childPos($(val))[1] : _childPos($(val))[0];
								}else{ /* other values (e.g. "100em") */
									mCSB_container.css(cssProp,val);
									methods.update.call(null,$this[0]);
									return;
								}
							}
						}
						break;
				}
			},
			/* -------------------- */
			
			
			/* calls the update method automatically */
			_autoUpdate=function(rem){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					mCSB_container=$("#mCSB_"+d.idx+"_container");
				if(rem){
					/* 
					removes autoUpdate timer 
					usage: _autoUpdate.call(this,"remove");
					*/
					clearTimeout(mCSB_container[0].autoUpdate);
					_delete(mCSB_container[0],"autoUpdate");
					return;
				}
				upd();
				function upd(){
					clearTimeout(mCSB_container[0].autoUpdate);
					if($this.parents("html").length===0){
						/* check element in dom tree */
						$this=null;
						return;
					}
					mCSB_container[0].autoUpdate=setTimeout(function(){
						/* update on specific selector(s) length and size change */
						if(o.advanced.updateOnSelectorChange){
							d.poll.change.n=sizesSum();
							if(d.poll.change.n!==d.poll.change.o){
								d.poll.change.o=d.poll.change.n;
								doUpd(3);
								return;
							}
						}
						/* update on main element and scrollbar size changes */
						if(o.advanced.updateOnContentResize){
							d.poll.size.n=$this[0].scrollHeight+$this[0].scrollWidth+mCSB_container[0].offsetHeight+$this[0].offsetHeight+$this[0].offsetWidth;
							if(d.poll.size.n!==d.poll.size.o){
								d.poll.size.o=d.poll.size.n;
								doUpd(1);
								return;
							}
						}
						/* update on image load */
						if(o.advanced.updateOnImageLoad){
							if(!(o.advanced.updateOnImageLoad==="auto" && o.axis==="y")){ //by default, it doesn't run on vertical content
								d.poll.img.n=mCSB_container.find("img").length;
								if(d.poll.img.n!==d.poll.img.o){
									d.poll.img.o=d.poll.img.n;
									mCSB_container.find("img").each(function(){
										imgLoader(this);
									});
									return;
								}
							}
						}
						if(o.advanced.updateOnSelectorChange || o.advanced.updateOnContentResize || o.advanced.updateOnImageLoad){upd();}
					},o.advanced.autoUpdateTimeout);
				}
				/* a tiny image loader */
				function imgLoader(el){
					if($(el).hasClass(classes[2])){doUpd(); return;}
					var img=new Image();
					function createDelegate(contextObject,delegateMethod){
						return function(){return delegateMethod.apply(contextObject,arguments);}
					}
					function imgOnLoad(){
						this.onload=null;
						$(el).addClass(classes[2]);
						doUpd(2);
					}
					img.onload=createDelegate(img,imgOnLoad);
					img.src=el.src;
				}
				/* returns the total height and width sum of all elements matching the selector */
				function sizesSum(){
					if(o.advanced.updateOnSelectorChange===true){o.advanced.updateOnSelectorChange="*";}
					var total=0,sel=mCSB_container.find(o.advanced.updateOnSelectorChange);
					if(o.advanced.updateOnSelectorChange && sel.length>0){sel.each(function(){total+=this.offsetHeight+this.offsetWidth;});}
					return total;
				}
				/* calls the update method */
				function doUpd(cb){
					clearTimeout(mCSB_container[0].autoUpdate);
					methods.update.call(null,$this[0],cb);
				}
			},
			/* -------------------- */
			
			
			/* snaps scrolling to a multiple of a pixels number */
			_snapAmount=function(to,amount,offset){
				return (Math.round(to/amount)*amount-offset); 
			},
			/* -------------------- */
			
			
			/* stops content and scrollbar animations */
			_stop=function(el){
				var d=el.data(pluginPfx),
					sel=$("#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal");
				sel.each(function(){
					_stopTween.call(this);
				});
			},
			/* -------------------- */
			
			
			/* 
			ANIMATES CONTENT 
			This is where the actual scrolling happens
			*/
			_scrollTo=function(el,to,options){
				var d=el.data(pluginPfx),o=d.opt,
					defaults={
						trigger:"internal",
						dir:"y",
						scrollEasing:"mcsEaseOut",
						drag:false,
						dur:o.scrollInertia,
						overwrite:"all",
						callbacks:true,
						onStart:true,
						onUpdate:true,
						onComplete:true
					},
					options=$.extend(defaults,options),
					dur=[options.dur,(options.drag ? 0 : options.dur)],
					mCustomScrollBox=$("#mCSB_"+d.idx),
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					wrapper=mCSB_container.parent(),
					totalScrollOffsets=o.callbacks.onTotalScrollOffset ? _arr.call(el,o.callbacks.onTotalScrollOffset) : [0,0],
					totalScrollBackOffsets=o.callbacks.onTotalScrollBackOffset ? _arr.call(el,o.callbacks.onTotalScrollBackOffset) : [0,0];
				d.trigger=options.trigger;
				if(wrapper.scrollTop()!==0 || wrapper.scrollLeft()!==0){ /* always reset scrollTop/Left */
					$(".mCSB_"+d.idx+"_scrollbar").css("visibility","visible");
					wrapper.scrollTop(0).scrollLeft(0);
				}
				if(to==="_resetY" && !d.contentReset.y){
					/* callbacks: onOverflowYNone */
					if(_cb("onOverflowYNone")){o.callbacks.onOverflowYNone.call(el[0]);}
					d.contentReset.y=1;
				}
				if(to==="_resetX" && !d.contentReset.x){
					/* callbacks: onOverflowXNone */
					if(_cb("onOverflowXNone")){o.callbacks.onOverflowXNone.call(el[0]);}
					d.contentReset.x=1;
				}
				if(to==="_resetY" || to==="_resetX"){return;}
				if((d.contentReset.y || !el[0].mcs) && d.overflowed[0]){
					/* callbacks: onOverflowY */
					if(_cb("onOverflowY")){o.callbacks.onOverflowY.call(el[0]);}
					d.contentReset.x=null;
				}
				if((d.contentReset.x || !el[0].mcs) && d.overflowed[1]){
					/* callbacks: onOverflowX */
					if(_cb("onOverflowX")){o.callbacks.onOverflowX.call(el[0]);}
					d.contentReset.x=null;
				}
				if(o.snapAmount){ /* scrolling snapping */
					var snapAmount=!(o.snapAmount instanceof Array) ? o.snapAmount : options.dir==="x" ? o.snapAmount[1] : o.snapAmount[0];
					to=_snapAmount(to,snapAmount,o.snapOffset);
				}
				switch(options.dir){
					case "x":
						var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_horizontal"),
							property="left",
							contentPos=mCSB_container[0].offsetLeft,
							limit=[
								mCustomScrollBox.width()-mCSB_container.outerWidth(false),
								mCSB_dragger.parent().width()-mCSB_dragger.width()
							],
							scrollTo=[to,to===0 ? 0 : (to/d.scrollRatio.x)],
							tso=totalScrollOffsets[1],
							tsbo=totalScrollBackOffsets[1],
							totalScrollOffset=tso>0 ? tso/d.scrollRatio.x : 0,
							totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.x : 0;
						break;
					case "y":
						var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_vertical"),
							property="top",
							contentPos=mCSB_container[0].offsetTop,
							limit=[
								mCustomScrollBox.height()-mCSB_container.outerHeight(false),
								mCSB_dragger.parent().height()-mCSB_dragger.height()
							],
							scrollTo=[to,to===0 ? 0 : (to/d.scrollRatio.y)],
							tso=totalScrollOffsets[0],
							tsbo=totalScrollBackOffsets[0],
							totalScrollOffset=tso>0 ? tso/d.scrollRatio.y : 0,
							totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.y : 0;
						break;
				}
				if(scrollTo[1]<0 || (scrollTo[0]===0 && scrollTo[1]===0)){
					scrollTo=[0,0];
				}else if(scrollTo[1]>=limit[1]){
					scrollTo=[limit[0],limit[1]];
				}else{
					scrollTo[0]=-scrollTo[0];
				}
				if(!el[0].mcs){
					_mcs();  /* init mcs object (once) to make it available before callbacks */
					if(_cb("onInit")){o.callbacks.onInit.call(el[0]);} /* callbacks: onInit */
				}
				clearTimeout(mCSB_container[0].onCompleteTimeout);
				_tweenTo(mCSB_dragger[0],property,Math.round(scrollTo[1]),dur[1],options.scrollEasing);
				if(!d.tweenRunning && ((contentPos===0 && scrollTo[0]>=0) || (contentPos===limit[0] && scrollTo[0]<=limit[0]))){return;}
				_tweenTo(mCSB_container[0],property,Math.round(scrollTo[0]),dur[0],options.scrollEasing,options.overwrite,{
					onStart:function(){
						if(options.callbacks && options.onStart && !d.tweenRunning){
							/* callbacks: onScrollStart */
							if(_cb("onScrollStart")){_mcs(); o.callbacks.onScrollStart.call(el[0]);}
							d.tweenRunning=true;
							_onDragClasses(mCSB_dragger);
							d.cbOffsets=_cbOffsets();
						}
					},onUpdate:function(){
						if(options.callbacks && options.onUpdate){
							/* callbacks: whileScrolling */
							if(_cb("whileScrolling")){_mcs(); o.callbacks.whileScrolling.call(el[0]);}
						}
					},onComplete:function(){
						if(options.callbacks && options.onComplete){
							if(o.axis==="yx"){clearTimeout(mCSB_container[0].onCompleteTimeout);}
							var t=mCSB_container[0].idleTimer || 0;
							mCSB_container[0].onCompleteTimeout=setTimeout(function(){
								/* callbacks: onScroll, onTotalScroll, onTotalScrollBack */
								if(_cb("onScroll")){_mcs(); o.callbacks.onScroll.call(el[0]);}
								if(_cb("onTotalScroll") && scrollTo[1]>=limit[1]-totalScrollOffset && d.cbOffsets[0]){_mcs(); o.callbacks.onTotalScroll.call(el[0]);}
								if(_cb("onTotalScrollBack") && scrollTo[1]<=totalScrollBackOffset && d.cbOffsets[1]){_mcs(); o.callbacks.onTotalScrollBack.call(el[0]);}
								d.tweenRunning=false;
								mCSB_container[0].idleTimer=0;
								_onDragClasses(mCSB_dragger,"hide");
							},t);
						}
					}
				});
				/* checks if callback function exists */
				function _cb(cb){
					return d && o.callbacks[cb] && typeof o.callbacks[cb]==="function";
				}
				/* checks whether callback offsets always trigger */
				function _cbOffsets(){
					return [o.callbacks.alwaysTriggerOffsets || contentPos>=limit[0]+tso,o.callbacks.alwaysTriggerOffsets || contentPos<=-tsbo];
				}
				/* 
				populates object with useful values for the user 
				values: 
					content: this.mcs.content
					content top position: this.mcs.top 
					content left position: this.mcs.left 
					dragger top position: this.mcs.draggerTop 
					dragger left position: this.mcs.draggerLeft 
					scrolling y percentage: this.mcs.topPct 
					scrolling x percentage: this.mcs.leftPct 
					scrolling direction: this.mcs.direction
				*/
				function _mcs(){
					var cp=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft], /* content position */
						dp=[mCSB_dragger[0].offsetTop,mCSB_dragger[0].offsetLeft], /* dragger position */
						cl=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false)], /* content length */
						pl=[mCustomScrollBox.height(),mCustomScrollBox.width()]; /* content parent length */
					el[0].mcs={
						content:mCSB_container, /* original content wrapper as jquery object */
						top:cp[0],left:cp[1],draggerTop:dp[0],draggerLeft:dp[1],
						topPct:Math.round((100*Math.abs(cp[0]))/(Math.abs(cl[0])-pl[0])),leftPct:Math.round((100*Math.abs(cp[1]))/(Math.abs(cl[1])-pl[1])),
						direction:options.dir
					};
					/* 
					this refers to the original element containing the scrollbar(s)
					usage: this.mcs.top, this.mcs.leftPct etc. 
					*/
				}
			},
			/* -------------------- */
			
			
			/* 
			CUSTOM JAVASCRIPT ANIMATION TWEEN 
			Lighter and faster than jquery animate() and css transitions 
			Animates top/left properties and includes easings 
			*/
			_tweenTo=function(el,prop,to,duration,easing,overwrite,callbacks){
				if(!el._mTween){el._mTween={top:{},left:{}};}
				var callbacks=callbacks || {},
					onStart=callbacks.onStart || function(){},onUpdate=callbacks.onUpdate || function(){},onComplete=callbacks.onComplete || function(){},
					startTime=_getTime(),_delay,progress=0,from=el.offsetTop,elStyle=el.style,_request,tobj=el._mTween[prop];
				if(prop==="left"){from=el.offsetLeft;}
				var diff=to-from;
				tobj.stop=0;
				if(overwrite!=="none"){_cancelTween();}
				_startTween();
				function _step(){
					if(tobj.stop){return;}
					if(!progress){onStart.call();}
					progress=_getTime()-startTime;
					_tween();
					if(progress>=tobj.time){
						tobj.time=(progress>tobj.time) ? progress+_delay-(progress-tobj.time) : progress+_delay-1;
						if(tobj.time<progress+1){tobj.time=progress+1;}
					}
					if(tobj.time<duration){tobj.id=_request(_step);}else{onComplete.call();}
				}
				function _tween(){
					if(duration>0){
						tobj.currVal=_ease(tobj.time,from,diff,duration,easing);
						elStyle[prop]=Math.round(tobj.currVal)+"px";
					}else{
						elStyle[prop]=to+"px";
					}
					onUpdate.call();
				}
				function _startTween(){
					_delay=1000/60;
					tobj.time=progress+_delay;
					_request=(!window.requestAnimationFrame) ? function(f){_tween(); return setTimeout(f,0.01);} : window.requestAnimationFrame;
					tobj.id=_request(_step);
				}
				function _cancelTween(){
					if(tobj.id==null){return;}
					if(!window.requestAnimationFrame){clearTimeout(tobj.id);
					}else{window.cancelAnimationFrame(tobj.id);}
					tobj.id=null;
				}
				function _ease(t,b,c,d,type){
					switch(type){
						case "linear": case "mcsLinear":
							return c*t/d + b;
							break;
						case "mcsLinearOut":
							t/=d; t--; return c * Math.sqrt(1 - t*t) + b;
							break;
						case "easeInOutSmooth":
							t/=d/2;
							if(t<1) return c/2*t*t + b;
							t--;
							return -c/2 * (t*(t-2) - 1) + b;
							break;
						case "easeInOutStrong":
							t/=d/2;
							if(t<1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
							t--;
							return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
							break;
						case "easeInOut": case "mcsEaseInOut":
							t/=d/2;
							if(t<1) return c/2*t*t*t + b;
							t-=2;
							return c/2*(t*t*t + 2) + b;
							break;
						case "easeOutSmooth":
							t/=d; t--;
							return -c * (t*t*t*t - 1) + b;
							break;
						case "easeOutStrong":
							return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
							break;
						case "easeOut": case "mcsEaseOut": default:
							var ts=(t/=d)*t,tc=ts*t;
							return b+c*(0.499999999999997*tc*ts + -2.5*ts*ts + 5.5*tc + -6.5*ts + 4*t);
					}
				}
			},
			/* -------------------- */
			
			
			/* returns current time */
			_getTime=function(){
				if(window.performance && window.performance.now){
					return window.performance.now();
				}else{
					if(window.performance && window.performance.webkitNow){
						return window.performance.webkitNow();
					}else{
						if(Date.now){return Date.now();}else{return new Date().getTime();}
					}
				}
			},
			/* -------------------- */
			
			
			/* stops a tween */
			_stopTween=function(){
				var el=this;
				if(!el._mTween){el._mTween={top:{},left:{}};}
				var props=["top","left"];
				for(var i=0; i<props.length; i++){
					var prop=props[i];
					if(el._mTween[prop].id){
						if(!window.requestAnimationFrame){clearTimeout(el._mTween[prop].id);
						}else{window.cancelAnimationFrame(el._mTween[prop].id);}
						el._mTween[prop].id=null;
						el._mTween[prop].stop=1;
					}
				}
			},
			/* -------------------- */
			
			
			/* deletes a property (avoiding the exception thrown by IE) */
			_delete=function(c,m){
				try{delete c[m];}catch(e){c[m]=null;}
			},
			/* -------------------- */
			
			
			/* detects left mouse button */
			_mouseBtnLeft=function(e){
				return !(e.which && e.which!==1);
			},
			/* -------------------- */
			
			
			/* detects if pointer type event is touch */
			_pointerTouch=function(e){
				var t=e.originalEvent.pointerType;
				return !(t && t!=="touch" && t!==2);
			},
			/* -------------------- */
			
			
			/* checks if value is numeric */
			_isNumeric=function(val){
				return !isNaN(parseFloat(val)) && isFinite(val);
			},
			/* -------------------- */
			
			
			/* returns element position according to content */
			_childPos=function(el){
				var p=el.parents(".mCSB_container");
				return [el.offset().top-p.offset().top,el.offset().left-p.offset().left];
			},
			/* -------------------- */
			
			
			/* checks if browser tab is hidden/inactive via Page Visibility API */
			_isTabHidden=function(){
				var prop=_getHiddenProp();
				if(!prop) return false;
				return document[prop];
				function _getHiddenProp(){
					var pfx=["webkit","moz","ms","o"];
					if("hidden" in document) return "hidden"; //natively supported
					for(var i=0; i<pfx.length; i++){ //prefixed
					    if((pfx[i]+"Hidden") in document) 
					        return pfx[i]+"Hidden";
					}
					return null; //not supported
				}
			};
			/* -------------------- */
			
		
		
		
		
		/* 
		----------------------------------------
		PLUGIN SETUP 
		----------------------------------------
		*/
		
		/* plugin constructor functions */
		$.fn[pluginNS]=function(method){ /* usage: $(selector).mCustomScrollbar(); */
			if(methods[method]){
				return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
			}else if(typeof method==="object" || !method){
				return methods.init.apply(this,arguments);
			}else{
				$.error("Method "+method+" does not exist");
			}
		};
		$[pluginNS]=function(method){ /* usage: $.mCustomScrollbar(); */
			if(methods[method]){
				return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
			}else if(typeof method==="object" || !method){
				return methods.init.apply(this,arguments);
			}else{
				$.error("Method "+method+" does not exist");
			}
		};
		
		/* 
		allow setting plugin default options. 
		usage: $.mCustomScrollbar.defaults.scrollInertia=500; 
		to apply any changed default options on default selectors (below), use inside document ready fn 
		e.g.: $(document).ready(function(){ $.mCustomScrollbar.defaults.scrollInertia=500; });
		*/
		$[pluginNS].defaults=defaults;
		
		/* 
		add window object (window.mCustomScrollbar) 
		usage: if(window.mCustomScrollbar){console.log("custom scrollbar plugin loaded");}
		*/
		window[pluginNS]=true;
		
		$(window).bind("load",function(){
			
			$(defaultSelector)[pluginNS](); /* add scrollbars automatically on default selector */
			
			/* extend jQuery expressions */
			$.extend($.expr[":"],{
				/* checks if element is within scrollable viewport */
				mcsInView:$.expr[":"].mcsInView || function(el){
					var $el=$(el),content=$el.parents(".mCSB_container"),wrapper,cPos;
					if(!content.length){return;}
					wrapper=content.parent();
					cPos=[content[0].offsetTop,content[0].offsetLeft];
					return 	cPos[0]+_childPos($el)[0]>=0 && cPos[0]+_childPos($el)[0]<wrapper.height()-$el.outerHeight(false) && 
							cPos[1]+_childPos($el)[1]>=0 && cPos[1]+_childPos($el)[1]<wrapper.width()-$el.outerWidth(false);
				},
				/* checks if element or part of element is in view of scrollable viewport */
				mcsInSight:$.expr[":"].mcsInSight || function(el,i,m){
					var $el=$(el),elD,content=$el.parents(".mCSB_container"),wrapperView,pos,wrapperViewPct,
						pctVals=m[3]==="exact" ? [[1,0],[1,0]] : [[0.9,0.1],[0.6,0.4]];
					if(!content.length){return;}
					elD=[$el.outerHeight(false),$el.outerWidth(false)];
					pos=[content[0].offsetTop+_childPos($el)[0],content[0].offsetLeft+_childPos($el)[1]];
					wrapperView=[content.parent()[0].offsetHeight,content.parent()[0].offsetWidth];
					wrapperViewPct=[elD[0]<wrapperView[0] ? pctVals[0] : pctVals[1],elD[1]<wrapperView[1] ? pctVals[0] : pctVals[1]];
					return 	pos[0]-(wrapperView[0]*wrapperViewPct[0][0])<0 && pos[0]+elD[0]-(wrapperView[0]*wrapperViewPct[0][1])>=0 && 
							pos[1]-(wrapperView[1]*wrapperViewPct[1][0])<0 && pos[1]+elD[1]-(wrapperView[1]*wrapperViewPct[1][1])>=0;
				},
				/* checks if element is overflowed having visible scrollbar(s) */
				mcsOverflow:$.expr[":"].mcsOverflow || function(el){
					var d=$(el).data(pluginPfx);
					if(!d){return;}
					return d.overflowed[0] || d.overflowed[1];
				}
			});
		
		});
	
	}))}));
	/*
	     _ _      _       _
	 ___| (_) ___| | __  (_)___
	/ __| | |/ __| |/ /  | / __|
	\__ \ | | (__|   < _ | \__ \
	|___/_|_|\___|_|\_(_)/ |___/
	                   |__/
	
	 Version: 1.6.0
	  Author: Ken Wheeler
	 Website: http://kenwheeler.github.io
	    Docs: http://kenwheeler.github.io/slick
	    Repo: http://github.com/kenwheeler/slick
	  Issues: http://github.com/kenwheeler/slick/issues
	
	 */
	!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
	d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
	$(document).ready(function(){
	
		/* меняем скрол */
		$('.tab-panel').mCustomScrollbar();
	
		/*вешаем аттрибуты на табы*/
		function addAttr(){
			var index = 1;
			var index2 = 1;
	
			$('.tab-item').each(function(){
				$(this).attr('data-num', index);
				index++;
			});
	
			$('.tab-item-content').each(function(){
				$(this).attr('data-num', index2);
				index2++;
			});
		}
		addAttr();
	
		/* переключаем табы */
		$('.tab-item').on('click', function(){
			/* активный таб */
			$('.tab-item').removeClass('active');
			$(this).addClass('active');
	
			$('.tab-item-content').removeClass('active');
	
			var attr = $(this).attr('data-num');
			$('.tab-item-content[data-num ='+attr+']').addClass('active');		
		});
	
		/* Слайдер блок с ценой */
		$('.slider-cost').slick({
	    	fade: true,
	    	dots: true,
	    	infinite: true,
	    	cssEase: 'linear',
	    	appendArrows: $('.navigation'),
	    	appendDots: $('.navigation'),
	    	prevArrow: '<div class="prev"></div>',
	    	nextArrow: '<div class="next"></div>',
	  	});
	
	  	/* переносим кнопку next в конец */
	  	$('.navigation .next').appendTo('.navigation');
	
	  	$('.navigation button').html('');
	
	  	/* поп-ап с видео */
	
	  	$('.you-tube-icon').on('click', function(){
	  		$('.pop-up-wrapp, .pop-up').css('display', 'block');
	  	});
	
	  	$('.pop-up-wrapp, .close').on('click', function(){
	  		$('.pop-up-wrapp, .pop-up').css('display', 'none');
	
	  		/* перезагружаем iframe при закрытии поп-ап */
			var iframe = document.getElementById('iframe');
			iframe.src = iframe.src;
	
	  	});
	
	});
	$('.lang-link-active').click(function(){
		$('.lang-link').toggleClass('lang-link-dropdown');
		return false;
	})
});