import { useState } from 'react';
import * as Classes from './FileExplorer.module.css';

const CTA = ({ item, index, addFile, addFolder, deleteItem, dynamicId }) => {
  return (
    <div className={Classes.ctaWrapper}>
      <button title="Rename" className={Classes.btnAction}>
        <i class="fa-regular fa-edit"></i>
      </button>
      {item.child && (
        <button
          title="Add File"
          className={Classes.btnAction}
          onClick={(event) => addFile(event, [index, ...dynamicId])}
        >
          <i class="fa-regular fa-file"></i>
        </button>
      )}
      {item.child && (
        <button
          title="Add Folder"
          className={Classes.btnAction}
          onClick={(event) => addFolder(event, [index, ...dynamicId])}
        >
          <i class="fa-regular fa-folder"></i>
        </button>
      )}
      <button
        title="Delete"
        className={Classes.btnDelete}
        onClick={(event) => deleteItem(event, [index, ...dynamicId])}
      >
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </div>
  );
};

const FileExplorer = ({
  data,
  addFile,
  addFolder,
  deleteItem,
  dynamicId = [],
}) => {
  const [showCreateInput, setShowCreateInput] = useState({});
  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      if (showCreateInput.type === 'file') {
        const fileDetails = {
          label: event.target.value,
          id: new Date().getTime(),
        };
        addFile(event, showCreateInput.dynamicId, fileDetails);
      } else {
        const folderDetails = {
          label: event.target.value,
          id: new Date().getTime(),
          child: [],
        };
        addFolder(event, showCreateInput.dynamicId, folderDetails);
      }
      setShowCreateInput({});
    }
  };
  return data.map((item, index) => {
    return (
      <div style={{ order: item.child ? 0 : 1 }}>
        <div className={Classes.item}>
          <div>
            <i
              class={`fa-solid fa-${item.child ? 'folder' : 'file'}`}
              style={{ marginRight: '10px', fontSize: '15px' }}
            ></i>
            <label>{item.label}</label>
          </div>
          <CTA
            item={item}
            index={index}
            addFile={(event, ids) =>
              setShowCreateInput({ index, type: 'file', dynamicId: ids })
            }
            addFolder={(event, ids) =>
              setShowCreateInput({ index, type: 'folder', dynamicId: ids })
            }
            deleteItem={deleteItem}
            dynamicId={dynamicId}
          />
        </div>
        {showCreateInput.index === index && (
          <input
            className={Classes.inputField}
            type="text"
            onKeyUp={handleKeyUp}
            onBlur={() => setShowCreateInput({})}
          />
        )}
        <div
          style={{
            padding: '5px 0 0 20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {item.child && (
            <FileExplorer
              data={item.child}
              addFile={addFile}
              addFolder={addFolder}
              deleteItem={deleteItem}
              dynamicId={[index, ...dynamicId]}
            />
          )}
        </div>
      </div>
    );
  });
};

export default FileExplorer;
