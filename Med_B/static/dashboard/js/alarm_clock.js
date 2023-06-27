window.onload = function() {
  if (localStorage.getItem("saved_alarm1")) {
    var alarm = JSON.parse(localStorage.getItem("saved_alarm1"));
    alarm_saver1(alarm.time,alarm.message,alarm.date,alarm.count);
  }

  if (localStorage.getItem("saved_alarm2")) {
    var alarm = JSON.parse(localStorage.getItem("saved_alarm2"));
    alarm_saver2(alarm.time,alarm.message,alarm.date,alarm.count);
  }

  if (localStorage.getItem("saved_alarm3")) {
    var alarm = JSON.parse(localStorage.getItem("saved_alarm3"));
    alarm_saver3(alarm.time,alarm.message,alarm.date,alarm.count);
  }

}
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

        var alarmcount=document.getElementById('dropdown').value;
        console.log(alarmcount);

        var alarminput=document.getElementById('time').value;
        var dateinput=document.getElementById('dateinput').value;
        console.log(dateinput);
        if (alarminput =='') {
            alert('Please enter a valid alarm time');
            return;
        }
        var now = new Date();
        if(dateinput != '')
        {
          var alarm = new Date(dateinput + ' ' + alarminput);
        }
        else
        {
          var alarm = new Date(now.toDateString()+ ' ' + alarminput);
        }
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
              al1.textContent=alarminput+" Morning "+dateinput;
            }
            else if(alarminput<'16:00')
            {
              al1.textContent=alarminput+" Afternoon "+dateinput;
            }
            else if(alarminput<'19:00')
            {
              al1.textContent=alarminput+" Evening "+dateinput;
            }
            else
            {
              al1.textContent=alarminput+" Night "+dateinput;
            }
            console.log(alarmcount);
            document.getElementById('countdown1').textContent=alarmcount;
            alarmcount=alarmcount-1;
  
            var saved_alarm1 = {
              time:alarminput,
              message: text,
              date: dateinput,
              count: alarmcount
            };
  
            localStorage.setItem("saved_alarm1",JSON.stringify(saved_alarm1))
            
            cancel_alarm1=setTimeout(function(){
              tsnooze(bell1);
  
              alert('Its time for Meds');
            },timedif);
          }
          else if(flag2=='off')
          {
            remainder2.textContent=text;
            remainder2.setAttribute('data-flag','on');
  
            if(alarminput<'12:00')
            {
              al2.textContent=alarminput+" Morning "+dateinput;
            }
            else if(alarminput<'16:00')
            {
              al2.textContent=alarminput+" Afternoon "+dateinput;
            }
            else if(alarminput<'19:00')
            {
              al2.textContent=alarminput+" Evening "+dateinput;
            }
            else
            {
              al2.textContent=alarminput+" Night "+dateinput;
            }

            document.getElementById('countdown2').textContent=alarmcount;
            alarmcount=alarmcount-1;

            var saved_alarm2 = {
              time:alarminput,
              message: text,
              date:dateinput,
              count:alarmcount,
            };
  
            localStorage.setItem("saved_alarm2",JSON.stringify(saved_alarm2))
            
  
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
              al3.textContent=alarminput+" Morning "+dateinput;
            }
            else if(alarminput<'16:00')
            {
              al3.textContent=alarminput+" Afternoon "+dateinput;
            }
            else if(alarminput<'19:00')
            {
              al3.textContent=alarminput+" Evening "+dateinput;
            }
            else
            {
              al3.textContent=alarminput+" Night "+dateinput;
            }

            document.getElementById('countdown3').textContent=alarmcount;

            alarmcount=alarmcount-1;

            var saved_alarm3 = {
              time:alarminput,
              message: text,
              date:dateinput,
              count:alarmcount,
            };
  
            localStorage.setItem("saved_alarm3",JSON.stringify(saved_alarm3))
            
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
      var count=document.getElementById('countdown1').textContent;
      console.log(count);
      var alarm = JSON.parse(localStorage.getItem("saved_alarm1"));
      
      if(count==0||count==1)
      {
        remainder1.textContent='';
        remainder1.setAttribute('data-flag','off');
        al1.textContent='';
        bell1.style.color="black";
        bell1.style.animation='none';
  
        clearTimeout(cancel_alarm1);

      }
      else
      {
        dateinput=alarm.date; 
        var dateObject = new Date(dateinput);
        dateObject.setDate(dateObject.getDate() + 1);
        dateinput = dateObject.toISOString().slice(0, 10);
        bell1.style.color="black";
        bell1.style.animation='none';
        clearTimeout(cancel_alarm1);

        alarm_saver1(alarm.time,alarm.message,dateinput,alarm.count);
      }
    }
    else if(num==2)
    {
      var count=document.getElementById('countdown2').textContent;
      var alarm = JSON.parse(localStorage.getItem("saved_alarm2"));
      
      if(count==1||count==0)
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
        dateinput=alarm.date; 
        var dateObject = new Date(dateinput);
        dateObject.setDate(dateObject.getDate() + 1);
        dateinput = dateObject.toISOString().slice(0, 10);
        bell2.style.color="black";
        bell2.style.animation='none';
        clearTimeout(cancel_alarm2);
        
        alarm_saver2(alarm.time,alarm.message,dateinput,alarm.count);
      }
    }
    else
    {
      var count=document.getElementById('countdown3').textContent;
      var alarm = JSON.parse(localStorage.getItem("saved_alarm3"));
      
      if(count==1||count==0)
      {
        remainder3.textContent='';
        remainder3.setAttribute('data-flag','off');
        al13.textContent='';
        bell3.style.color="black";
        bell3.style.animation='none';
  
        clearTimeout(cancel_alarm3);

      }
      else
      {
        dateinput=alarm.date; 
        var dateObject = new Date(dateinput);
        dateObject.setDate(dateObject.getDate() + 1);
        dateinput = dateObject.toISOString().slice(0, 10);
        bell3.style.color="black";
        bell3.style.animation='none';
        clearTimeout(cancel_alarm3);
        
        alarm_saver3(alarm.time,alarm.message,dateinput,alarm.count);
      }
    }
  }

  

  function alarm_saver1(alarminput,text,dateinput,count)
  {    
      //var alarm = new Date(dateinput + ' ' + alarminput);
    if(count!=0)
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

      var alarmcount=document.getElementById('dropdown');

      var now = new Date();
      if(dateinput != '')
      {
        var alarm = new Date(dateinput + ' ' + alarminput);
      }
      else
      {
        var alarm = new Date(now.toDateString()+ ' ' + alarminput);
        dateinput=(now.toDateString());
      }

      var timedif = alarm - now;
      if(timedif<0){
          alert('Please choose a time in the future');
          return;
      }

      
        remainder1.textContent=text;
        remainder1.setAttribute('data-flag','on');

        if(alarminput<'12:00')
        {
          al1.textContent=alarminput+" Morning "+dateinput;
        }
        else if(alarminput<'16:00')
        {
          al1.textContent=alarminput+" Afternoon "+dateinput;
        }
        else if(alarminput<'19:00')
        {
          al1.textContent=alarminput+" Evening"+dateinput;
        }
        else
        {
          al1.textContent=alarminput+" Night "+dateinput;
        }

        document.getElementById('countdown1').textContent=count;


        cancel_alarm1=setTimeout(function(){
          tsnooze(bell1);
          //alarmAudio.play();
          audi();
          alert('Its time for Meds');
        },timedif);

      clear_set();
    }

  }

  function alarm_saver2(alarminput,text,dateinput,count)
  {
    if(count!=0)
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

      var now = new Date();
      if(dateinput != '')
      {
        var alarm = new Date(dateinput + ' ' + alarminput);
      }
      else
      {
        var alarm = new Date(now.toDateString()+ ' ' + alarminput);
      }
      var timedif = alarm - now;
      if(timedif<0){
          alert('Please choose a time in the future');
          audi();
          return;
      }

      
        remainder2.textContent=text;
        remainder2.setAttribute('data-flag','on');

        if(alarminput<'12:00')
        {
          al2.textContent=alarminput+" Morning "+dateinput;
        }
        else if(alarminput<'16:00')
        {
          al2.textContent=alarminput+" Afternoon "+dateinput;
        }
        else if(alarminput<'19:00')
        {
          al2.textContent=alarminput+" Evening "+dateinput;
        }
        else
        {
          al2.textContent=alarminput+" Night "+dateinput;
        }

        document.getElementById('countdown2').textContent=count;

        cancel_alarm2=setTimeout(function(){
          tsnooze(bell2);
         // alarmAudio.play();
          //audi();
          alert('Its time for Meds');
        },timedif);

      clear_set();
    }

  }

  function alarm_saver3(alarminput,text,dateinput,count)
  {
    if(count!=0)
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

      var now = new Date();
      if(dateinput != '')
      {
        var alarm = new Date(dateinput + ' ' + alarminput);
      }
      else
      {
        var alarm = new Date(now.toDateString()+ ' ' + alarminput);
      }
      var timedif = alarm - now;
      if(timedif<0){
          alert('Please choose a time in the future');
          return;
      }

      
        remainder3.textContent=text;
        remainder3.setAttribute('data-flag','on');

        if(alarminput<'12:00')
        {
          al3.textContent=alarminput+" Morning "+dateinput;
        }
        else if(alarminput<'16:00')
        {
          al3.textContent=alarminput+" Afternoon "+dateinput;
        }
        else if(alarminput<'19:00')
        {
          al3.textContent=alarminput+" Evening "+dateinput;
        }
        else
        {
          al3.textContent=alarminput+" Night "+dateinput;
        }

        document.getElementById('countdown3').textContent=count;

        cancel_alarm3=setTimeout(function(){
          tsnooze(bell3);
          //alarmAudio.play();
          //audi();
          alert('Its time for Meds');
        },timedif);

      clear_set();
    }

  }

function audi()
{
  console.log('Fuckinh putahj');
  const audio = new Audio('{{MEDIA_URL}}a.mp3');

  audio.play();
}




