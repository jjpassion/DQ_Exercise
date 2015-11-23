// fml.define('wap/app/banner',['wap/zepto/touch'] ,function(){
function banner(){
	var outer = $('.banner-slider')  //外层容器
	    
	    //轮播 banner 
		, banner = outer.children('.banner-slider-wrap').children('li') 
		//轮播banner对应的点点
		, point = outer.children('.banner-slider-point').children('li') 
		//banner个数
		, page = banner.length

		// 起点与终点之间的距离 x = touch.pageX - startX 
		, x = 0 
		//X轴方向，x的起始点
		, startX = 0  
		// 占比总宽度的份额% xx = x / outer_width * 100; 
		, xx = 0 

		//? 貌似删了也可以，没用
		// , xp = 0 
		// , xn = 0 //?
		
		//第0个li 中间当前
		, bCurrent = banner.eq(0)  
		, bRight = banner.eq(1)  //第1个li 右边
		, bLeft = banner.eq(-1) //最后一个li 左边

		, index = 0
		, ori = 0

		//li的宽度 outer_width = outer.width()
		, outer_width

		, timerRoll
		, timerInit
		, time_space = 5000  //切换时间


	var touchStart = function(event){
		banner.attr('status', 'move')

		clearTimeout(timerRoll)
		clearTimeout(timerInit)

		event.preventDefault();

		// console.log(event.touches) 
		// TouchList {0: Touch}0: Touchlength: 1__proto__: TouchList
		if (!event.touches.length)
			return;
		var touch = event.touches[0];
		outer_width = outer.width()
		startX = touch.pageX - x;
	};

	var touchMove = function(event){
		event.preventDefault();
		if (!event.touches.length)
			return;
		var touch = event.touches[0];
		x = touch.pageX - startX //移动的距离

		// console.log(touch.pageX,startX,x)
		xx = x / outer_width * 100; 

		// console.log(xx,outer_width)
		// 向左x为负数，ori 为 -1； 向右滑，ori为1；
		x >= 20 ? ori = 1 : (xx <= -20 ? ori = -1 : ori = 0)

		// 这种是什么情况？
		if(xx <= -100 || xx >= 100)
			return;

		// xp = 100 + xx
		// xn = -100 + xx
	}

	var touchEnd = function(event){
		//x 移动的距离，xx距离占整体的大小 为零的时候,区别是否是点击的状态
		if(x == xx){
			console.log(x,xx)
			var href = $(this).attr('ahref')
				,xr = $(this).data('xr') || ''
			if(href){
				if(xr){
					href = window.__get_r(href, xr)
				}
				window.location.href = href;
				return;
			}
		}else{
			x = 0
			startX = 0
			xx = 0
		}

		act()
		timerInit = setTimeout(rollBanner, time_space)	
	}

	var act = function(){
		//向右滑
		if(ori == 1){
			index--;
			if(index < 0){
				index = page - 1
				bRight = banner.eq(0)
			}else{
				bRight = banner.eq(index+1)
			}

			bCurrent = banner.eq(index)
			bLeft = banner.eq(index-1)

			bRight.attr('status', 'drop')
			
		}else if(ori == -1){
			index++;
			if(index > page - 1){
				index = 0
				bRight = banner.eq(1)
			}else if(index > page - 2){
				bRight = banner.eq(0)
			}else{
				bRight = banner.eq(index+1)
			}

			bCurrent = banner.eq(index)
			bLeft = banner.eq(index-1)

			bLeft.attr('status', 'drop')

		}else{
			bRight.attr('status', 'drop')
			bLeft.attr('status', 'drop')
		}

		bCurrent.attr('status', 'drop')

		reset()

	}
	var reset = function(){
		bCurrent.css({'-webkit-transform' : 'translate3d(0%, 0, 0)'})
		bRight.css({'-webkit-transform' : 'translate3d(100%, 0, 0)'})
		bLeft.css({'-webkit-transform' : 'translate3d(-100%, 0, 0)'})

		point.removeClass('curr')

		var poin = point.eq(index) 

		/**
		 * poin [li, selector: Array[1], prevObject: Array[5]]
		 * poin[0] === li
		 * 这个 if 判断是什么情况出现的？
		 */
		if(!poin[0])
			poin = point.eq(index - 2)
		
		poin.addClass('curr')
	}

	var rollBanner = function(){
		ori = -1 
		banner.attr('status', 'move')
		act()
		timerRoll = setTimeout(arguments.callee, time_space)
	}

	var init = function(){
		//初始化每个li的left位置：0%, -100%, -200% ....
		for(var i = 0; i < page; i++){
			banner.eq(i).css({ 'left' : -i * 100 + '%' })	
		}
		banner.css({'-webkit-transform' : 'translate3d(100%, 0, 0)'})

		
		reset() //初始化 第0个，第1个，最后一个li，及小圆点

		banner
			.on("touchstart", touchStart)
			.on("touchmove", touchMove)
			.on("touchend", touchEnd)

		timerInit = setTimeout(rollBanner, time_space)	

	}

	if(banner && banner.length > 1) {
		init()
	}else{
		point.hide()
	}

}

banner()

