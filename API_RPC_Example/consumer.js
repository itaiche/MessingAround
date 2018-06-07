const SDK = {
  require: function () {
  }
};


SDK.require("WIDGET_ID").then((APIArrayResponse) => {

  APIArrayResponse[0].API.openChat("hello").then(); //WidgetId, iFrameId => provider

}).catch((err) => {

});


function sendLine(data){
  //POSTMESSAGE Send message :  { apicall:" ", apiprovider: " "}
}