# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# FileExplorerRoot
- This works as the entry point for file explorer tree.
- It require only one argument which is initial data object to show file explorer tree
- Intial payload will be stored in a state and any change to explorer tree should be set to this state
- All the update functions are defined in FileExplorerRoot component. (insertItem, deleteItem, editItem)
- These functions are passed to child components through prop drilling

# FileExlorer 
- This is the recursive component that traverse the explorer object and render the file and folders accordingly.

# CTA
- Contains the option menu for items.

# Dynamic Id
- Dynamic Id array contains the index of each object (file object, folder object)
- While rendering each item recursively a sequence is maintained in an array so that it's easy to traverse to the item when an operation is performed on it.
- For any kind of update to an item, dynamic id helps by providing the direct path to that item in the tree and update it.