import supaBase from '../Supabase';
import { getElById } from '../helpers/htmlFuncs';

export async function SavePost(post: string, slug: string, isDraft: boolean) {
  const date = new Date();
  const insert = {
    slug,
    content: post,
    is_draft: isDraft,
    created_at: date.toISOString(),
    updated_at: null,
  };
  await supaBase.from('posts').insert(insert);
  await getPost(slug);
}

export async function getPost(slug: string) {
  const post = await supaBase.from('posts').select().eq('slug', slug).single();
  const html = (post.data as BlogPost).content;

  getElById('preview')!.innerHTML = html;
}

export async function uploadPostImage(path: string, file: File) {
  const { data, error } = await supaBase.storage
    .from('p_images')
    .upload(`public/${path}`, file);
  if (error) {
    console.log(error);
    alert('Error uploading file!');
    return null;
  }
  const res = await supaBase.storage
    .from('p_images')
    .getPublicUrl(`public/${path}`);

  return res.data.publicUrl;
}

export async function removePostImages(paths: Array<string>) {
  const { data, error } = await supaBase.storage.from('p_images').remove(paths);
  if (error) {
    console.log(error);
    alert('Error removing images');
  }
  return null;
}

export type BlogPost = {
  id: number;
  slug: string;
  content: string;
  is_draft: boolean;
  created_at: string;
  updated_at: string | null;
};
