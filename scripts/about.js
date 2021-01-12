// G L O B A L   V A R I A B L E S
const allMessages = {
    messageId: 1,
    messages: []
}


// D E S T R U C T U R E
var { messageId, messages } = allMessages;


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// S H O W   M O R E   I N F O
function showMore() {
    $("#lblPhone").text("Phone: 111-222-3333");
    $("#lblEmail").text("Email: gary@gmail.com");

    $("#btnShowMore").hide();
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// S E N D   M E S S A G E
function sendMessage() {
    var formName = $("#msgName").val();
    var formEmail = $("#msgEmail").val();
    var formMsg = $("#msgMsg").val();

    var newMsg = new Message(messageId, formName, formEmail, formMsg);

    messages.push(newMsg);
    console.log(newMsg);

    alert(`${formName}, your message has been sent.`);

    messageId ++;

    $(".form-control").val("");
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// M A P
function initMap() {
    const loc = {
        lat: 36.11437985595775,
        lng: -115.16470939585787
    }

    const map = new google.maps.Map(document.getElementById("map"), {
        center: loc,
        zoom: 10,
        mapTypeId: 'terrain'
    });

    const marker = new google.maps.Marker({
        position: loc,
        map: map
    });
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// I N I T
function init() {
    console.log("Document Ready");

    // E V E N T   L I S T E N E R S
    $("#btnShowMore").click(showMore);
    $("#btnSendMsg").click(sendMessage);

    // F U N C T I O N S
    initMap();

}

window.onload = init;