import { getUser, supabase } from "../utils/supabase";

const signUpBtn = document.getElementById("sign_up_btn");
if (signUpBtn) {
  signUpBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });
    if (error) alert(error.message);
    else {
      alert("Successfully created an account!");
      window.location.href = "/";
      return data;
    }
  });
}

const signinBtn = document.getElementById("sign_in_btn");
if (signinBtn) {
  signinBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else {
      alert("Success!");
      window.location.href = "/settings";
      return data;
    }
  });
}

let name = document.getElementById("user_name");
window.addEventListener("DOMContentLoaded", async () => {
  const data = await getUser();

  const settings = document.getElementById("settings-link")
  const signup = document.getElementById("signup-link")
  console.log(data);

  if (data) {
    signup.classList.add("hidden");
    const fullName = data?.user_metadata?.full_name || null;
    console.log(fullName);
    if (fullName) {
      if(name){

        name.value = fullName;
      }
    }
  }
});

const updateBtn = document.getElementById("update_profile");
if (updateBtn) {
  const password = document.getElementById("update_password").value;

  updateBtn.addEventListener("click", async (e) => {
    if (name.value !== "" || password !== "") {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password || undefined,
        data: { full_name: name.value.trim() || undefined },
      });

      if (updateError) {
        alert(`Error updating user details: ${updateError.message}`);
      } else {
        alert("User details updated successfully!");
      }
    } else {
      alert("Can't submit empty form");
    }
  });
}
if (document.getElementById("sign_out")) {
  document.getElementById("sign_out").addEventListener("click", async (e) => {
    e.preventDefault()
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) throw error;
    else {
      window.location.href = "/";
    }
  });
}
