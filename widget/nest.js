var tempType="";
var windowHeight;
var windowWidth;
var temValue = 0;
var belkinMode="";

// first message received from application muzzley, to set initial status of Nest and Belkin

muzzley.on('nest_belkin_status', function(data, callback){
    tempType = data.nestTemperatureType;
    if(tempType === "C"){
        tempType = "º";
    }
    ajustTempCss();
    temValue = data.nestTemperature;
    $("#tempV").text(temValue + " " +tempType);$("#tempValue span").text(temValue + " " +tempType);
    $("#humValue span").text(data.nestHumidity+"%");
    
    if(data.nestOnline){
        $("#network span").text(" Online"); 
        $("#network span").css("color", "#59A7C1");
    }else{
        $("#network span").text(" Offline");
        $("#network span").css("color", "#ED1C24");
    }
    if(data.nestAway === true){
        $("#away_value").attr("checked", true); $("#home_value").attr("checked", false);
    }else{
        $("#away_value").attr("checked", false); $("#home_value").attr("checked", true);
    }
    if(data.nestOff === true){
        $("#lightbox-img-nest .status span").text(" OFF");
        $("#lightbox-img-nest .status span").css("color", "#ED1C24");
    }else{
        $("#lightbox-img-nest .status span").text(" ON");
        $("#lightbox-img-nest .status span").css("color", "#64BF4B");
    }
    if(data.belkinMode != "off"){
       if(data.belkinMode === 0){
           changeLampImage("off");
        }else{
           changeLampImage("on");
        }
        $("#lightbox-img-belkin .status span").text("ON");
        $("#lightbox-img-belkin .status span").css("color", "#64BF4B");
    }else{
        belkinMode = "off";
        $("#lightbox-img-belkin .status span").text("OFF");
        $("#lightbox-img-belkin .status span").css("color", "#ED1C24");
    }
    
    $("#lightbox-img-belkin .object-id").text("ID: "+data.belkinId);
    $("#lightbox-img-nest .object-id").text("ID: "+data.nestId);
});

// change status of Belkin
var status="";
$("#switch-icon").on("click", function(){
    if(belkinMode != "off"){
        if(status === 1){
            muzzley.send("belkin", {value:0});
            changeLampImage("off"); status = 0;
        }else{
            muzzley.send("belkin", {value:1});
            changeLampImage("on"); status = 1;
        }
    }
});

// change temperature of Nest
$("#tempLeft").on("click", function(){
    --temValue;
    $("#tempValue span").text(temValue + " " +tempType);
    $("#tempV").text(temValue + " " +tempType);
    muzzley.send("nest_setTemperature", {newTemperatureValue: temValue} );
});
$("#tempRight").on("click", function(){
    ++temValue;
    $("#tempValue span").text(temValue + " " +tempType);
    $("#tempV").text(temValue + " " +tempType);
    muzzley.send("nest_setTemperature", {newTemperatureValue: temValue} );
});

//change away/home status of Nest
$( "#away_value" ).on("click", function(){
    $("#away_value").attr("checked", true); $("#home_value").attr("checked", false);
    muzzley.send("nest_setAway", {value: true} );
});

$( "#home_value" ).on("click", function(){
    $("#away_value").attr("checked", false); $("#home_value").attr("checked", true);
    muzzley.send("nest_setAway", {value: false} );
});

////////////////////////////

// From here are functions to change images
// and adapt the layout to fit all resolutions of smartphones

////////////////////////////

function changeLampImage(mode){
    if(mode == "on"){
        $("#switch-icon").css("background-image", 'url("http://cdn.muzzley.com/widgets/21b3077f-b188-49d1-b2b0-9e8a72573469/switch-on.png")');
        $("#lampImg").css("background-image", 'url("http://cdn.muzzley.com/widgets/21b3077f-b188-49d1-b2b0-9e8a72573469/Belkin-on.png")');
    }else{
        $("#switch-icon").css("background-image", 'url("http://cdn.muzzley.com/widgets/21b3077f-b188-49d1-b2b0-9e8a72573469/switch-off.png")');
        $("#lampImg").css("background-image", 'url("http://cdn.muzzley.com/widgets/21b3077f-b188-49d1-b2b0-9e8a72573469/Belkin-off.png")');
    }
}
// click on nest image
$("#btn3").on("click", function(){
    showNestView();
});
// click on lamp
$("#btn1").on("click", function(){
    $("#lightbox-img-belkin").show(); $("#lampImg").css("opacity", 1);
    $("#lightbox-img-nest").hide();  $("#NestImg").css("opacity", 0.5);
});

