var ticktime = 1000;
var barposition = 240;
var barheight = 120;
var enddate = new Date(2019,5,27,20,35,0);
var positions=new Array(10);

// Calculate the positions to move digits into based on the position of the time bar.
for(i=0;i<10;i++){
  positions[i] = (-barheight*i)+barposition;
}

/* Countdown object definition */
function Countdown(enddate)
{
  this.enddate = enddate;
  this.startdate = new Date();
  if(this.enddate > this.startdate){this.currentdiff = this.enddate - this.startdate;}
  else{this.currentdiff = 0;}
  this.pastDate = function(){return (this.enddate < new Date())};
  // We calculate days independently of the date object, so we can get the number of days, rather than the number of the day.
  this.daysToArrival = function(){return Math.floor((Math.round(this.currentdiff/1000))/86400)};
  this.hoursToArrival = function(){return new Date(this.currentdiff).getHours()};
  this.minutesToArrival = function(){return new Date(this.currentdiff).getMinutes()};
  this.secondsToArrival = function(){return new Date(this.currentdiff).getSeconds()};
}
/* End Countdown object definition. */

function countdownTick()
{		
	$('#secTens').animate({top:((positions[Math.floor(window.countdown.secondsToArrival()/10)]-480)+'px')},500);
	$('#secUnits').animate({top:(positions[window.countdown.secondsToArrival() % 10]+'px')},500);
	$('#minTens').animate({top:((positions[Math.floor(window.countdown.minutesToArrival()/10)]-480)+'px')},500);
	$('#minUnits').animate({top:(positions[window.countdown.minutesToArrival() % 10]+'px')},500);
	$('#hourTens').animate({top:((positions[Math.floor(window.countdown.hoursToArrival()/10)]-840)+'px')},500);
	$('#hourUnits').animate({top:(positions[window.countdown.hoursToArrival() % 10]+'px')},500);
	$('#dayTens').animate({top:(positions[Math.floor(window.countdown.daysToArrival()/10)]+'px')},500);
	$('#dayUnits').animate({top:(positions[window.countdown.daysToArrival() % 10]+'px')},500);
  if((window.countdown.currentdiff - ticktime) > 0){
    window.countdown.currentdiff -= ticktime;
  }
  else{
    window.countdown.currentdiff = 0;
  }
}

$(document).ready(function(){
  window.countdown = new Countdown(enddate);
	window.setInterval(countdownTick,ticktime);
});
