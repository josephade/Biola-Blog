import { getUser, supabase } from "../utils/supabase";

const publishBtn = document.getElementById("publish_btn");

if (publishBtn) {
  publishBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const user = await getUser();

    const userId = user?.user?.id;

    const tags = document
      .getElementById("tags")
      .value.split(",")
      .map((tag) => tag.trim());
    const title = document.getElementById("title").value;
    const heroImage = document.getElementById("blog_image").files[0];
    // const author = document.getElementById("author").value;
    const author = user?.user?.user_metadata?.full_name;
    const body = document.getElementById("content").value;
    // const btn = document.getElementById("publish-btn");
    let imageUrl;

    if (heroImage) {
      const imagePath = `${heroImage.name}-${Date.now()}`;
      const { data: imgData, error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(imagePath, heroImage);

      if (uploadError) {
        console.error("Error uploading image:", uploadError.message);
        return;
      }

      imageUrl = supabase.storage.from("blog-images").getPublicUrl(imagePath)
        .data.publicUrl;

      publishBtn.innerText = "Posting...";
      const { data, error } = await supabase
        .from("blogs")
        .insert([{ title, tags, hero_img: imageUrl, author, body, userId }]);

      if (error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("Post added!");
        publishBtn.innerText = "Publish Post.";
        window.location.href = "/";
      }
    } else {
      alert("Add an image");
    }
  });
}

const updateBlogBtn = document.getElementById("update-blog_btn");

const user = await getUser();
const author = user?.user?.user_metadata?.full_name,
  title = document.getElementById("edit-title"),
  body = document.getElementById("edit-content"),
  tags = document.getElementById("edit-tags"),
  hero_image = document.getElementById("edit-blog_image");

// title.addEventListener("change", (e) => {
//   console.log(e.target.value)
//   let titleValue = title.value;
// })

if (updateBlogBtn) {
  const blogId = document
    .getElementById("create_blog")
    .getAttribute("data-blog-id");
  updateBlogBtn.addEventListener("click", async (e) => {
    let imageUrl;
    console.log(title.value);
    e.preventDefault();

    const imagePath = `${hero_image.name}-${Date.now()}`;
    const { data: imgData, error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(imagePath, hero_image.files[0]);

    if (uploadError) {
      console.error("Error uploading image:", uploadError.message);
      return;
    }

    imageUrl = supabase.storage.from("blog-images").getPublicUrl(imagePath)
      .data.publicUrl;

    if (blogId) {
      const { data, error } = await supabase
        .from("blogs")
        .update({
          title: title.value,
          tags: tags.value.split(",").map((tag) => tag.trim()),
          hero_img: imageUrl,
          body: body.value,
          author,
        })
        .eq("id", blogId);

      if (error) {
        console.error("Error updating blog:", error.message);
      } else {
        alert("Updated!");
        window.location.href = `/blogs`;
      }
    }
  });
}

const deleteButton = document.getElementById("delete-blog-btn");

if (deleteButton)
  deleteButton?.addEventListener("click", async () => {
    const blogId = document
      .getElementById("blog-article")
      .getAttribute("data-blog-id");
    console.log(blogId);
    if (blogId) {
      if (confirm("Are you sure you want to delete this blog?")) {
        const { error } = await supabase
          .from("blogs")
          .delete()
          .eq("id", blogId);

        if (error) {
          console.error("Error deleting blog:", error.message);
        } else {
          alert("Blog deleted successfully!");
          window.location.href = "/blogs";
        }
      }
    }
  });
