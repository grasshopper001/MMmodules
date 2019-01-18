const request = require("request");
var NodeHelper=require("node_helper");
//available ak:D1WdNze1F6CkbpYvkdhnPrW5TWHxuNOk
const api = "TDwEqGHW8tooUDxV4IXA6P7x0aVApRcZ";

module.exports=NodeHelper.create({
    start:function(){
        this.homeLng=121.198949,
        this.homeLat=31.450632,
        this.dstLng=0,
        this.dstLat=0
    },
    transitRoute:function(org,dst,callback){
        request({
            url:`http://api.map.baidu.com/direction/v2/driving?origin=${org}&destination=${dst}&tactics=7&ak=${api}`,
            json:true
        },(error,response,body)=>{
            //console.log(body.result.routes[0]);
            if(error){
                callback("Unable to connect to Baidu server");
            }else if(body.status !== 0){
                callback("Unable to find route for your org and dst");
            }else{
                var steps=body.result.routes[0].steps;
                var oPayload={
                    distance:body.result.routes[0].distance,
                    duration:body.result.routes[0].duration,
                    toll:body.result.routes[0].toll,
                    stepRoadName:[]
                }
                console.log("toll:"+body.result.routes[0].toll);
                console.log("distance:"+body.result.routes[0].distance);
                console.log("duration:"+body.result.routes[0].duration);
                
                for(let i=0;i<steps.length;i++){
                    if(steps[i].road_name==="无名路") continue;
                    oPayload.stepRoadName.push(steps[i].road_name);
                    
                }
                //console.log(oPayload);
                callback(undefined,oPayload);
            }
        })
    },
    geocodeAddress:function(encodedAddress,callback){
        request({
            url: `http://api.map.baidu.com/geocoder/v2/?address=${encodedAddress}&output=json&ak=${api}`,
            json: true
        }, (error, response, body)=>{
            if(error){
                //如果url错误，或者api过期，这里处理
                //console.log('Unable to connect to Baidu server.');
                callback('Unable to connect to Baidu server');
            }else if(body.status !== 0){
                // 百度地图返回0代表正常
                //console.log('Unable to find that address');
                callback('Unable to find that address');
            }else{
            //console.log(body);
            // 使用stringify可以pretty print json格式，第二个参数永远是undefined，第三个参数为换行缩进个数，一般2个字符
            // console.log(JSON.stringify(body,undefined,2));
            // console.log(`Latitude: ${body.result.location.lat}`);
            // console.log(`Longtitude: ${body.result.location.lng}`);
            var oPayload={
                latitude: body.result.location.lat,
                longtitude: body.result.location.lng
            }
            //console.log(oPayload);
            callback(undefined, oPayload);
            }
        })
    },
    socketNotificationReceived:function(notification,payload){
        var self=this;
        switch(notification){
            case "find home location":
            var a=encodeURIComponent("上海市兴顺路555号");
            this.geocodeAddress(a,(error,result)=>{
                //console.log("home address result:")
                //console.log(result);
                if(error){
                    self.sendSocketNotification(error,undefined);
                }
                else{
                    self.homeLat=result.latitude.toFixed(6);
                    self.homeLng=result.longtitude.toFixed(6);
                    self.sendSocketNotification("home location found");
                }
            })
                break;
            case "find destination location":
            var a=encodeURIComponent(payload);
            this.geocodeAddress(a,(error,result)=>{
                //console.log("destination address result:");
                //console.log(result);
                if(error){
                    self.sendSocketNotification(error,undefined);
                }
                else{
                    self.dstLat=result.latitude.toFixed(6);
                    self.dstLng=result.longtitude.toFixed(6);
                    self.sendSocketNotification("destination location found");
                }
            })
                break;
            case "start api":
            console.log(self.homeLng+","+self.homeLat);
            console.log(self.dstLng+","+self.dstLat);
            var org=encodeURIComponent(self.homeLat+","+self.homeLng);
            var dst=encodeURIComponent(self.dstLat+","+self.dstLng);
            this.transitRoute(org,dst,(error,result)=>{
                if(error){
                    self.sendSocketNotification(error,undefined);
                }
                else{
                    //console.log(result);
                    self.sendSocketNotification("BMap Connected",result);
                }
            })
            default:
                break;
        }
    }
})