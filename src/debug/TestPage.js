import DebugConsole from "./DebugConsole";
import useDebugAuth from "../hooks/useDebugAuth";

export default function TestPage() {
  useDebugAuth(true);

  return <DebugConsole />;
}