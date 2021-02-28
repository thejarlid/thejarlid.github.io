
'use strict';

(function() {

	var
		urlorigin = "",//location.href.match(/(https:\/\/[^\/]+)/)[1],

		apptitle = document.title.indexOf('|') != -1 ? document.title.split('| ')[1] : document.title,

		$html = $(document.documentElement),
		$body = $(document.body),

		$apptitle = $('title'),
		$wrap = $('#wrap'),

		$listbox = $('#list'),
		$viewbox = $('#view'),

		datas = [],

		mode = 'list',

		regviewid = /\/([a-z0-9-_]+)\/?$/,

		listcontrol,
		viewcontrol,
		blocker,

		areawidth = 0,
		areaheight = 0,

		currentindex = 0,

		hoverable = false,
		pageloaded = false;


	if ((/iphone|ipad|android/i).test(navigator.userAgent)) {
		$html.addClass('touchbased');
	} else {
		hoverable = true;
		$html.addClass('hoverable');
		if ((/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i).test(navigator.userAgent)) {
			$html.addClass('ie');
		}
	}

	$(window).resize(resize).load(function() {
		pageloaded = true;
	});

	resize();


	listcontrol = (function() {

		var
			$list = $listbox.find('ul:first'),  // set to the unordered list DOM inside the list object

			$items = [],
			$links = [],
			$thumbnail_files = ["\"img/thumbnail_meraki.png\"", "\"img/thumbnail_xv6.png\"", "\"img/thumbnail_pgctrl.png\"", "\"img/thumbnail_xkVISOR.png\"",
								"\"img/thumbnail_imglib.png\"", "\"img/thumbnail_videoStabilizer.png\"", "\"img/thumbnail_hololens.png\"",
                "\"img/thumbnail_citrus.png\""],
			$thumbs = [],

			$title = $listbox.find('h5'),
			$scroller = $({x: 0}),
			scroller = null,

			sidepadding = 0,
			itemwidth = 120,
			itempadding = 15,
			focusgap = 30,

			centerindex = -1,
			titleindex = -1,

			holdsnap = false,
			issizing = false,
			reduced = false,

			triggered = false,

			numitems;

		console.log("hello");


		itemwidth = itemwidth+itempadding*2;
		sidepadding = areawidth/2-itemwidth/2;
		$list.find('> li').each(function(i) {

			$items[i] = $(this);
			$links[i] = $(this.children[0]).attr('data-index', i)
				// .mouseenter(hover).mouseleave(leave)
				.click(show);

			// extract datas
			datas[i] = {
				id: i,
				root: $links[i].attr('href'),
				title: $links[i][0].children[0].innerHTML,
				color: $items[i].attr('data-color')
			};

			$thumbs[i] = $('<span class="thumb"><img src=' + $thumbnail_files[i] + 'alt=""></span>')
				.insertBefore($links[i][0].children[0]).children();

		});

		numitems = $items.length;

		setlistsize();

		$list._move({
				direction: 'x',
				onmove: function(e) {
					focusitem(e);
				},
				onreset: function(e) {
					!issizing && focusitem(e);
				},
				snap: [function(v) {
					return holdsnap ? v : Math.round(v/itemwidth)*itemwidth;
				}],
				scroll: {
					wheelforx: true
				}
			});

		scroller = $list.data('_move');

		hoverable && $list.mousedown(function() {
				$html.addClass('grabbing');
			}) && $html.mouseup(function() {
				$html.removeClass('grabbing');
			});


		function setlistsize(_itemwidth) {
			sidepadding = Math.ceil(areawidth/2-(_itemwidth || itemwidth)/2);
			$list.css({
				width: itemwidth*numitems,
				padding: '0 '+ sidepadding +'px'
			});
		}

		function show(e, _triggered) {

			var index = parseInt(this.getAttribute('data-index'));
			if (currentindex == index){
				window.location.href = "" + datas[index].root;
			}
			e.preventDefault();
			blocker.show();

			triggered = _triggered;

			scrolltoitem(index);
			currentindex = centerindex = index;

			return;

		}

		function readytomove() {
			holdsnap = true;
		}

		function moveend() {
			holdsnap = false;
			reduced && viewcontrol.view(currentindex, triggered);
		}

		function scrolltoitem(index) {
			var nowx = itemwidth*centerindex,
				tox = itemwidth*index;
			readytomove();
			$scroller[0].x = nowx;
			$scroller.stop().animate({x: tox}, {duration: Math.min(750, Math.max(450, Math.abs(nowx-tox)*5)), easing: 'easeInOutCubic',
				step: function() {
					scroller.left($scroller[0].x, true);
				},
				complete: moveend
			});
		}


		function expand() {

			if (!reduced) {
				return;
			}

			setpageinfo(apptitle);

			$links[currentindex].removeClass('on');

			readytomove();
			blocker.show();

			issizing = true;

			$listbox.animate({height: areaheight}, {duration: 1100, easing: 'easeInOutQuint',

				step: function(e) {

					var rounding = Math[e.ratio > 0.5 ? 'ceil' : 'floor'],
						size = 50+70*e.ratio,
						i = 0;

					itempadding = 7+8*e.ratio;
					itemwidth = size + itempadding*2;

					setlistsize(rounding(itemwidth));

					for (; i < numitems; i++) {
						$items[i][0].style.width = $items[i][0].style.height = rounding(size) +'px';
						$items[i][0].style.marginTop = -rounding(size)/2 +'px';
					}

					logocontrol.move(0, 15-15*e.ratio);

					$title[0].style.fontSize = rounding(11+2*e.ratio) +'px';
					$title[0].style.marginTop = rounding(20+40*e.ratio) +'px';

					scroller.reset();
					scroller.left(itemwidth*centerindex, true);

					// if scroller onmove event doesn't fire, manually do.
					if (!centerindex) {
						focusitem({x: 0});
					}

				},

				complete: function() {
					mode = 'list';
					$html.removeClass('view');
					issizing = false;
					reduced = false;
					viewcontrol.hide();
					blocker.hide();
					historystate.push('');
					currentindex = -1;
					moveend();
				}

			});

		}

		function settitle(index, withoutanimation, withx) {

			var title, xgap;

			if (!pageloaded || titleindex == index) {
				return;
			}

			title = datas[index].title.toLowerCase();

			if (withoutanimation) {
				$title.html(title);
			} else {
				if (withx) {
					xgap = (index-centerindex)*itemwidth;
					$title.animate({x: !xgap  ? xgap : xgap > 0 ? xgap+focusgap : xgap-focusgap}, {duration: 500, easing: 'easeOutQuart'});
				}
				$title.animate({opacity: 0}, {duration: 100, easing: 'linear', complete: function() {
					$title.html(title).animate({opacity: 1}, {duration: 350, easing: 'linear'});
				}});
			}

			titleindex = index;

		}

		function focusitem(e, withoutanimation) {

			var x = e.x,
				index = Math.max(0, Math.min(numitems-1, Math.round(x/itemwidth))),
				distancebase = itemwidth > 90 ? 3 : 2,
				itemleft, i;

			if (index != centerindex) {
				!issizing && settitle(index, withoutanimation);
				centerindex = index;
			}

			for (i = 0; i < numitems; i++) {
				itemleft = sidepadding+(i+1)*itemwidth;
				if (x > itemleft || itemleft > x+areawidth+itemwidth) {
					$items[i].removeClass('show');
				} else {
					$items[i].addClass('show');
					settranslate($items[i][0], sidepadding + i*itemwidth + itempadding + Math.max(-focusgap, Math.min(focusgap, (x-itemwidth*i)*-1/distancebase)));
				}
			}

		}

		function display() {

			var titledisplayed = false;

			for (var i = 0; i < numitems; i++) {
				if ($items[i].hasClass('show')) {
					$links[i].css({x: areawidth/4, force3D: true})._animate({x: 0, opacity: 1}, {duration: 750, delay: i*85+50, easing: 'easeOutQuart', step: !i ? onshowstepfirstitem : $.noop, complete: !$items[i+1] || !$items[i+1].hasClass('show') ? onshowlastitem : onshow});
					$items[i].animate({opacity: 1}, {duration: 900, delay: i*85+50, easing: 'easeOutQuad'});
				} else {
					$items[i].css({opacity: 1});
				}
			}

			function onshow() {
				this[0].style.cssText = '';
			}

			function onshowstepfirstitem(e) {
				if (!titledisplayed && e.ratio > 0.65) {
					settitle(0);
					titledisplayed = true;
				}
			}

			function onshowlastitem() {
				blocker.hide();
				onshow.call(this);
				historystate.poped();
			}

		}

		function follow(y, duration, easing) {
			$links[centerindex].animate({y: y, force3D: true}, {duration: duration, easing: easing, step: function(e) {
				if (e.ratio > 0.1) {
					$links[currentindex].animate({y: 0}, {duration: 300, easing: 'easeOutQuint'});
				}
			}});
		}

		function givemethumb(index) {
			return $thumbs[index].clone();
		}

		function detail(index) {
			$links[index].trigger('click', true);
		}

		function resize() {
			setlistsize();
			scroller.reset();
			scroller.left(itemwidth*centerindex, true);
		}

		return {
			detail: detail,
			follow: follow,
			givemethumb: givemethumb,
			expand: expand,
			display: display,
			resize: resize
		}

	})();


	viewcontrol = (function() {

		var
			$loader = $('.view-loader'),
			$loaderimg = $loader.children(),

			$cover,
			$coverchidren,

			$coverlayer = $('<div class="cover semi" />'),
			$covercolored = $('<div class="cover semi colored" />'),

			$coverbottom = $('<canvas class="cover bottom" />'),
			coverbottomcontext = $coverbottom[0].getContext('2d'),
			coverbottomheight = 0,

			$detail = $viewbox.find('.detail'),
			$iframe,
			$previframe,

			listheight,
			viewheight,

			covercolor = '#005083',

			loadery,

			step = 0,

			rotationangle = 360*1.5,
			loaded = false;


		function view(index, triggered) {

			mode = 'view';

			setpageinfo(datas[currentindex].title +' | '+ apptitle);

			step = 0;
			loaded = false;

			messagetopage('pause');

			if (!triggered) {
				historystate.push(datas[index].id);
			}

			resize();

			// covercolor = datas[currentindex].color;

			loadery = (areaheight-listheight)/2+listheight-50;

			$loader.empty().css({y: 0, rotation: 0, opacity: 0, visibility: 'visible'})
				.animate({opacity: 1}, {duration: 300, easing: 'easeOutQuint'})
				.animate({y: loadery}, {duration: 900, easing: 'easeInOutQuint', complete: spin});

			$loaderimg = listcontrol.givemethumb(index).appendTo($loader); // change src of image, it occurs short term in mobile

			listcontrol.follow(loadery, 900, 'easeInOutQuint');

		}

		function onviewload() {
			if (loaded) {
				messagetopage('play');
			}
			loaded = true;
		}

		function spin() {


			onspined();

			$coverlayer.animate({scale: (Math.max(areawidth, viewheight)*1.05)/50, force3D: true}, {duration: 750, delay: 150, easing: 'easeInOutQuint'})
				.appendTo($viewbox);
			$covercolored.css({background: datas[currentindex].color})
				.animate({scale: (Math.max(areawidth, viewheight)*1.05)/50, force3D: true}, {duration: 750, delay: 250, easing: 'easeInOutQuint'})
				.appendTo($viewbox);

			$iframe = $('<iframe src="'+ datas[currentindex].root +'" name="layer-iframe" width="100%" height="0" frameborder="0" scrolling="no" allowTransparency="true"></iframe>')
				.css({opacity: 0})
				.load(onviewload)
				.appendTo($viewbox);

		}

		function onspin(e) {
			$loaderimg.css({rotation: -rotationangle*e.ratio});
		}

		function onspined() {
			if (loaded) {

				step = 1;

				$loader.stop().animate({y: loadery+viewheight}, {duration: 1100, step: setcoverbottom, easing: 'easeInOutCubic'});

				$cover = $([
						'<div class="cover">',
							'<div class="inside">',
								'<h6>', datas[currentindex].title, '</h6>',
								'<p>', datas[currentindex].date, '</p>',
							'</div>',
						'</div>'
					].join(''))
					.css({y: -viewheight, background: covercolor, force3D: true})
					.animate({y: 0}, {duration: 1000, easing: 'easeInOutCubic', delay: 250, step: oncovershow, complete: oncovered})
					.appendTo($viewbox);

				$coverchidren = $cover.children().children();

				$coverbottom.removeClass('upper').appendTo($viewbox);
				coverbottomheight = $coverbottom[0].offsetHeight;
				$coverbottom[0].height = coverbottomheight;

			} else {
				$loader.css({rotation: 0}).animate({rotation: rotationangle}, {duration: 1250, easing: 'easeInOutQuart', step: onspin, complete: onspined});
				$loaderimg.css({rotation: 0});
			}
		}

		function setcoverbottom(e) {

			var value = viewheight*0.85,
				y = value-Math.abs((viewheight*e.ratio)-value);

			$coverbottom[0].width = areawidth;
			coverbottomcontext.beginPath();
			coverbottomcontext.moveTo(0, 0);

			if (step == 1) {
				y = Math.min(150, areawidth/10)*y/(value);
				coverbottomcontext.quadraticCurveTo(areawidth/2, y, areawidth, 0);
			} else {
				y = 150*y/(value);
				coverbottomcontext.quadraticCurveTo(areawidth/2, y, areawidth, 0);
				coverbottomcontext.lineTo(areawidth, coverbottomheight);
				coverbottomcontext.lineTo(0, coverbottomheight);
				$coverbottom._css({y: (viewheight+100)*e.ratio, force3D: true});
			}

			coverbottomcontext.fillStyle = covercolor;
			coverbottomcontext.fill();

		}

		function oncovershow(e) {
			// $coverchidren._css({y: -(viewheight*(1-e.ratio))*0.5, opacity: (e.ratio-0.5)/0.5, force3D: true});
			// $coverchidren._css({y: (viewheight*(1-e.ratio))/2, force3D: true});
			$coverchidren.css({y: viewheight*(1-e.ratio), opacity: (e.ratio-0.5)/0.5, force3D: true});
			$coverbottom.css({y: viewheight*e.ratio, force3D: true});
		}

		function oncovered() {

			var delayforread = 1000;

			step = 2;

			$html[datas[currentindex].bright ? 'addClass' : 'removeClass']('bright');
			$viewbox.removeClass('detail').addClass('covered');

			$cover.animate({y: viewheight+100}, {duration: 900, delay: delayforread, easing: 'easeInOutQuart'/*, step: setcoverbottom*/});
			// $coverbottom.addClass('upper');

			$previframe && $previframe.remove();
			$previframe = $iframe.css({opacity: '', top: -viewheight/2, force3D: true})
				.animate({top: 0}, {duration: 900, delay: delayforread+150, easing: 'easeInOutQuart'});

			$covercolored.addClass('fill').css({scale: 1})
				.animate({y: viewheight+50}, {duration: 750, delay: delayforread+450, easing: 'easeOutQuart'});
			$coverlayer.addClass('fill').css({scale: 1})
				.animate({y: viewheight+50}, {duration: 750, delay: delayforread+600, easing: 'easeOutQuart', complete: onuncovered});

		}

		function onuncovered() {
			messagetopage('play');
			$cover.remove();
			$coverlayer.detach().removeClass('fill').css({y: 0});
			$covercolored.detach().removeClass('fill').css({y: 0});
			$coverbottom.detach();
			$loader.css({visibility: 'hidden'});
			blocker.hide();
			historystate.push(datas[currentindex].id);
		}

		function messagetopage(message) {
			$previframe && $previframe[0].contentWindow.postMessage(message, '*');
		}

		function hide() {
			$viewbox.css({visibility: 'hidden'}).removeClass('covered');
			$previframe && $previframe.remove();
			$previframe = null;
		}

		function resize() {
			if (mode == 'view') {
				listheight = $listbox[0].offsetHeight;
				viewheight = areaheight-listheight;
				$viewbox.css({top: listheight, height: viewheight, visibility: 'visible'});
			}
		}

		return {
			view: view,
			hide: hide,
			resize: resize
		}

	})();

	// listcontrol.detail(6);

	blocker = (function() {

		var $box = $('<div class="blocker" />'),
			blocked = false;

		$box.on('touchmove wheel mousedown', function(e) {
			e.preventDefault();
		});
		show();

		function show() {
			blocked = true;
			$box.appendTo($body);
		}

		return {
			show: show,
			hide: function() {
				blocked = false;
				$box.detach();
			},
			blocked: function() {
				return blocked;
			}
		}

	})();

	var historystate = (function() {


		$(window).on({'popstate': poped});

		function push(id) {
			var locationhref = location.href;
			if (id == '' && !new RegExp(urlorigin +'\/?$').test(locationhref)) { // list
				window.history.pushState('', '', '/');
			} else if (id && !new RegExp(id +'\/?$').test(locationhref)) {
				window.history.pushState('', '', '/'+ id +'/');
			}
		}

		function poped() {

			var viewid, key;

			if (!blocker.blocked()) {
				viewid = location.href.match(regviewid);
				if (viewid) {
					viewid = viewid[1];
					for (key in datas) {
						if (datas[key].id == viewid) {
							listcontrol.detail(key);
							break;
						}
					};
				} else {
					mode != 'list' && listcontrol.expand();
				}
			}

		}

		return {push: push, poped: poped}

	})();

	function setpageinfo(title) {
		$apptitle[0].innerHTML = title;
		// $appicon[0].href = appiconurl;
	}


	function resize() {

		areawidth = window.innerWidth;
		areaheight = window.innerHeight;

		$wrap.css('height', areaheight);

		$html[641 > areawidth ? 'addClass' : 'removeClass']('small');

		listcontrol && listcontrol.resize();
		viewcontrol && viewcontrol.resize();

	}

	function settranslate(target, x, y) {
		x = x || 0;
		y = y || 0;
		target.style.WebkitTransform =
		target.style.transform = 'translate3d('+ x +'px, '+ y +'px, 0)';
		target.style.msTransform = 'translate('+ x +'px, '+ y +'px)';
	}

})();
