// Implementation interface
interface Device {
    isEnabled(): boolean;
    enable(): void;
    disable(): void;
    getVolume(): number;
    setVolume(percent: number): void;
    getChannel(): number;
    setChannel(channel: number): void;
}

// Concrete implementation A
class TV implements Device {
    private enabled: boolean = false;
    private volume: number = 30;
    private channel: number = 1;

    isEnabled(): boolean {
        return this.enabled;
    }

    enable(): void {
        this.enabled = true;
    }

    disable(): void {
        this.enabled = false;
    }

    getVolume(): number {
        return this.volume;
    }

    setVolume(percent: number): void {
        if (percent > 100) {
            this.volume = 100;
        } else if (percent < 0) {
            this.volume = 0;
        } else {
            this.volume = percent;
        }
    }

    getChannel(): number {
        return this.channel;
    }

    setChannel(channel: number): void {
        this.channel = channel;
    }
}

// Concrete implementation B
class Radio implements Device {
    private enabled: boolean = false;
    private volume: number = 20;
    private channel: number = 95.5;

    isEnabled(): boolean {
        return this.enabled;
    }

    enable(): void {
        this.enabled = true;
    }

    disable(): void {
        this.enabled = false;
    }

    getVolume(): number {
        return this.volume;
    }

    setVolume(percent: number): void {
        if (percent > 100) {
            this.volume = 100;
        } else if (percent < 0) {
            this.volume = 0;
        } else {
            this.volume = percent;
        }
    }

    getChannel(): number {
        return this.channel;
    }

    setChannel(channel: number): void {
        this.channel = channel;
    }
}

// Abstraction
class RemoteControl {
    protected device: Device;

    constructor(device: Device) {
        this.device = device;
    }

    togglePower(): void {
        if (this.device.isEnabled()) {
            this.device.disable();
        } else {
            this.device.enable();
        }
    }

    volumeDown(): void {
        this.device.setVolume(this.device.getVolume() - 10);
    }

    volumeUp(): void {
        this.device.setVolume(this.device.getVolume() + 10);
    }

    channelDown(): void {
        this.device.setChannel(this.device.getChannel() - 1);
    }

    channelUp(): void {
        this.device.setChannel(this.device.getChannel() + 1);
    }
}

// Extended abstraction
class AdvancedRemoteControl extends RemoteControl {
    mute(): void {
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