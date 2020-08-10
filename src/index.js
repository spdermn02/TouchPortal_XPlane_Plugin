const XPlaneJS = require("extplanejs");
const { BUTTONS, KEYS} = require("./constants");
const { WRITABLE_REFS, READABLE_REFS } = require("./data-refs");

//const XPlaneButtons = require("./constants").BUTTONS;
//const XPlaneKeys = require("./constants").KEYS;
const TPClient = new (require("touchportal-api")).Client();
const pluginId = "TP-XPlane";

/* The following is the update Interval for reading from XPlane - in seconds, examples below
   .33 = 3Hz (3 refreshes per second)
   .1 = 10Hz (10 refreshes per second)
   .016 ~ 60Hz (60 refreshes per second)
*/
const XPlaneInterval = 0.33;

const XPlane = new XPlaneJS(
    {
        host: '127.0.0.1',
        port: 51000,
        broadcast: false,
        debug: false
    }
);

const subscribeToEvents = () => {

    //subscribe to an event
    XPlane.client.subscribe('sim/cockpit2/gauges/indicators/airspeed_kts_pilot');

    // Not sure what this is - i'm assuming it is a set function, for Engine Throttle, [1,0] don't know what that means
    //XPlane.client.set('sim/flightmodel/engine/ENGN_thro','[1,0]');
    //XPlane.client.write('set sim/flightmodel/engine/ENGN_thro [1,0]');

    //XPlane.cmd - cmd once
    //XPlane.begin - cmd begin
    //XPlane.end - cmd end

    // if broadcast: true
    XPlane.on("data-ref",(data_ref,value) => {
        console.log(data_ref + ' - ' + value);
    });

    // if broadcast: false - have to specify what you want to listen too
    XPlane.on('sim/cockpit2/gauges/indicators/airspeed_kts_pilot', function (data_ref, value) {
        console.log(data_ref + ' - ' + value);
    });

};

const command = (data) => {
    XPlane.client.cmd();
}

const keyPress = (data) => {
    // data.key (or whatever) will be the string that is from constants
    XPlane.client.key(KEYS[data.key]);

};

const buttonPress = (data) => {

    // data.button (or whatever) will be the string that is from constants
    XPlane.client.button(BUTTONS[data.button]);

    // Something to control if it is a single press and release, or wait for anohter action to trigger relesae
    if( data.releaseImmediate) {
        buttonRelease(data);
    }
};

const buttonRelease = (data) => {
    // data.button (or whatever) will be the string that is from constants
    XPlane.client.release(BUTTONS[data.button]);
};
XPlane.on("loaded",() => {
    this.client.interval(XPlaneInterval);

    subscribeToEvents();
});

console.log(READABLE_REFS);
console.log(WRITABLE_REFS);

//TPClient.connect({pluginId});
