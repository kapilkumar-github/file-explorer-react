import * as Classes from '../FileExplorer.module.css';

const CTA = ({ item, index, addFile, addFolder, editItem, deleteItem, dynamicId }) => {
    return (
        <div className={Classes.ctaWrapper}>
            <button title="Rename" className={Classes.btnAction} onClick={(event) => editItem(event, [index, ...dynamicId])}>
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

export default CTA