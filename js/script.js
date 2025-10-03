ratioToDB = (ratio) => { return 20*Math.log10(ratio) }

clamp = (x, min, max) => { return Math.min(Math.max(x, min), max) }

class Knob {
    constructor(knobElement, minDegree, maxDegree, minValue, maxValue, labelElement, labelFunc) {
        this.knobElement = knobElement;
        this.minDegree = minDegree;
        this.maxDegree = maxDegree;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.labelElement = labelElement;
        this.labelFunc = labelFunc;

        this.mouseDownY = 0;
        this.currentRotation = 0;
        this.mousePressed = false;

        this.knobElement.addEventListener("mousedown", (e) => {
            this.mousePressed = true;
            this.mouseDownY = e.clientY;
            this.currentRotation = parseInt(getComputedStyle(this.knobElement).getPropertyValue("--rotation"));

            // Change cursor
            document.body.style.cursor = "ns-resize";
        })

        document.addEventListener("mouseup", () => {
            this.mousePressed = false;

            // Revert cursor
            document.body.style.cursor = "";
        })

        document.addEventListener("mousemove", (e) => {
            if (!this.mousePressed) return;
            let newRotation = clamp(this.mouseDownY - e.clientY + this.currentRotation, this.minDegree, this.maxDegree);
            this.knobElement.style.setProperty("--rotation", newRotation.toString() + "deg");
            this.labelElement.textContent = this.labelFunc(this.getValue(newRotation));
        })
    }
    getValue(rotation) {
        return ((rotation - this.minDegree)/(this.maxDegree - this.minDegree)) * (this.maxValue - this.minValue) + this.minValue;
    }
}

const knobElement1 = document.getElementsByClassName("knob")[0];
const knobElement2 = document.getElementsByClassName("knob")[1];

knobElement1.style.setProperty("--rotation", "0deg");
knobElement2.style.setProperty("--rotation", "270deg");

knobElement1.style.setProperty("--rotation", "0deg");
knobElement2.style.setProperty("--rotation", "270deg");

const labelPan = document.getElementById("pan");
const labelDB = document.getElementById("db");

const knob1 = new Knob(knobElement1, -180, 180, -100, 100, labelPan, (x) => { return (x == 0) ? "Centered" : (x < 0) ? (-x).toFixed(0) + "% left" : x.toFixed(0) + "% right" });
const knob2 = new Knob(knobElement2, 0, 360, 0, 1.33, labelDB, (x) => { return (x == 0) ? "-InfdB 0.00" : (20*Math.log10(x)).toFixed(1) + "dB " + x.toFixed(2) });

