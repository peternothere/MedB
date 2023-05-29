
    //alarm
    function alarm()
    {
        var remainder1=document.getElementById('rem1');
        var flag1=remainder1.getAttribute('data-flag');
        var remainder2=document.getElementById('rem2');
        var flag2=remainder2.getAttribute('data-flag');
        var remainder3=document.getElementById('rem3');
        var flag3=remainder3.getAttribute('data-flag');
  
        var al1=document.getElementById('a1');
        var al2=document.getElementById('a2');
        var al3=document.getElementById('a3');

        var bell1=document.getElementById('bell1');
        var bell2=document.getElementById('bell2');
        var bell3=document.getElementById('bell3');
  
        var alarminput=document.getElementById('time').value;
        if (alarminput =='') {
            alert('Please enter a valid alarm time');
            return;
        }
        var now = new Date();
        var alarm = new Date(now.toDateString() + ' ' + alarminput);
        var timedif = alarm - now;
        if(timedif<0){
            alert('Please choose a time in the future');
            return;
        }
        var text=document.getElementById('text').value;

        if(flag1=='off')
        {
          remainder1.textContent=text;
          remainder1.setAttribute('data-flag','on');

          if(alarminput<'12:00')
          {
            al1.textContent=alarminput+" Morning";
          }
          else if(alarminput<'16:00')
          {
            al1.textContent=alarminput+" Afternoon";
          }
          else if(alarminput<'19:00')
          {
            al1.textContent=alarminput+" Evening";
          }
          else
          {
            al1.textContent=alarminput+" Night";
          }
          
          cancel_alarm1=setTimeout(function(){
            tsnooze(bell1);
            alarmAudio.play();
            audi();
            alert('Its time for Meds');
          },timedif);
        }
        else if(flag2=='off')
        {
          remainder2.textContent=text;
          remainder2.setAttribute('data-flag','on');

          if(alarminput<'12:00')
          {
            al2.textContent=alarminput+" Morning";
          }
          else if(alarminput<'16:00')
          {
            al2.textContent=alarminput+" Afternoon";
          }
          else if(alarminput<'19:00')
          {
            al2.textContent=alarminput+" Evening";
          }
          else
          {
            al2.textContent=alarminput+" Night";
          }

          cancel_alarm2=setTimeout(function(){
            tsnooze(bell2);
            audi();
            alert('Its time for Meds');
          },timedif);
        }
        else if(flag3=='off')
        {
          remainder3.textContent=text;
          remainder3.setAttribute('data-flag','on');


          if(alarminput<'12:00')
          {
            al3.textContent=alarminput+" Morning";
          }
          else if(alarminput<'16:00')
          {
            al3.textContent=alarminput+" Afternoon";
          }
          else if(alarminput<'19:00')
          {
            al3.textContent=alarminput+" Evening";
          }
          else
          {
            al3.textContent=alarminput+" Night";
          }

          cancel_alarm3=setTimeout(function(){
            tsnooze(bell3);
            audi();
            alert('Its time for Meds');
          },timedif);
        }
        else{
          alert('All reminders are set');
        }
        clear_set();
    }

    function tsnooze(sn)
    {
      setTimeout(function (){
        sn.style.color="red";
        sn.style.animation="shake 0.5s infinite";
      },1000);
    }

    function clear_set()
    {
      document.getElementById('time').value="";
      document.getElementById('text').value="";
      const setalarm= document.getElementById('alarm-set');
      setalarm.style.display = 'none';
    }


  //clear alarm()
  function clear_alarm(num)
  {
    var remainder1=document.getElementById('rem1');
    var flag1=remainder1.getAttribute('data-flag');
    var remainder2=document.getElementById('rem2');
    var flag2=remainder2.getAttribute('data-flag');
    var remainder3=document.getElementById('rem3');
    var flag3=remainder3.getAttribute('data-flag');

    var al1=document.getElementById('a1');
    var al2=document.getElementById('a2');
    var al3=document.getElementById('a3');

    var bell1=document.getElementById('bell1');
    var bell2=document.getElementById('bell2');
    var bell3=document.getElementById('bell3');

    if(num==1)
    {
      remainder1.textContent='';
      remainder1.setAttribute('data-flag','off');
      al1.textContent='';
      bell1.style.color="black";
      bell1.style.animation='none';

      clearTimeout(cancel_alarm1);
    }
    else if(num==2)
    {
      remainder2.textContent='';
      remainder2.setAttribute('data-flag','off');
      al2.textContent='';
      bell2.style.color="black";
      bell2.style.animation='none';

      clearTimeout(cancel_alarm2);
    }
    else
    {
      remainder3.textContent='';
      remainder3.setAttribute('data-flag','off');
      al3.textContent='';
      bell3.style.color="black";
      bell3.style.animation='none';

      clearTimeout(cancel_alarm3);
    }
  }
