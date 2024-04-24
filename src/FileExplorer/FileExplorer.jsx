import { useState } from 'react';
import * as Classes from './FileExplorer.module.css';
import CTA from './CTA';

const FileExplorer = ({
  data,
  addFile,
  addFolder,
  editItem,
  deleteItem,
  dynamicId = [],
}) => {
  const [showCreateInput, setShowCreateInput] = useState({});
  const [showEditInput, setShowEditInput] = useState({});

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

  const getItemUi = (item, index) => {
    return <>
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
          editItem={(event, ids) => 
            setShowEditInput({ index, dynamicId: ids, value:item.label, item })
          }
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
    </>
  }

  const handleEditKeyUp = (event) => {
    if (event.keyCode === 13) {
      const details = {
        ...showEditInput.item,
        label: event.target.value,
      };
      editItem(event, showEditInput.dynamicId, details);
      setShowEditInput({});
    }
  }

  const handleEditChange = (event) => {
    setShowEditInput(prev => (
      {
        ...prev,
        value: event.target.value
      }
    ))
  }


  return data.map((item, index) => {
    return (
      <div style={{ order: item.child ? 0 : 1 }}>
        {showEditInput.index === index ?
          <input 
          autoFocus
          value={showEditInput.value} 
          onChange={handleEditChange}
          onKeyUp={handleEditKeyUp}
          onBlur={() => setShowEditInput({})}
          /> : getItemUi(item, index)}
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
              editItem={editItem}
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
