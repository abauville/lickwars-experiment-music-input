// Visit The Stimulus Handbook for more details
// https://stimulusjs.org/handbook/introduction
//
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>
import Vex from 'vexflow'

import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "output" ]

  connect() {
    this.outputTarget.textContent = 'Hello, Stimulus!'
    this.currentSelection = null;
    const VF = Vex.Flow;
    this.vf = new Vex.Flow.Factory({renderer: {elementId: 'score'}});
    this.counter = 0
    const score = this.vf.EasyScore();
    const system = this.vf.System();
    system.addStave({
      voices: [score.voice(score.notes(`C#5/q, B4, A4, G#4`))]
    }).addClef('treble').addTimeSignature('4/4');
    this.vf.draw();

  }

  draw(event) {
    event.preventDefault();
    // const this.vf = new Vex.Flow.Factory({renderer: {elementId: 'score'}});
    this.vf.context.clear();
    const score = this.vf.EasyScore();
    const system = this.vf.System();
    console.log(this.counter);
    if (this.counter%2==0) {
      system.addStave({
        voices: [score.voice(score.notes(`C#5/q, B4, A4, G#4`))]
      }).addClef('treble').addTimeSignature('4/4');
    } else {
      system.addStave({
        voices: [score.voice(score.notes(`C#5/q, B4, A4, G#5`))]
      }).addClef('treble').addTimeSignature('4/4');
    }

    console.log("redraw");
    this.vf.draw();
    this.counter += 1

    this.add_action_to_notes()
  }

  add_action_to_notes() {
    const svg = document.querySelector("svg");
    const notes = svg.querySelectorAll(".vf-stavenote");
    console.log("svg", svg);
    console.log("notes", notes);
    notes.forEach((note) => {note.setAttribute("data-action", "click->score#clickNote")});
  }

  clickNote(event) {
    console.log("note clicked");
    if (this.currentSelection) {
      this.currentSelection.classList.remove("selected");
    }
    if (this.currentSelection !== event.currentTarget) {
      this.currentSelection = event.currentTarget;
      this.currentSelection.classList.add("selected");
    }
  }


    // // To delete individual notes
    // // Open a group to hold all the SVG elements in the measure:
    // const group = context.openGroup();

    // // Draw your measure as you normally would:
    // voices.forEach(voice.draw(context, stave));

    // // Then close the group:
    // context.closeGroup();

    // // And when you want to delete it, do this:
    // context.svg.removeChild(group);
}
