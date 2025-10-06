import "./style.css";
import { setupCounter } from "./counter.ts";
import "./hello-card";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main class="page">
    <hello-card
      title="FAST Playground"
      description="Experiment with a composed web component that nests other FAST elements."
      cta="Send hello"
    >
      <p class="hint">
        <strong>Tip:</strong> Use the toggle and counter to see how child components bubble events back up.
      </p>
    </hello-card>

    <p class="footnote">
      The classic counter demo is still available below if you want to compare implementations.
    </p>

    <div class="actions">
      <button id="counter" type="button">count is 0</button>
    </div>
  </main>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
