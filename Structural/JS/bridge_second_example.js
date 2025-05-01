"use strict";
// Concrete implementation A
class TV {
    constructor() {
        this.enabled = false;
        this.volume = 30;
        this.channel = 1;
    }
    isEnabled() {
        return this.enabled;
    }
    enable() {
        this.enabled = true;
    }
    disable() {
        this.enabled = false;
    }
    getVolume() {
        return this.volume;
    }
    setVolume(percent) {
        if (percent > 100) {
            this.volume = 100;
        }
        else if (percent < 0) {
            this.volume = 0;
        }
        else {
            this.volume = percent;
        }
    }
    getChannel() {
        return this.channel;
    }
    setChannel(channel) {
        this.channel = channel;
    }
}
// Concrete implementation B
class Radio {
    constructor() {
        this.enabled = false;
        this.volume = 20;
        this.channel = 95.5;
    }
    isEnabled() {
        return this.enabled;
    }
    enable() {
        this.enabled = true;
    }
    disable() {
        this.enabled = false;
    }
    getVolume() {
        return this.volume;
    }
    setVolume(percent) {
        if (percent > 100) {
            this.volume = 100;
        }
        else if (percent < 0) {
            this.volume = 0;
        }
        else {
            this.volume = percent;
        }
    }
    getChannel() {
        return this.channel;
    }
    setChannel(channel) {
        this.channel = channel;
    }
}
// Abstraction
class RemoteControl {
    constructor(device) {
        this.device = device;
    }
    togglePower() {
        if (this.device.isEnabled()) {
            this.device.disable();
        }
        else {
            this.device.enable();
        }
    }
    volumeDown() {
        this.device.setVolume(this.device.getVolume() - 10);
    }
    volumeUp() {
        this.device.setVolume(this.device.getVolume() + 10);
    }
    channelDown() {
        this.device.setChannel(this.device.getChannel() - 1);
    }
    channelUp() {
        this.device.setChannel(this.device.getChannel() + 1);
    }
}
// Extended abstraction
class AdvancedRemoteControl extends RemoteControl {
    mute() {
        this.device.setVolume(0);
    }
}
// Usage
const tv = new TV();
const remote = new RemoteControl(tv);
remote.togglePower();
console.log(tv.isEnabled()); // true
remote.volumeUp();
console.log(tv.getVolume()); // 40
const radio = new Radio();
const advancedRemote = new AdvancedRemoteControl(radio);
advancedRemote.togglePower();
console.log(radio.isEnabled()); // true
advancedRemote.mute();
console.log(radio.getVolume()); // 0
