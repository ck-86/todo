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

	template: _.template( $('#taskTemplate').html() ),

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
		console.log(this.collection);
	},

	render: function() {
		this.collection.each(function(task){
			var taskView = new TaskView({model:task});
			this.$el.append	(taskView.render().el);
		}, this);

		return this;
	}
});





var task = new Task;
var taskView = new TaskView({model:task});

var taskList = new TaskList([
	{title: 'Task 1', completed: false},
	{title: 'Task 2', completed: false},
	{title: 'Task 3', completed: false},
	{title: 'Task 4', completed: false}
]);

var taskListView = new TaskListView({collection:taskList});
$(document.body).append(taskListView.render().el);