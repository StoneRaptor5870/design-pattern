/**
 * Provides a simplified interface to a larger body of code (e.g., a library or complex subsystem).
 * 
 * Purpose: Provide a simplified interface to a complex subsystem.
 * 
 * Use When:
 * When you want to provide a unified interface to a set of interfaces in a subsystem.
 * You want to hide a complex subsystem behind a simpler interface.
 * To decouple clients from the subsystem and reduce dependencies.
 * You want to make a library or API easier to use.
 * 
 * How it works:
 * A facade class wraps the subsystem and provides higher-level methods.
 * The Facade class sits on top of complex subsystems and delegates calls to them.
 * The client interacts with the facade, not the subsystem directly.
 * 
 * Real-life:
 * jQuery abstracts complex DOM APIs.
 * A UI button that hides multiple services.
 * 
 * Pros:
 * Simplifies usage of complex APIs.
 * Reduces dependencies.
 * 
 * Cons:
 * May limit flexibility.
 * Can become god object.
 */

class AudioPlayer {
    turnOn(): void {
        console.log("Audio player turned on");
    }

    turnOff(): void {
        console.log("Audio player turned off");
    }

    play(track: string): void {
        console.log(`Playing '${track}'`);
    }
}

class Display {
    turnOn(): void {
        console.log("Display turned on");
    }

    turnOff(): void {
        console.log("Display turned off");
    }

    setSource(source: string): void {
        console.log(`Display source set to ${source}`);
    }
}

class Amplifier {
    turnOn(): void {
        console.log("Amplifier turned on");
    }

    turnOff(): void {
        console.log("Amplifier turned off");
    }

    setVolume(level: number): void {
        console.log(`Amplifier volume set to ${level}`);
    }
}

class Lights {
    dim(level: number): void {
        console.log(`Lights dimmed to ${level}%`);
    }

    brighten(): void {
        console.log("Lights brightened to 100%");
    }
}

// Facade
class HomeTheaterFacade {
    private audioPlayer: AudioPlayer;
    private display: Display;
    private amplifier: Amplifier;
    private lights: Lights;

    constructor() {
        this.audioPlayer = new AudioPlayer();
        this.display = new Display();
        this.amplifier = new Amplifier();
        this.lights = new Lights();
    }

    watchMovie(movie: string): void {
        console.log("Get ready to watch a movie...");
        this.lights.dim(30);
        this.display.turnOn();
        this.display.setSource("HDMI 1");
        this.amplifier.turnOn();
        this.amplifier.setVolume(20);
        this.audioPlayer.turnOn();
        this.audioPlayer.play(movie);
        console.log(`Now playing: ${movie}`);
    }

    endMovie(): void {
        console.log("Shutting down the home theater...");
        this.audioPlayer.turnOff();
        this.amplifier.turnOff();
        this.display.turnOff();
        this.lights.brighten();
        console.log("Home theater shutdown complete");
    }
}

// Usage
const homeTheater = new HomeTheaterFacade();
homeTheater.watchMovie("Inception");
console.log("...");
homeTheater.endMovie();

/*
Get ready to watch a movie...
Lights dimmed to 30%
Display turned on
Display source set to HDMI 1
Amplifier turned on
Amplifier volume set to 20
Audio player turned on
Playing 'Inception'
Now playing: Inception
...
Shutting down the home theater...
Audio player turned off
Amplifier turned off
Display turned off
Lights brightened to 100%
Home theater shutdown complete
*/