/*图片预加载 */

(function($){

	function PreLoad(imgs,options){

		this.imgs = (typeof imgs === 'string')? [imgs] : imgs;
		this.opts = $.extend({}, PreLoad.DEFAULTS, options);

		this._unordered();/* 加下划线表示私有方法只在这里内部使用 */
		

	}

	PreLoad.DEFAULTS = {
		each: null,/* 每张图片加载完毕后执行此方法 */
		all: null/* 所有图片加载完毕后执行此方法 */
}
/*把方法都写到原型上 */
	PreLoad.prototype._unordered = function () {
		/*无序加载*/
		var imgs = this.imgs,
		 	opts = this.opts,
		 	count = 0,
		 	len = imgs.length;

	
		$.each(imgs,function (i,src) {
			if(typeof src != "string") return;			

			var imgObj = new Image();
			$(imgObj).on('load error',function () {
				/* $progress.html(Math.round((count + 1)/len * 100) + '%');*/
				opts.each && opts.each(count);/*如果opts.each存在就调用each*/

				if (count >=len - 1) {
					/* $('.loading').hide();
					 document.title = "1/" + len;*/
					opts.all && opts.all();
				}

				count++;
			});

			imgObj.src = src;

		});	
	};

	/* $.fn.extend -> $('#img').preload
	 $.extend   -> $.preload() */
	$.extend({
		preload: function (imgs,opts) {
			new PreLoad (imgs,opts);
		}

	})

})(jQuery);