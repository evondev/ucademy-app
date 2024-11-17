/* eslint-disable @typescript-eslint/no-explicit-any */

export const editorOptions = (field: any, theme: any) => ({
  initialValue: '',
  onBlur: field.onBlur,
  onEditorChange: (content: any) => field.onChange(content),
  init: {
    codesample_global_prismjs: true,
    skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
    height: 300,
    menubar: false,
    plugins: [
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'codesample',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'heading',
    ],
    toolbar:
      'undo redo | ' +
      'codesample | bold italic forecolor | alignleft aligncenter |' +
      'alignright alignjustify | bullist numlist |' +
      'image |' +
      'h1 h2 h3 h4 h5 h6 | preview | fullscreen |' +
      'link',
    content_style:
      "@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');body { font-family: Manrope,Helvetica,Arial,sans-serif; font-size:14px; line-height: 2; padding-bottom: 32px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; };",
  },
});
export const lastLessonKey = 'lastLesson';
export const allValue = 'ALL';
export const ITEMS_PER_PAGE = 10;
export const MAX_COMMENT_LEVEL = 3;
