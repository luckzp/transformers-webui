"use client";
import { useEffect, useRef, useState } from "react";
import LanguageSelector from "./components/LanguageSelector";
import Progress from "./components/Progress";

interface ProgressItem {
  file: string;
  progress: number;
}

interface WorkerMessage {
  status: string;
  file?: string;
  progress?: number;
  output?: string;
}

export default function Page() {
  // Model loading
  const [ready, setReady] = useState<boolean | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [progressItems, setProgressItems] = useState<ProgressItem[]>([]);

  // Inputs and outputs
  const [input, setInput] = useState<string>("I love walking my dog.");
  const [sourceLanguage, setSourceLanguage] = useState<string>("eng_Latn");
  const [targetLanguage, setTargetLanguage] = useState<string>("fra_Latn");
  const [output, setOutput] = useState<string>("");

  // Create a reference to the worker object.
  const worker = useRef<Worker | null>(null);

  // We use the `useEffect` hook to setup the worker as soon as the `App` component is mounted.
  useEffect(() => {
    if (!worker.current) {
      // Create the worker if it does not yet exist.
      worker.current = new Worker(new URL("./worker.js", import.meta.url), {
        type: "module",
      });
    }

    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e: MessageEvent<WorkerMessage>) => {
      switch (e.data.status) {
        case "initiate":
          // Model file start load: add a new progress item to the list.
          setReady(false);
          setProgressItems((prev) => [
            ...prev,
            { file: e.data.file!, progress: 0 },
          ]);
          break;

        case "progress":
          // Model file progress: update one of the progress items.
          setProgressItems((prev) =>
            prev.map((item) => {
              if (item.file === e.data.file) {
                return { ...item, progress: e.data.progress! };
              }
              return item;
            })
          );
          break;

        case "done":
          // Model file loaded: remove the progress item from the list.
          setProgressItems((prev) =>
            prev.filter((item) => item.file !== e.data.file)
          );
          break;

        case "ready":
          // Pipeline ready: the worker is ready to accept messages.
          setReady(true);
          break;

        case "update":
          // Generation update: update the output text.
          setOutput(e.data.output!);
          break;

        case "complete":
          // Generation complete: re-enable the "Translate" button
          setDisabled(false);
          break;
      }
    };

    // Attach the callback function as an event listener.
    worker.current.addEventListener("message", onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () => {
      worker.current?.removeEventListener("message", onMessageReceived);
    };
  }, []);

  const translate = () => {
    setDisabled(true);
    worker.current?.postMessage({
      text: input,
      src_lang: sourceLanguage,
      tgt_lang: targetLanguage,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-8 text-center">
      <h1 className="text-5xl font-bold mb-2">Transformers.js</h1>
      <h2 className="text-2xl mb-6">
        ML-powered multilingual translation in React!
      </h2>

      <div className="space-y-4">
        <div className="flex justify-center gap-5">
          <LanguageSelector
            type={"Source"}
            defaultLanguage={"eng_Latn"}
            onChange={(x: React.ChangeEvent<HTMLSelectElement>) =>
              setSourceLanguage(x.target.value)
            }
          />
          <LanguageSelector
            type={"Target"}
            defaultLanguage={"fra_Latn"}
            onChange={(x: React.ChangeEvent<HTMLSelectElement>) =>
              setTargetLanguage(x.target.value)
            }
          />
        </div>

        <div className="flex justify-center gap-5">
          <textarea
            value={input}
            rows={3}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInput(e.target.value)
            }
            className="w-1/2 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <textarea
            value={output}
            rows={3}
            readOnly
            className="w-1/2 p-2 rounded border border-gray-300 bg-gray-100"
          ></textarea>
        </div>
      </div>

      <button
        disabled={disabled}
        onClick={translate}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Translate
      </button>

      <div className="mt-4 h-36">
        {ready === false && <p>Loading models... (only run once)</p>}
        {progressItems.map((data) => (
          <div key={data.file}>
            <Progress text={data.file} percentage={data.progress} />
          </div>
        ))}
      </div>
    </div>
  );
}
