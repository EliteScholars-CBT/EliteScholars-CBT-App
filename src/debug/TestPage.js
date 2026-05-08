import DebugConsole from "./DebugConsole";
import useDebugAuth from "../hooks/useDebugAuth";

export default function TestPage() {
  const { logs } = useDebugAuth(true);

  return <DebugConsole logs={logs} />;
}