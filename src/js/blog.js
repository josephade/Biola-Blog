const publishBtn = document.getElementById("publish_btn");

// if (postBlog) {
  publishBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error retrieving user session:", error.message);
      return null;
    }

    const userId = user?.user?.id;

    const tags = document
      .getElementById("tags")
      .value.split(",")
      .map((tag) => tag.trim());
    const title = document.getElementById("title").value;
    const heroImage = document.getElementById("blog_image").files[0];
    // const author = document.getElementById("author").value;
    const author = user?.user.user_metadata.full_name;
    const body = document.getElementById("content").value;
    // const btn = document.getElementById("publish-btn");
    let imageUrl;

    if (heroImage) {
      publishBtn.innerText = "Posting...";
      const imagePath = `${heroImage.name}-${Date.now()}`;
      const { data: imgData, error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(imagePath, heroImage);

      if (uploadError) {
        console.error("Error uploading image:", uploadError.message);
        return;
      }

      imageUrl = supabase.storage
        .from("blog-images")
        .getPublicUrl(imagePath).data.publicUrl;
    }

    const { data, error } = await supabase
      .from("blogs")
      .insert([
        { title, tags, hero_img: imageUrl, author, body, userId },
      ]);

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      alert("Post added!");
      publishBtn.innerText = "Publish Post.";
      window.location.href = "/";
    }
  });
// }