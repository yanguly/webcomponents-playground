import { useEffect, useRef, useState } from "preact/hooks";

const ELEMENTS_ENTRY = new URL(
  "../../kxl-wc/dist/elements/browser/main.js",
  import.meta.url,
).href;

type ElementsState = "pending" | "ready" | "missing";

export function App() {
  const counterRef = useRef<HTMLElement>(null);
  const [value, setValue] = useState(0);
  const [elementsState, setElementsState] = useState<ElementsState>("pending");

  useEffect(() => {
    let cancelled = false;

    import(/* @vite-ignore */ ELEMENTS_ENTRY)
      .then(() => {
        if (!cancelled) {
          setElementsState("ready");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setElementsState("missing");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) {
      return;
    }

    const handleValueChange = (event: Event) => {
      const detail = (event as CustomEvent<number>).detail ?? 0;
      setValue(detail);
    };

    el.addEventListener("valueChange", handleValueChange as EventListener);
    return () => {
      el.removeEventListener("valueChange", handleValueChange as EventListener);
    };
  }, []);

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Preact × Angular Elements</p>
        <h1>Shared Widgets Demo</h1>
        <p className="lead">
          This Preact page consumes the `kxl-counter` and `kxl-metric-card`
          custom elements built from the Angular workspace.
        </p>
        <StatusBanner state={elementsState} />
      </header>

      <section className="card">
        <header className="card__header">
          <h2>Interactive Counter</h2>
          <p>
            Drive the value by clicking the Angular-provided custom element.
          </p>
        </header>
        <div className="card__body">
          <kxl-counter ref={counterRef as any} step={1}></kxl-counter>
          <p className="value-readout">Current value: {value}</p>
        </div>
      </section>

      <section className="card metric-grid">
        <header className="card__header">
          <h2>Metric Snapshots</h2>
          <p>Rendered entirely via Angular Elements inside a Preact layout.</p>
        </header>
        <div className="metric-grid__content">
          <kxl-metric-card
            label="Conversion Rate"
            value="42%"
            change="5.4"
            annotation="Rolling 7-day average"
          ></kxl-metric-card>
          <kxl-metric-card
            label="Error Budget"
            value="98.7%"
            change="-1.3"
            annotation="SLO for the current sprint"
          ></kxl-metric-card>
        </div>
      </section>
    </div>
  );
}

function StatusBanner({ state }: { state: ElementsState }) {
  if (state === "pending") {
    return <p className="status">Loading Angular elements…</p>;
  }

  if (state === "missing") {
    return (
      <p className="status status--warning">
        Angular Elements bundle not found. Run `npm run build:elements` in
        `components/kxl-wc` first.
      </p>
    );
  }

  return <p className="status status--ok">Angular Elements loaded.</p>;
}
