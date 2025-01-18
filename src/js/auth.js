import { supabase } from "../utils/supabase";

// export async function signUp(email, password) {
//   const { data, error } = await supabase.auth.signUp({ email, password });
//   if (error) throw error;
//   console.log(data);
//   return data;
// }

const signUpForm = document.getElementById("sign_up");
if (signUpForm) {
  signUpForm.addEventListener("submit", async (e) => {
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

const signinForm = document.getElementById("sign_in");
if (signinForm) {
  signinForm.addEventListener("submit", async (e) => {
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
      window.location.href = "/";
      return data;
    }
  });
}

// export async function signIn(email, password) {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });
//   if (error) throw error;
//   return data;
// }

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
