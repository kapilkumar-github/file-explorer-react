import './App.css';
import { defaultStructure } from './data';
import FileExplorerRoot from './FileExplorer/FileExplorerRoot';

function App() {
  return <FileExplorerRoot explorerJSON={defaultStructure} />;
}

export default App;
