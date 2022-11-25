import Quill from 'quill';
import { getElById } from '../helpers/htmlFuncs';
import { SavePost } from '../api/post';
import _ from 'lodash';
import { uploadPostImage } from '../api/post';

let editor = {} as Quill;

let toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['link', 'image'],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];

export default function initPost() {
  editor = new Quill('#editor', {
    modules: { toolbar: toolbarOptions },
    theme: 'snow',
  });

  editor.getModule('toolbar').addHandler('image', imageHandler);
  getElById('post-submit')?.addEventListener('click', onSavePost);
}

async function onSavePost() {
  const slug = _.kebabCase(
    (getElById('create-post-slug') as HTMLInputElement).value
  );
  const draft = (getElById('post-draft') as HTMLInputElement).checked;
  const post = editor.root.innerHTML;
  const json = JSON.stringify(post);

  await SavePost(json, slug, draft);
}

async function imageHandler() {
  const input = document.createElement('input');

  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    var file: any = input.files![0];
    var formData = new FormData();

    formData.append('image', file);

    var fileName = file.name;
    const res = await uploadPostImage(fileName, file);
    console.log(res);
  };
}
