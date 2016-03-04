function CountDown(settings){
	var glob=settings;
	function deg(deg){
		return(Math.PI/180)*deg-(Math.PI/180)*90
	}
	
	glob.minutes = Math.floor(glob.seconds / 60);
	glob.seconds = glob.seconds - glob.minutes * 60;
	
	glob.minutesInit = glob.minutes;
	glob.secondsInit = glob.seconds;
	
	if (glob.now >= glob.endDate){
		//timer has reached end, escape (or take some action)
		return;
	}
	
	var clock = {
		set:{		
			minutes:
				function(){
					var cMin=$("#canvas_minutes").get(0);					
					var ctx=cMin.getContext("2d");
					ctx.clearRect(0,0,cMin.width,cMin.height);					
					ctx.shadowBlur=10;
					ctx.shadowOffsetX=0;
					ctx.shadowOffsetY=0;
					ctx.shadowColor=glob.minutesGlow;
					ctx.lineWidth=10;
					
					ctx.beginPath();
					ctx.strokeStyle=glob.minutesColor;
					ctx.arc(60,60,55,deg(0),deg(6*(glob.minutes - 60)));							
					ctx.stroke();	
					
					ctx.beginPath();
					ctx.strokeStyle=glob.minutesBGColor;
					ctx.arc(60,60,55,deg(6*(glob.minutes - 60)),deg(0));							
					ctx.stroke();	
					$(".clock_minutes .val").text(glob.minutes);
				},
			
			seconds:
				function(){
					var cSec=$("#canvas_seconds").get(0);
					var ctx=cSec.getContext("2d");
					ctx.clearRect(0,0,cSec.width,cSec.height);
					ctx.shadowBlur=10;
					ctx.shadowOffsetX=0;
					ctx.shadowOffsetY=0;
					ctx.lineWidth=10;
										
					ctx.beginPath();
					ctx.strokeStyle=glob.secondsColor;
					ctx.arc(60,60,55,deg(0),deg(6* (glob.seconds - 60)));							
					ctx.stroke();	
					
					ctx.beginPath();
					ctx.strokeStyle=glob.secondsBGColor;
					ctx.arc(60,60,55,deg(6* (glob.seconds - 60)),deg(0));							
					ctx.stroke();					
					$(".clock_seconds .val").text(glob.seconds);
				}
			},
		start:function(){
			var cdown=setInterval(function(){
						
				if (glob.seconds == 0 && glob.minutes == 0) {
					//do shit here
					
					
					//change colour of text to red 
					
					if (glob.loop == 1) {
						//reset timer	
							glob.minutes = glob.minutesInit;
							glob.seconds = glob.secondsInit;
							clock.set.seconds();
							clock.set.minutes();
							//wait 1 sec
							delay(1000);
					} else {
						//stop
						return null;
					}
				}
				
				if (glob.seconds == 0) {
					glob.minutes--;
					glob.seconds = 60;
					clock.set.minutes();
				}

				glob.seconds--;			
				clock.set.seconds();
			},1000);
		}
	}

	clock.set.seconds();
	clock.set.minutes();
	clock.start();
}