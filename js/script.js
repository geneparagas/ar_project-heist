$(function () {

	var refreshId = null;
	var countdown = null;
	var counter = 8;
	var countReset = 8;
	var readyStartGo = null;
	var readyCounter = 3;
	var x = 80;
	var shieldPrice = 200000;
	var losePrice = 100000;
	var winPrice = 10000;
	var money = document.getElementById("money");
	var shield = document.getElementById("shield");

	window.onbeforeunload = function () {
		return "Data will be lost if you leave the page, are you sure?";
	};

	function dropdown() {
		var status = this.value;
		if (status == "1") {
			$('ul > *:nth-of-type(60)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(61)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(62)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(20)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(21)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(22)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(40)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(41)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(1)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(2)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(30)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(50)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(10)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(70)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(53)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(73)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(13)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(33)').addClass('win').removeClass('lose');
			$('.alarm').fadeIn().hide();
			$('.win1').show();
			$('.win2').hide();
			$('.win3').hide();
			winPrice = 10000;
			counter = 8;
			countReset = 8;
		};
		if (status == "2") {
			$('ul > *:nth-of-type(60)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(61)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(62)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(20)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(21)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(22)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(53)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(73)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(13)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(33)').addClass('lose').removeClass('win');
			$('.alarm').fadeIn().hide();
			$('.win1').hide();
			$('.win2').show();
			$('.win3').hide();
			winPrice = 50000;
			counter = 6;
			countReset = 6;
		};
		if (status == "3") {
			$('ul > *:nth-of-type(60)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(61)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(62)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(20)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(21)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(22)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(40)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(41)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(1)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(2)').addClass('win').removeClass('lose');
			$('ul > *:nth-of-type(30)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(50)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(10)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(70)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(53)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(73)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(13)').addClass('lose').removeClass('win');
			$('ul > *:nth-of-type(33)').addClass('lose').removeClass('win');
			$('.alarm').fadeIn().hide();
			$('.win1').hide();
			$('.win2').hide();
			$('.win3').show();
			winPrice = 250000;
			counter = 5;
			countReset = 5;
		};

		if (counter <= 9) {
			counter = "0" + counter;
		}
		$('#time').html("00:" + counter);
		$('.text-win').html("+ " + winPrice);
	};

	function stop() {
		clearInterval(readyStartGo);
		readyStartGo = null;
		clearInterval(refreshId);
		refreshId = null;
		readyCounter = 3;
		$('#readyStart').text(readyCounter);
		timeStop();
		checkRewards();
		$('#stop').hide();
		$('#start').show();
	};

	function timeStop () {
		clearInterval(countdown);
		countdown = null;
		counter = countReset;
		if (counter <= 9) {
			counter = "0" + counter;
		}
		$('#time').html("00:" + counter);
	};

	function checkRewards() {
		if (counter <= 0) {
			subtract();
		}
		else if (!$(".win")[0]) {
			$('.alert-success').fadeIn().show();
		}
		else if ($('.active').hasClass('win')) {
			alert("‘You won " + winPrice);
			$('.active').addClass('unlocked').removeClass('win');
			add();
			$('.text-win').fadeIn().show();
		}
		else if ($('.active').hasClass('lose')) {
			subtract();
			alert("busted! you triggered the alarm");
			$('.text-lose').fadeIn().show();
		};
	};

	function verify() {
		var guard = parseInt(shield.value);

		if (guard <= 0) {
			alert("Purchase shields")
		}
		else
		readyStart();
	};

	function start() {
		$('#stop').show();
		$('#start').hide();
		$('.alarm').fadeIn().hide();
		if (refreshId !== null) return;
		refreshId = setInterval(function () {
			var activeLi = document.querySelector('li.active');
			activeLi.classList.remove('active');
			if (activeLi.nextElementSibling) {
				activeLi.nextElementSibling.classList.add('active');
			} else {
				activeLi.parentElement.firstElementChild.classList.add('active')
			}
		}, x);

		if (countdown !== null) return;
		countdown = setInterval(function () {
			counter--;
			if (counter <= 0) {
				stop();
				alert("Times Up!");
			} else if (counter <= 9) {
				$('#time').text("00:0" + counter);
			}
			else {
				$('#time').text("00:" + counter);
			}
		}, 1000);
	};

	function readyStart() {
		$('#readyStart').show().fadeIn();
		if (readyStartGo !== null) return;
		readyStartGo = setInterval(function () {
			readyCounter--;
			if (readyCounter <= 0) {
				start();
				$('#readyStart').fadeIn().hide();
				return;
			}else
			$('#readyStart').text(readyCounter);
		}, 1000);
	}

	function buy() {
		var newNumber = parseInt(money.value);
		var guard = parseInt(shield.value);
		if (newNumber < shieldPrice) {
			alert("money is low")
		}
		else if (guard >= 3) {
			alert("shield is full")
		}
		else
			buyShield();
	};

	function buyShield(e) {
		var newNumber = parseInt(money.value) - shieldPrice;
		money.value = newNumber;

		var guard = parseInt(shield.value) + 1;
		shield.value = guard;
		return false;
	};

	function subtract(e) {
		var newNumber = parseInt(money.value);
		$('.text-lose').html("- " + newNumber * 0.25);
		newNumber = newNumber - (newNumber * 0.25);
		money.value = newNumber;
		

		var guard = parseInt(shield.value) - 1;
		shield.value = guard;
		return false;
	};

	function add(e) {
		var newNumber = parseInt(money.value) + winPrice;
		money.value = newNumber;
		return false;
	};

	$('#buy').click(buy);
	$('#stop').click(stop);
	$('#start').click(verify);
	$("#status").change(dropdown);
});