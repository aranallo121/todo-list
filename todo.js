var listItems = [];



//lists task items on website using ajax call GET


$('document').ready(function(){
   $.get("http://mean.codingcamp.us/anthony/todo",function(response,status){
       console.log(response,status);
       for(var i=0; i<response.length; i++)
            displayTask(response[i]);
   }); 
});

//declaring new funciton to display task list
function displayTask(task){
    $('#taskList').append("<a href='#' onClick='viewTask(this.id)'  id='"+task._id+"'>"+task.title+"</a><br>");
    listItems.push(task);
}


//todisplay task info
function viewTask(taskID){
    for(var i =0; i<listItems.length; i++){
        if(listItems[i]._id===taskID){
            var title= listItems[i].title;
            var price= listItems[i].price;
            var description= listItems[i].description;
            var completed = listItems[i].completed;
            var image = listItems[i].imgUrl
            $('.infobox').html("<h2 class='taskdone'>"+title+"</h2><br><span class='taskdone'>Description: "+description+"</span><br><span class='taskdone'>Price: "+price+"</span></br><span class='taskdone'>Done: "+completed+"</span><br><img src='"+image+"'><br><button onClic='completeTask()'class='button btn-danger'>Finished</button>")
            
        };
        if(completed==true){
            $('.taskdone').css("text-decoration","line-through")
        }
    }
    
    // find the task in listItems by the id and assign it to a new variable
    // display the task properties in html field. 
    console.log(taskID);
}


//create object from form data with constructor
function CreateTask(task, price, description, image){
    this.title = task;
    this.description = description;
    this.price = price;
    this.imgUrl = image;
    this.completed = true;
}


//on click funciton that creates and sends the object to API
$('button').on('click',function(){
    var task = ($('#taskName').val());
    var price = ($('#price').val());
    var description = ($('#description').val());
    var image = ($('#imageURL').val());
    var newTask = new CreateTask(task, price, description, image);
    putData(newTask);
})


//function to push new object to the api
function putData(myTask){
    $.post("http://mean.codingcamp.us/anthony/todo", myTask, function(response, status){
        console.log(response,status);
        displayTask(response);
        listItems.push(response[i]);
    });
};

