clamp = (x, min, max) => { return Math.min(Math.max(x, min), max) }

class Knob {
    constructor(knobElement, min, max) {
        this.knobElement = knobElement;
        this.min = min;
        this.max = max;

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
            let newRotation = clamp(this.mouseDownY - e.clientY + this.currentRotation, this.min, this.max);
            this.knobElement.style.setProperty("--rotation", newRotation.toString() + "deg");
        })
    }
}

const knobElement1 = document.getElementsByClassName("knob")[0];
const knobElement2 = document.getElementsByClassName("knob")[1];

knobElement1.style.setProperty("--rotation", "0deg");
knobElement2.style.setProperty("--rotation", "270deg");

const knob1 = new Knob(knobElement1, -180, 180);
const knob2 = new Knob(knobElement2, 0, 360);

