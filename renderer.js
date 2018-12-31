const marked = require("marked");
const { ipcRenderer, remote } = require("electron");
const mainProcessAccessFile = remote.require("./lib/accessFile");
const currentWindow = remote.getCurrentWindow();

let filePath = null;
let originalContent = "";
let inputContent = "";
let watchEditState = false;

const markedTextArea = document.getElementById("markedTextArea");
const markedView = document.getElementById("markedView");

const renderMarkdownToHtml = markdown => {
  markedView.innerHTML = marked(markdown, { sanitize: true });
};

const updateEditedState = isEdited => {
  currentWindow.documentEdited = isEdited;
  let title = "Markr";

  if (filePath) {
    fileName = filePath.split("/").pop();
    title = `${fileName} - ${title}`;
  } else if (!filePath) {
    title = `untitled - ${title}`;
  }
  if (isEdited) {
    title = `${title} (Edited)`;
  }
  currentWindow.setTitle(title);
  console.log(currentWindow.documentEdited);
};

markedTextArea.addEventListener("keyup", e => {
  inputContent = e.target.value;
  watchEditState = originalContent !== inputContent;
  renderMarkdownToHtml(inputContent);
  updateEditedState(watchEditState);
});

ipcRenderer.on("file-opened", (event, file, content) => {
  filePath = file;
  originalContent = content;

  markedTextArea.value = content;
  renderMarkdownToHtml(content);

  updateEditedState(false);
});

ipcRenderer.on('open-file', event => {
  mainProcessAccessFile.openFile(currentWindow,filePath)
})

ipcRenderer.on("save-file", event => {
  mainProcessAccessFile.saveFile(currentWindow, filePath, markedTextArea.value)
});
