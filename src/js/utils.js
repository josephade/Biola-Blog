import { supabase } from '../utils/supabase';

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    timeZone: "UTC",
  })
}

export function formatBlogPosts(posts, {
  filterOutDrafts = true,
  filterOutFuturePosts = true,
  sortByDate = true,
  limit = undefined,
} = {}) {

  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter;
    // filterOutDrafts if true
    if (filterOutDrafts && draft) return acc;

    // filterOutFuturePosts if true
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

    // add post to acc
    acc.push(post)

    return acc;
  }, [])

  // sortByDate or randomize
  if (sortByDate) {
    filteredPosts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  } else {
    filteredPosts.sort(() => Math.random() - 0.5)
  }

  // limit if number is passed
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;

}


// export async function createPost(title, content, author_id) {
//   const { data, error } = await supabase.from('blogs').insert([{ title, content, author_id }]);
//   if (error) throw error;
//   return data;
// }



export async function getPosts() {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);
  if (error) throw error;
  return data;
}

export async function updatePost(post_id, updates) {
  const { data, error } = await supabase.from('blogs').update(updates).eq('id', post_id);
  if (error) throw error;
  return data;
}

export async function deletePost(post_id) {
  const { data, error } = await supabase.from('blogs').delete().eq('id', post_id);
  if (error) throw error;
  return data;
}

// Comment functions
export async function addComment(post_id, content, author_id) {
  const { data, error } = await supabase.from('comments').insert([{ post_id, content, author_id }]);
  if (error) throw error;
  return data;
}

export async function getComments(post_id) {
  const { data, error } = await supabase.from('comments').select('*').eq('post_id', post_id);
  if (error) throw error;
  return data;
}