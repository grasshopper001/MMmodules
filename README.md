
# MMmodules
---
* A repo for MagicMirror modules viewing BMap-MQTT
* On receiving MQTT message "traffic"+"address" && "user"+"userType", MagicMirror would 
shift from main page to user page, which shows personal information for this type of users.
By default(userType=="userDefault"), we display the commuting information for this employee.
* Please at least download four modules here as well as
[MMM-Page-Selector](https://github.com/Veldrovive/MMM-Page-Selector), 
place these folders under `~/MagicMirror/modules/`.
* Other modules could also be included and shown on certain page as long as they are added to the config.
* If different url is introduced in different pages, please copy the folder MMM-webFrame, and refactor the copied module with another name such as "MMM-webFrame1"
---
## Configuration
---
* Configuration for 4 files && MMM-Page-Selector

```javascript
    modules:[
        {
    		module: "MMM-Page-Selector",
			
			position: "top_bar",
			config: {
				defaultPage: "main",
				displayTitle: true,
			}
			
		},
        {
    		module:"MMM-webFrame",
			position: 'top_right',	
		    config: {
				url: ["http://www.baidu.com"],  
				updateInterval: 10000, 
				
			},
			//pages:{user:"top_right"}
		},
        {
    		module:"MMM-DrivingTime",
			position:"top_right",
			//pages:{user:"top_right"}
		},
        {
    		module:"MMM-ControlPanel",
			position:"bottom_left",
			//pages:{"all":"bottom_left"}
		},
		
		{
			module: 'MMM-MQTT',
			position: 'bottom_left',
			header: 'MQTT',
			config: {
				mqttServers: [
					{
						address: 'localhost:3000',  // Server address or IP address
						port: '1883',          // Port number if other than default
						user: 'username',          // Leave out for no user
						password: 'password',  // Leave out for no password
						subscriptions: [
							{
								topic: 'traffic'// Topic to look for
							},
							{
								topic:"user"
							}
						]
					}
				],
			},
			//pages:{"all":"bottom_left"}
		},
    ],
    pages: {
    	main: {
			"clock": "top_left",
			//"MMM-webFrame1":"top_right"
		},
		user1: {
			"MMM-webFrame": "top_right",
			"MMM-DrivingTime": "bottom_right",
		        //"MMM-NBA":"top_left"
		},
		userDefault:{
			"MMM-webFrame": "top_right",
			"MMM-DrivingTime": "bottom_right"
		}
	},
```

* for more details of setting pages, please refer to [MMM-Page-Selector](https://github.com/Veldrovive/MMM-Page-Selector)
