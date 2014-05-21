//--- Template Helper Function  ---//
var template = function(id){
	return _.template( $('#' + id).html() );
}

// TaskModel
var Task = Backbone.Model.extend({
	defaults: {
		title: 'Some work',
		completed: false
	},

	validate: function(attrs) {
		if ( ! attrs.title ) {
			return 'Title is missing';
		}
	}
});

// TaskView for single element
var TaskView = Backbone.View.extend({
	tagName: 'li',

	template: template('taskTemplate'),

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	}
});

// TaskList - List collection
var TaskList = Backbone.Collection.extend({
	model: Task
});

// View for  all task
var TaskListView = Backbone.View.extend({
	tagName: 'ul',

	initialize: function() {
		//console.log(this.collection);
	},

	render: function() {
		this.collection.each(function(task){
			var taskView = new TaskView({model:task});
			this.$el.append(taskView.render().el);
		}, this);

		return this;
	}
});


//--- Testing Task Form View ---//
var TaskFormView = Backbone.View.extend({
	initialize: function() {
		console.log('Task Form initialize');
	},

	render: function() {
		this.$el.html( template ('taskForm') );
		return this;
	}
});


/*----------------------------------------/
	Init
/-----------------------------------------*/

var task = new Task;
var taskView = new TaskView({model:task});

var taskList = new TaskList([
	{title: 'Task 1', completed: false},
	{title: 'Task 2', completed: true},
	{title: 'Task 3', completed: true},
	{title: 'Task 4', completed: false}
]);

//--- Display TaskForm ---//
var taskFormView = new TaskFormView;
$(document.body).append(taskFormView.render().el);

//--- Display Task  ---//
var taskListView = new TaskListView({collection:taskList});
$(document.body).append(taskListView.render().el);