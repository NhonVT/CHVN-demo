

//CALENDAR: xét calendar box
function DatePicker() {

	var InputDate = $('#picker01, #picker02');
	$(InputDate).each(function(index, element) {
		var customize = $(element).attr('data-customize') || false;
		
		var currentDate = $(element).attr('data-date') || new Date();
		console.log(currentDate);
		
		//new Date()
		
		$(element).datepicker({showOn:"both", dateFormat: 'dd/mm/yy', changeMonth: customize, changeYear: customize,buttonImage:'./images/icons/calendar-icon.png', buttonImageOnly:true,buttonText: "Select date", showButtonPanel: true,
		beforeShow: function(Open){
		}
		}).datepicker("setDate", currentDate, $.datepicker.regional[ "vi" ]).attr('readonly','readonly');

	});

}

(function() {
	DatePicker();
  
	
	function checkSelectLimit(byThis) {
		return byThis.find('.select-header h3 span').length;
	}
	
	$(document).on('click', '.select-header', function () {
		var box = $(this).parent();
		if (box.hasClass('open')) {
			box.removeClass('open');
		} else {
			$('.select-list').removeClass('open');
			box.addClass('open');
		}
	});
	
	//Check box
	$(document).on('click', '.select-box li', function () {
		var that = $(this);
		var box = $(this).parent().parent().parent();
		
		if(box.hasClass('limited3')) {
			
			target = that.data('target');
			text = that.text();
			
			if(that.hasClass('selected')) {
				box.find('.select-header h3 span[data-select='+ target +']').remove();
				that.removeClass('selected');
				var number = checkSelectLimit(box);
				if(number == 1) {
					box.removeClass('has-item');
				}
			}else {
				var number = checkSelectLimit(box);
				if(number < 4) {
					box.addClass('has-item');
					//var html = '<span data-select='+ target +'>'+ text +'<i class="fas fa-times"></i></span>';
					var html = '<span data-select='+ target +'>'+ text +'</span>';
					box.find('.select-header h3').append(html);
					that.addClass('selected');
				}
			}
			
		}else {
			
			if (!that.hasClass('selected')) {
				box.find('li').removeClass('selected');
				that.addClass('selected');
				box.removeClass('open');
				box.find('.select-header h3').html(that.text());
				target = that.data('target');
			}	
		}
	});
	
	$('.select-list').on('click', 'span:not(.title-default)', function(e){
		e.stopPropagation();
		var that = $(this);
		var target = that.data('select');
		var box = that.parent().parent().parent();
		box.find('li[data-target='+ target +']').removeClass('selected');
		that.remove();
		var number = checkSelectLimit(box);
		if(number == 1) {
			box.removeClass('has-item');
		}
	});
	
	$(document).on('click touchstart', function(event) {
		if ($(".select-list").has(event.target).length == 0 && !$(".select-list").is(event.target)){
		  $(".select-list").removeClass("open");
		}
	});

	$('.section-box').on('click', '.dots-box .brief:not(.no-checked) li', function(){
		if($(this).hasClass('selected')){
			$(this).removeClass();
		}else{
			$(this).addClass('selected');
		}
	});
	
	
	$('.btn-collapse').click(function(){
		if($('.btn-collapse').hasClass('show')) {
			$('.btn-collapse').removeClass('show');
			$('.collapse').slideUp(350);
		}else {
			$('.btn-collapse').addClass('show');
			$('.collapse').slideDown(350);
		}
	});
	
	
	
	//Func form
	$('#brandLogo').change(function(byThis){
		var files = byThis.target.files;
		if (!files || !files.length) {
			return;
		} else {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#previewLogo').attr('src', e.target.result);
				$('.brand-logo-content').addClass('show-file');
			}
			reader.readAsDataURL(files[0]);
		}
	});
	
	$('.remove-img').click(function(){
		$('.brand-logo-content').removeClass('show-file');
		$('#previewLogo').attr('src', '');
	});
	
	
	//validate demo
	$('form .btn').click(function(){
		$('form input[type="text"], form input[type="password"]').each(function(){
			target = $(this).data('target')
			if(target) {
				$('.size-full[data-ref='+ target +']').addClass('show-error');
			}
			$(this).parent().addClass('show-error');
			$(this).parent().append('<div class="error-message"><div class="error-inr">Thông tin chi tiết về lỗi</div></div>');
			
		});
	});
	
	$('input').focus(function (e) {
       $(this).parent().find('.error-message').remove();
    })
	
	$('input[maxlength]').keyup(function(){
		var maxLen = $(this).attr('maxlength');
		var len = $(this).val().length;
		$(this).next().find('small').html(maxLen - len);
	});

		// Validate email
		$('.vali-email').blur(function(){
			var testEmail = /^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/;
			if (testEmail.test(this.value)){
				
			}else{
				$(this).parent().append('<div class="error-message"><div class="error-inr">Vui lòng nhập địa chỉ email hợp lệ </div></div>');
			}
		});
	
	
	//Show pop demo
	$('.overlay-panel').click(function(e){
		e.stopPropagation();
		//e.preventDefault();	
	});
	
	$('.overlay-form').click(function(){
		$('.overlay-form').removeClass('active');
		$('body').removeClass('no-scroll');
	});
	
	$('.show-pop-demo a').click(function(){
		var target = $(this).data('panel');
		$('.overlay-panel').removeClass('show');
		$(target).addClass('show');
		$('body').addClass('no-scroll');
		$('.overlay-form').addClass('active');
	});
	 
	 $('.close-popup').click(function(){
		$('.overlay-form').removeClass('active');
		$('body').removeClass('no-scroll');
	});
	 
	 $('.close-advertise').click(function(){
		$('.overlay-advertise').removeClass('active');
		$('body').removeClass('no-scroll');
	});
	 
	$('.btn-edit').click(function(){
			if($(this).hasClass('active')) {
				$(this).parent().removeClass('active');
				$(this).removeClass('active');
			}else {
				$(this).parent().addClass('active');
				$(this).addClass('active');
			}
			
			if($('.frm-user .form-group.active').length) {
				$('.frm-user .form-group').last().addClass('show');
			}else {
				$('.frm-user .form-group').last().removeClass('show');
			}
			
	});

	
	// Collapse Page Help
	$('.help-title').click(function(){
		var that = $(this);
		if(that.hasClass('active')){
			that.removeClass('active');
			that.next().slideUp(350);
		}else{
			var next =  $('.help-title.active');
			next.removeClass('active');
			next.next().slideUp(350);
			that.addClass('active');
			that.next().slideDown(350);
		}
	});
	

	
	// Scroll page help
	$('.help-menu a').click(function(e){
		e.preventDefault();
		var hash = $(this).attr('data-hash');

		$('.help-menu li').removeClass('active');
		$(this).parent().addClass('active');

		$('.loged-detail a.current').parent().removeClass('active');
		$('.loged-detail a.current').removeClass('current');
		
		$('.loged-detail a[data-hash = '+ hash +']').addClass('current');
		$('.loged-detail a[data-hash = '+ hash +']').parent().addClass('active');

		$('.help-box > div').css({'display':'none'});
		$('.help-box > div[data-hash = '+ hash +']').fadeIn(150);

		window.location.hash = hash;
		centerMenu();
	});

	$('.has-sub-manage').click(function(){
		var that = $(this);
		if(that.hasClass('active')){
			that.removeClass('active');
			$('.loged-detail .has-child > ul').removeClass('active');
		}else{
			that.addClass('active');
			$('.loged-detail .has-child > ul').addClass('active');
		}	
	});

	$('.loged-detail a').click(function(e){
		e.preventDefault();
		
		if($('.help-content').length) {
			
			var hash = $(this).attr('data-hash');
			if(hash) {
				$('.help-menu a[data-hash= '+ hash +']').trigger("click");
			}else {
				var url = $(this).attr('href');
				var blank = $(this).attr('target');
				if(blank == '_blank') {
					window.open(url);
				}else {
					window.location.href  = url;
				}
			}
			
		}else{
			
			var url = $(this).attr('href');
			var blank = $(this).attr('target');
			if(blank == '_blank') {
				window.open(url);
			}else {
				window.location.href  = url;
			}
		}
	});

	if($('.help-content').length) {
		if(window.location.hash) {
			var hash = window.location.hash.substr(1);	
			$('.help-menu a[data-hash = '+ hash +']').parent().addClass('active');
			$('.loged-detail a[data-hash = '+hash+']').addClass('current');
			$('.help-box > div').css({'display':'none'});
			$('.help-box > div[data-hash = '+ hash +']').fadeIn(150);
		}else {
			$('.help-menu li:first-child a').trigger('click');
		}
	}
	
		
})();