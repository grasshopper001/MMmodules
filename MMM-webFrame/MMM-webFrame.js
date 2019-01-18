Module.register("MMM-webFrame",{
    // Default module config.
    defaults: {
                width:"500px",
                height:"500px",
                updateInterval: 0.5 * 60 * 1000, 
                url: ["http://127.0.0.1:3000"],
                scrolling:"no"
                        
    },

    start: function () {
            self = this;
            var count = 0;
            if (self.config.url.length > 0 ) {
                  setInterval( function () {
                     //var oIFrame=document.getElementById("roadCondition");
                     //oIFrame.src="http://127.0.0.1:3000";
                     //self.updateDom(1000);
                     console.log('update' + count++)
                     }, self.config.updateInterval
                  )
            }
    },
    getStyles: function() {
            return [
                    "MMM-webFrame.css",
            ];
    },

    // Override dom generator.
getDom: function() {
            var { width, height } = this.config;
            var wrapper = document.createElement("div");
            
            wrapper.id = "wrapper"
            var html = `
                    <div class="mmm-webframe">
                            <iframe
                                    id="roadCondition"
                                    src="${this.config.url[0]}"
                                    width="${this.config.width}"
                                    height="${this.config.height}"
                                    scrolling="${this.config.scrolling}"
                            ></iframe>
                    </div>
            `;

            wrapper.insertAdjacentHTML("afterbegin", html);

    return wrapper;
    },
    notificationReceived:function(notification,payload,sender){
            if(notification==="traffic"){
                    var oIFrame=document.getElementById("roadCondition");
                    oIFrame.src=`${this.config.url[0]}`;
                    self.updateDom();
            }
    }

});
