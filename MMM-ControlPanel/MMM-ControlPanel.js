

Module.register("MMM-ControlPanel",{
    defaults:{
        
    },
    start:function(){
        this.showUserPage=false;
        this.user="userDefault";
        this.count=-1;
    },
    getDom:function(){
        
        var wrapper=document.createElement("p");
        /*
        wrapper.className="test results";
        wrapper.id="parent";
        
        wrapper.innerHTML="test results: ";
        var child=document.createElement("p");
        child.id="test notification";
        child.innerHTML="traffic received "+this.info;
        wrapper.appendChild(child);
        */
        return wrapper;
        
    },
    
    
    
    notificationReceived:function(notification,payload,sender){
        var self=this;
        switch(notification){
            case "DOM_OBJECTS_CREATED":
                //this.backToIndex();
                //this.sendNotification("PAGE_SELECT","main");
                 setInterval(()=>{
                     if(this.count>0){this.count--;}
                     if(this.showUserPage===true){
                        this.sendNotification("PAGE_SELECT",self.user);
                        console.log("I sent");
                         //self.shutOtherModule();
                         this.count=10;
                         this.showUserPage=false;
                         this.updateDom();
                     }
                     if(this.count===0){
                         //self.backToIndex();
                         this.sendNotification("PAGE_SELECT","main");
                         this.count=-1;
                         this.updateDom();
                     }
                 },1000) 
                  break;
            
            case "traffic":
                 this.showUserPage=true;
            case "user":
                 this.user=payload;
            default:
                break;
            }
    },
    /*
    shutOtherModule:function(){
        MM.getModules().exceptModule(this).enumerate(function(module){
            if(module.name!=="MMM-DrivingTime"&&module.name!=="MMM-webFrame"){
                module.hide();
            }
            else{
                module.show();
            }
        })
    }, 
    backToIndex:function(){
        MM.getModules().exceptModule(this).enumerate(function(module){
            if(module.name!=="MMM-DrivingTime"&&module.name!=="MMM-MQTT"&&module.name!=="MMM-webFrame"){
                module.show();
            }
            else{
                module.hide();
            }
        })
},
*/
})
