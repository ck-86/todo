function setHeader(xhr) {
xhr.setRequestHeader('application_api_key', 'blt0cf784f8abaf4dc1');
xhr.setRequestHeader('application_uid', 'todo');
}

var Task = Backbone.Model.extend({
	urlRoot: 'https://api.built.io/v1/classes/todo/objects/'
});

var TaskList = Backbone.Collection.extend({
	model : Task,
	url: 'https://api.built.io/v1/classes/todo/objects/'
});



//var taskList = new TaskList;
//taskList.fetch({ beforeSend: setHeader });

var newTask = new Task({ "object": {
        "title": "From APP",
        "completed" : "true"
}});


newTask.save({},{ beforeSend: setHeader });
