var tempType="";
var windowHeight;
var windowWidth;
var temValue = 0;

$(document).ready(function() {
    init();
});

// first message received from application muzzley, to set initial status of Nest and Belkin

muzzley.on('nest_status', function(data, callback){
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

    $("#lightbox-img-nest .object-id").text("ID: "+data.nestId);
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

// click on nest image
$("#btn3").on("click", function(){
    showNestView();
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
    var btFontSize = parseInt($("body").height()/20)+"px";
    $("#tempV").css("font-size", btFontSize);

}

function init(){
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;

    ajustTempCss();

    var margin = parseInt($("#lightbox-img-nest").css("margin"));
    margin = margin*2;
    $("#lightbox-img-nest").css("height", (windowHeight - 100));
    $("#lightbox-img-nest").css("width", (windowWidth - 40));

    //alert(windowWidth+"*"+windowHeight);
    var btFontSize = parseInt($("body").height()/30)+"px";
    $(".object-name").css("font-size", btFontSize);
    $(".object-id").css("font-size", btFontSize);
    $("#lightbox-img-nest .status").css("font-size", btFontSize);
    $("#lightbox-img-nest #network").css("font-size", btFontSize);
    $(".rows").css("font-size", btFontSize);
}



