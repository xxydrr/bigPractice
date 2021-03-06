
(function(_) {
    var template = 
    `<li>
        <div class="date"></div>
        <div class="wrap">
        </div>
    </li>`;

    var template2 = 
    `<div class="todo"></div>`;

    var Task = {
        init: function(options) {
            this.options = options || {};
            //获取模板li标签对象
            this.container = this.layout.cloneNode(true);
            // date节点，用于设置任务日期
            this.taskDate = this.container.querySelector('.date');
            // 在date节点上定义一个widget属性指向this
            this.taskDate.widget = this;
            // taskWrap节点，用于插入子类
            this.taskWrap = this.container.querySelector('.wrap');
            this.renderUI();
        },
        layout: _.htmlTranslate(template),
        // 设置任务日期
        setContent: function(date){
            this.taskDate.innerText = date;
            this.taskDate.id = 'id' + date; // id必须以字母开头
        },
        // 添加任务
        addTodo: function(option){
            var todoAdd = Object.create(Todo);
            todoAdd.init(option);
            this.todo  = todoAdd.container;
            this.taskWrap.appendChild(this.todo);
        },

        // UI渲染初始化
        renderUI: function() {
            this.options.date && this.setContent(this.options.date);
            this.options.name && this.addTodo(this.options);
        }
    }

    var Todo = {
        //@param {Object} {date:'2015-04-28',name:'todo1',isFinished:true,content:'完成任务1'}
        init: function(options) {
            this.options = options || {};
            // 即 todo节点
            this.container = this.layout.cloneNode(true);
            // 在todo节点上定义一个widget属性指向this
            this.container.widget = this;
            this.renderUI();
        },
        layout: _.htmlTranslate(template2),
        // UI渲染初始化
        renderUI: function() {
            if(this.options.date) {
                this.container.setAttribute('data-date',this.options.date);
            }
            if(this.options.name) {
                this.container.innerText = this.options.name;
                this.container.setAttribute('data-name',this.options.name);
            }
            if(this.options.isFinished === true) {
                _.addClass(this.container,'z-finished');
            }
            this.container.setAttribute('data-isFinished',this.options.isFinished);
            if(this.options.content) {
                this.container.setAttribute('data-content',this.options.content);
            }
        }     
    }
    

    window.Task = Task;
    window.Todo = Todo;

})(util);


