import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
  
      if (error) {
        console.error("Error retrieving user session:", error.message);
        return null;
      }
      return data.user;
    } catch (err) {
      console.error("Error retrieving session:", err.message);
      return null;
    }
  }

  async function confirmUserAccess() {
    const user = await getUser();
    const actionBtns = document.getElementById("action_btns");
    const blogUserId = document.getElementById("blogUserId").value;

    if (blogUserId === user.id) {
      actionBtns.classList.remove("hidden");
      actionBtns.classList.add("flex");
    }
  }
  // export async function uploadImg(heroImage, imagePath){
  //   const imagePath = `${heroImage.name}-${Date.now()}`;
  //   const { data: imgData, error: uploadError } = await supabase.storage
  //     .from("blog-images")
  //     .upload(imagePath, heroImage);

  //   if (uploadError) {
  //     console.error("Error uploading image:", uploadError.message);
  //     return;
  //   }

  //   imageUrl = supabase.storage.from("blog-images").getPublicUrl(imagePath)
  //     .data.publicUrl;
  // }