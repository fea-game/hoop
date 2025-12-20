import { useState, type PropsWithChildren } from "react";
import { Pose } from "./types";
import { Character } from "./character/Character";

const inputClasses = "border rounded px-2 py-1 w-full h-10";

function App() {
  const [pose, setPose] = useState<Pose>(Pose.Idle);
  const [color, setColor] = useState<string>("#bea189");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 max-w-4xl mx-auto">
      <Panel title="Editor">
        <div className="grid grid-cols-[1fr_3fr] gap-3">
          <label htmlFor="pose" className="flex items-center">
            Pose
          </label>
          <select
            id="pose"
            className={inputClasses}
            value={pose}
            onChange={(e) => setPose(e.currentTarget.value as Pose)}
          >
            {Object.values(Pose).map((pose) => (
              <option key={pose} value={pose}>
                {pose}
              </option>
            ))}
          </select>
          <label htmlFor="skin" className="flex items-center">
            Skin
          </label>
          <input
            id="skin"
            className={inputClasses}
            type="color"
            value={color}
            onChange={(e) => setColor(e.currentTarget.value)}
          />
        </div>
      </Panel>
      <Panel title="Preview">
        <Character pose={pose} color={color} />
      </Panel>
    </div>
  );
}

function Panel({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div className="border p-4 rounded flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-center">{title}</h2>
      <hr className="border-dotted" />
      {children}
    </div>
  );
}

export default App;
