import _ from 'lodash';

const state = {
  html: '' as string,
  slug: '' as string,
  images: [] as string[],
  editMode: false as boolean,
};

export const postStore = {
  ON_IMAGE_CHANGE: (newImages: string[], oldDImages: string[]) => {
    // console.log('new images ' + newImages);
    if (newImages.length < state.images.length) {
      const diff = _.difference(state.images, newImages);
      state.images = _.difference(state.images, diff);
      console.log(diff);
    }
    //console.log(state.images);
  },
  ADD_IMAGE: (image: string) => {
    state.images.push(image);
  },
  ON_CONTENT_CHANGE: () => {},
  ON_SLUG_CHANGE: () => {},
  INIT: () => {},
  Getters: {
    images: () => {
      return state.images;
    },
    html: () => {
      return state.html;
    },
    slug: () => {
      return state.slug;
    },
    editMode: () => {
      return state.editMode;
    },
  },
};
