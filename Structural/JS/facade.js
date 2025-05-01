"use strict";
/**
 * Provides a simplified interface to a larger body of code (e.g., a library or complex subsystem).
 *
 * Purpose: Provide a simplified interface to a complex subsystem.
 *
 * Use When:
 * You want to hide a complex subsystem behind a simpler interface.
 * You want to make a library or API easier to use.
 *
 * How it works:
 * A facade class wraps the subsystem and provides higher-level methods.
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
    turnOn() {
        console.log("Audio player turned on");
    }
    turnOff() {
        console.log("Audio player turned off");
    }
    play(track) {
        console.log(`Playing '${track}'`);
    }
}
class Display {
    turnOn() {
        console.log("Display turned on");
    }
    turnOff() {
        console.log("Display turned off");
    }
    setSource(source) {
        console.log(`Display source set to ${source}`);
    }
}
class Amplifier {
    turnOn() {
        console.log("Amplifier turned on");
    }
    turnOff() {
        console.log("Amplifier turned off");
    }
    setVolume(level) {
        console.log(`Amplifier volume set to ${level}`);
    }
}
class Lights {
    dim(level) {
        console.log(`Lights dimmed to ${level}%`);
    }
    brighten() {
        console.log("Lights brightened to 100%");
    }
}
// Facade
class HomeTheaterFacade {
    constructor() {
        this.audioPlayer = new AudioPlayer();
        this.display = new Display();
        this.amplifier = new Amplifier();
        this.lights = new Lights();
    }
    watchMovie(movie) {
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
    endMovie() {
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
