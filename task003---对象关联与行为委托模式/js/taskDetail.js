(function(_) {
    var template = 
    `<div class="container-right"> 
    <div class="right-head right-head-top"> 
        <div class="head-title"> 
           <p class="name"></p> 
        </div> 
        <div class="head-icon"> 
            <i class="icon-check-circle finish" style="display:none";></i> 
            <i class="icon-edit edit" style="display:none"></i> 
        </div> 
    </div> 
    <div class="right-head"> 
       <div class="head-data"> 
        <p></p> 
       </div> 
   </div> 
   <div class="task-content"> 
    <p></p> 
   </div> 
</div>`;
    var template2 = 
    `<div class="container-edit"> 
                 <div class="right-head right-head-top"> 
                     <div class="head-title"> 
                         任务标题：</span><input type="text" class="title-edit" placeholder="在此输入任务标题"><span class="tips"> 
                     </div> 
                 </div> 
                 <div class="right-head"> 
                    <div class="head-data"> 
                        任务日期：</span><input type="text" class="date-edit" placeholder="格式：2015-10-01"><span class="tips"> 
                    </div> 
                </div> 
                <div class="task-content"> 
                    <textarea name="" id="content-edit" class="contentValue"></textarea><span class="tips"> 
                    <button class="btn no">取消</button> 
                    <button class="btn yes">确定</button> 
                </div> 
    </div>`;
    var Detail = {
        init: function(options) {
            this.options = options || {};
            this.container = this.layout.cloneNode(true);
            this.container.widget = this;
            this.taskName = this.container.querySelector('.head-title .name');
            this.finishBtn = this.container.querySelector('.head-icon .finish');
            this.editBtn = this.container.querySelector('.head-icon .edit');
            this.taskDate = this.container.querySelector('.head-data p');
            this.taskContent = this.container.querySelector('.task-content p');
            Object.setPrototypeOf(Detail, _.emitter);
            this.renderUI();
            this.initEvent();
            
        },
        layout: _.htmlTranslate(template),
        setContent: function(obj) {
            // console.log(obj.name);
            this.taskName.innerText = obj.name;
            this.taskDate.innerText = obj.date === '' ? '' : '任务日期：' + obj.date;
            this.taskContent.innerText = obj.content;
            if(obj.isFinished === false) {
                this.showBtn();
            } else {
                this.hideBtn();
            }
            this.editBtn.style.display = obj.date === '' ? 'none' : 'block';
        },
        hideBtn: function() {
            this.finishBtn.style.display = 'none';
        },
        showBtn: function() {
            this.finishBtn.style.display = 'block';
        },
        reset: function() {
            this.setContent({name: '', date: '', content: ''});
        },
        destroy: function() {
            this.container.parentNode.removeChild(this.container);
        },
        getData: function() {
            var obj = {};
            obj.name = this.taskName.innerText;
            obj.date = this.taskDate.innerText.slice(5);
            obj.content = this.taskContent.innerText;
            return obj;
        },
        renderUI: function() {
            if(this.options.name) {
                this.setContent(this.options);
            }
        },
        initEvent: function() {
            var that =this;
            _.addEvent(this.finishBtn, 'click', function(event) {
                var ModalOK = Object.create(Modal);
                ModalOK.init({hasFlag:true,text:'是否确人完成该任务？'});
                ModalOK.on('confirm', function() {
                    that.onFinish();
                });
                ModalOK.appendTo(document.body)
               
            }); 
            _.addEvent(this.editBtn,'click',function() {
                that.onEdit();
            });
        },
        onFinish: function() {
            this.emit('finish')
        },
        onEdit: function() {
            this.emit('edit');
        }

    }

    var Edit =  {
        init: function(options) {
            this.options = options || {};
            this.container = this.layout.cloneNode(true);
            this.container.widget = this;
            this.title = this.container.querySelector('.head-title input');
            this.titleTip = this.container.querySelector('.head-title .tips');
            this.dateInput = this.container.querySelector('.head-data input');
            this.dateTip = this.container.querySelector('.head-data .tips');
            this.inputContent = this.container.querySelector('.task-content .contentValue');
            this.contentTip =this.container.querySelector('task-content .tips');
            this.confirm = this.container.querySelector('.task-content .yes');
            this.cancel = this.container.querySelector('.task-content .no');
            Object.setPrototypeOf(Edit,_.emitter)
            this.renderUI();
            this.initEvent();
        },
        layout: _.htmlTranslate(template2),
        setContent: function(obj) {
            this.title.value = obj.name;
            this.dateInput.value = obj.date;
            this.inputContent.innerText = obj.content; 
        },
        getData: function() {
            var obj = {};
            obj.name = this.title.value;
            obj.date = this.dateInput.value;
            obj.content = this.inputContent.value;
            obj.isFinished = false;
            return obj;
        },
        renderUI: function() {
            if(this.options.name !== undefined) {
                this.setContent(this.options);
            }
        },
        destroy: function() {
            this.container.parentNode.removeChild(this.container);
        },
        checkTitle: function() {
            if(this.title.value.trim() === '') {
                this.titleTip.innerText = '名称不能为空';
            } else {
                this.titleTip.innerText = '';
            }
            return !(this.title.value.trim() === '');
        },
        checkDate: function() {
            if(this.dateInput.value.trim() === '') {
                this.dateTip.innerText = '日期不能为空';
            } else {
                this.dateTip.innerText = '';
            }
            return !(this.dateInput.value.trim() === ''); 
        },
    
        initEvent: function() {
            var that = this;
            _.addEvent(this.title, 'blur', function(event) {
                that.checkTitle();
            });
            _.addEvent(this.dateInput, 'blur', function(event) {
                that.checkDate();
            });
            // _.addEvent(this.inputContent, 'blur', function(event) {
            //     that.checkContent();
            // });
            _.addEvent(this.confirm, 'click', function(event) {
                that.onConfirm();
            });
            _.addEvent(this.cancel, 'click', function(event) {
                that.onCancel();
            });
        },
        onConfirm: function() {
            this.emit('confirm');
            this.destroy();
           
        },
        onCancel: function() {
            this.emit('cancel');
            this.destroy()
       
        }
          
    };

    window.Detail = Detail;
    window.Edit = Edit;
})(util)