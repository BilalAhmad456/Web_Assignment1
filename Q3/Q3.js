let tables=[];
let formArr = [];
let formCount=0;

document.addEventListener('DOMContentLoaded',initall);



function check(formobj){
  
  var alphabetRegex = /[a-zA-Z]/;

  // Name
  if (/\d/.test(formobj['full_name'])){
    alert("Name should not contain digits")
    return false;
  }


  // Reference Name

  if ('ref_name' in formobj)
  {
    if (/\d/.test(formobj['ref_name'])){
      alert("Reference name should not contain digits")
      return false;
    }

    
  }







 // Telephone Number



 if (formobj['tel_num'].length !=10){
    alert("Telephone number should have ten digits")
    return false;
  }

  if (alphabetRegex.test(formobj['tel_num'])){

    alert("Telephone number should only contain digits")

    return false;


    
  }


  //Reference Contact

  if ('ref_tel' in formobj)
  {
    if (formobj['ref_tel'].length !=10){
      alert("Reference number should have ten digits")
      return false;
    }

    if (alphabetRegex.test(formobj['ref_tel'])){

      alert("Reference number should only contain digits")

      return false;


      
    }
  }

  // Start Date

  if ('start_date' in formobj){
    var start_date=new Date (formobj['start_date']);
    var currentDate = new Date();

    console.log(start_date)
    console.log(currentDate)
    if (start_date < currentDate){
      
      alert('Start Date cannot be before current date');
      return false;
    }

  }

  // Start Time
  
  if ('start_time' in formobj && 'end_time' in formobj){
    
    var time1 = formobj['start_time'];
    var time2 = formobj['end_time'];
   

    var date = new Date();
    var date1 = new Date(date.toDateString() + " " + time1);
    var date2 = new Date(date.toDateString() + " " + time2);

    var time1_24 = date1.toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit'});
    var time2_24 = date2.toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit'});
    console.log(time1_24);
    console.log(time2_24);
    if (time1_24>time2_24){

      alert("Preferred Work Schedule start time cannot be greater than end time");

      return false;




    }


  }
  





  return true;

  
}

function initall (){
     var form = document.getElementsByClassName("myform")[0];
   
     var btn1= document.getElementById('submit');
     var viewTablebtn = document.getElementById('view_btn');
     console.log(form)
     console.log(formCount)
   
     viewTablebtn.addEventListener('click',displayTable);
        
     
     form.addEventListener('submit',function(Event){
        Event.preventDefault()
        const fd = new FormData(form);
        console.log(fd)
    
            
        let formDataObject = {};
        for (const [key, value] of fd.entries()) {
            formDataObject[key] = value;
        }

        if (check(formDataObject)){
          console.log("Here")
          
          console.log(formDataObject);
    
          formArr.push(JSON.stringify(formDataObject));
          formCount=formCount+1;
          form.reset();
          
              
          

        }

    

        

       

     });
}



function displayTable(){
    var tablediv=document.getElementsByClassName('tablediv')[0];
    const headings = ['Field','Value'];
    
    tablediv.innerHTML='';
    

   
    if ( tablediv.style.display=='none' || tablediv.style.display == '')
    {
          tablediv.style.display='visible';

    }

    

     
    
   

   for (i=0; i<formCount;i++){
     
     var obj=formArr[i];
     var app_table = document.createElement('table');
     app_table.classList.add('table', 'table-bordered', 'table-hover');
     const thead = document.createElement('thead');
     thead.classList.add('thead-dark');
     const headerRow = document.createElement('tr');
     headerRow.innerHTML = `
         <th>${headings[0]}</th>
         <th>${headings[1]}</th>
           `;
     thead.appendChild(headerRow);
     app_table.append(thead);

     
     parsedobj=JSON.parse(obj);


        Object.keys(parsedobj).forEach(key =>{
          var new_row = app_table.insertRow();
          var field= new_row.insertCell(0)
          var value = new_row.insertCell(1)
          field.innerHTML=key;
          value.innerHTML=parsedobj[key]
     


        });
        app_table.style.border= "2 px solid black";
        tablediv.appendChild(app_table);

       
        
       
        
     

    }

    
}



