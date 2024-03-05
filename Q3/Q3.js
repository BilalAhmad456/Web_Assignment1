let tables=[];
let formArr = [];
let formCount=0;

document.addEventListener('DOMContentLoaded',initall);



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
    
        
        console.log(formDataObject);
    
        formArr.push(JSON.stringify(formDataObject));
        formCount=formCount+1;

       

        form.reset();
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



