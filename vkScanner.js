function VkScanner(apiId, sendRequestTo, callback){
    this.config = {
        sendRequestTo : sendRequestTo,
        apiId : apiId,
        callback : callback
    };
};

VkScanner.prototype.scan = function() {
    var self = this;

    VK.init({
        apiId: this.config['apiId']
    });

    VK.Auth.getLoginStatus(function(response) {
        if (response.session) {
            $.ajax({
                type : "POST",
                url : self.sendRequestTo,
                data : {
                    id : response.session.mid
                },
                complete : function(res, textStatus) {
                    console.log(response.session.mid);
                    self.config.callback(res, textStatus);
                }
            });
        }
    });
};