$(document).ready(function() {
    init();
});

function showNestView(){
    $("#lightbox-img-belkin").hide(); $("#lampImg").css("opacity", 0.5);
    $("#lightbox-img-nest").show(); $("#NestImg").css("opacity", 1);
}

$(".back").on("click", function(){
    $("#lightbox-img-belkin").hide(); $("#lampImg").css("opacity", 1);
    $("#lightbox-img-nest").hide(); $("#NestImg").css("opacity", 1);
})

function ajustTempCss(){
    $("#NestImg").css("padding-top", 0+"px");
    var btFontSize = parseInt($("body").height()/20)+"px";
    $("#tempV").css("font-size", btFontSize);
    var height = $("#NestImg").height(); height = height/2;
    var textHeight = $("#tempV").height(); textHeight = textHeight/2;
    $("#NestImg").css("padding-top", (height - textHeight));
}

var oldWidth = 960;
var oldHeight = 640;

function init(){
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    $("#container").css("height", windowHeight);
    
    var newWidth = (windowHeight*oldWidth)/oldHeight;
    $("#container").css("width", newWidth);
    $("#btn1").css("height", windowHeight);
    $("#btn2").css("height", windowHeight);
    $("#btn3").css("height", windowHeight);
    
    $("#lampImg").css("height", windowHeight/2);
    var newWithLamp = (232*(windowHeight/2))/501;
    $("#lampImg").css("width", newWithLamp);
    $("#lampImg").css("margin-top", (windowHeight - (windowHeight/2)));
    $("#lampImg").css("margin-left", newWithLamp/20);
    
    $("#NestImg").css("height", windowHeight/5);
    var newWithNest = (189*(windowHeight/5)/199);
    $("#NestImg").css("width", newWithNest);
    $("#NestImg").css("margin-top", (windowHeight/2) - (newWithLamp/2));
    
    $("#lampImg").hide();
    $("#lampImg").css("background-image", 'url("http://cdn.muzzley.com/widgets/21b3077f-b188-49d1-b2b0-9e8a72573469/Belkin-on.png")');
    $("#lampImg").css("background-image", 'url("http://cdn.muzzley.com/widgets/21b3077f-b188-49d1-b2b0-9e8a72573469/Belkin-off.png")');
    
    ajustTempCss();
    
    $("#lampImg").show();
    $("#home-view").css("width", windowWidth);
    $("#home-view").css("height", windowHeight);
    
    var lightHeight = (windowHeight/1.2);
    $(".lightbox-img").css("height", lightHeight);
    var newWidthLight = (593*lightHeight/572);
    $(".lightbox-img").css("width", newWidthLight);
    $(".lightbox-img").css("margin-top", (windowHeight/2) - (lightHeight/2)+"px");
    $(".lightbox-img").css("margin-left", (windowWidth/2) - (newWidthLight/2)+"px");
    
    $(".back").css("padding-right", (lightHeight/10)+"px");

    $("#switch-icon").css("background-image", 'url("http://cdn.muzzley.com/widgets/21b3077f-b188-49d1-b2b0-9e8a72573469/switch-on.png")');
    $("#switch-icon").css("background-image", 'url("http://cdn.muzzley.com/widgets/21b3077f-b188-49d1-b2b0-9e8a72573469/switch-off.png")');
    
    $("#switch-icon").css("height", lightHeight/3);
    var newSwitchWidth =(170*(lightHeight/3)/170);
    $("#switch-icon").css("width", newSwitchWidth);
    
    
    var btFontSize = parseInt($("body").height()/30)+"px";
    $(".object-name").css("font-size", btFontSize);
    $(".object-id").css("font-size", btFontSize);
    $("#lightbox-img-nest .status").css("font-size", btFontSize);
    $("#lightbox-img-belkin .status").css("font-size", btFontSize);
    $("#lightbox-img-nest #network").css("font-size", btFontSize);
    $(".rows").css("font-size", btFontSize);
}



