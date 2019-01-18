Module.register("MMM-DrivingTime",{
    defaults:{},
    start:function(){
        this.result=document.createElement("div");
        this.result.id="driving-info";
        this.result.innerHTML="loading...";
        this.dstName="上海人民广场";
        this.distance=0;
        this.hour=0;
        this.minute=0;
        this.toll=0;
    },
    getScripts:function(){
        return [
            "MMM-DrivingTime.css"
        ]
    },
    
    getDom:function(){
        var wrapper=document.createElement("div");
        wrapper.id="wrapper";
        //wrapper.innerHTML="driving time";
        var self=this;
        var html = `
                        <div class="mmm-DrivingTime" >
                                <h3>从当前位置到 ${self.dstName} :</h3>
                                <hr id="title-hr"></hr>
                                <p id="distance info">
                                    <i id="fa-car" class="icon">&#xf1b9</i>
                                    &nbsp;&nbsp;${self.distance} km
                                </p>
                                <p id="duration info">
                                    <i id="fa-clock-o" class="icon">&#xf017</i>
                                    &nbsp;&nbsp;${self.hour} h ${self.minute} min
                                </p>
                                <p id="toll info">
                                    <i id="fa-rmb" class="icon">&#xf157</i>
                                    &nbsp;&nbsp;${self.toll} 
                                </p>
                        </div>
                `;

                wrapper.insertAdjacentHTML("afterbegin", html);
        wrapper.appendChild(this.result);
        return wrapper;
    },
    notificationReceived:function(notification,payload,sender){
        switch(notification){
            case "ALL_MODULES_STARTED":
                this.sendSocketNotification("find home location");
            break;
            case "traffic":
                this.dstName=payload.toString();
                this.sendSocketNotification("find destination location",payload);
            break;
            default:
            break;
        }
    },
    socketNotificationReceived: function(notification,payload){
        var self=this;
        //console.log("received"+payload);
        if(payload===null){
            console.log(notification);
        }
        switch(notification){
            
            case "home location found":
                this.sendSocketNotification("find destination location",self.dstName);
                break;
              
            case "destination location found":
                this.sendSocketNotification("start api");
                break;
            case "BMap Connected":
                console.log("BMap Connected");
                //this.result=JSON.stringify(payload);
                console.log("noti received"+payload);
                this.result.innerHTML="";
                this.distance=payload.distance/1000;
                this.hour=Math.floor(payload.duration/3600);
                this.minute=Math.floor(payload.duration/60)-this.hour*60;
                this.toll=payload.toll;
                this.updateDom();
                break;
            default:
                break;
        }
    },
})