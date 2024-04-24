import { useState } from 'react';
import FileExplorer from '../FileExplorer/FileExplorer';
import { traverse } from '../FileExplorer/FileExplorer.helper';

const FileExplorerRoot = ({ explorerJSON }) => {
  const [data, setData] = useState(explorerJSON);

  const deleteItem = (event, dynamicStack) => {
    let dataCopy = [...data];
    let temp = dataCopy;
    temp = traverse(dynamicStack, temp);
    if (temp) {
      temp.splice(dynamicStack[0], 1);
      setData(dataCopy);
    }
  };

  const insertItem = (event, dynamicStack, itemDetails) => {
    let dataCopy = [...data];
    let temp = dataCopy;
    temp = traverse(dynamicStack, temp);
    if (temp) {
      temp[dynamicStack[0]].child.push(itemDetails);
      setData(dataCopy);
    }
  };

  const editItem = (event, dynamicStack, details) => {
    let dataCopy = [...data];
    let temp = dataCopy;
    temp = traverse(dynamicStack, temp);
    if (temp) {
      temp[dynamicStack[0]] = {...details}
      setData(dataCopy);
    }
  }

  return (
    <FileExplorer
      data={data}
      addFile={insertItem}
      addFolder={insertItem}
      editItem={editItem}
      deleteItem={deleteItem}
    />
  );
};

export default FileExplorerRoot;
