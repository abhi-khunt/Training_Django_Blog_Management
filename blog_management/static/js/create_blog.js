document.addEventListener("DOMContentLoaded", function () {

  const createBlogNav = document.getElementById("createBlogNav");
  const blog_Form = document.getElementById("blogForm");
  const alertBox = document.getElementById("alertBox");

  if (createBlogNav) {
    createBlogNav.style.display = "none";
  }


  blog_Form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const title =
      document.getElementById("blogTitle").value.trim();

    const content =
      document.getElementById("blogContent").value.trim();

    const thumbnail =
      document.getElementById("blogThumbnail").files[0];


    if (!title || !content) {

      showAlert("All fields are required");
      return;
    }


    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }


    try {

      const response = await fetch("/api/blogs/create/", {

        method: "POST",

        headers: {
          "X-CSRFToken": getCSRFToken(),
        },

        body: formData,

      });


      const data = await response.json();


      if (response.ok) {

        showAlert("Blog created successfully", "success");

        blog_Form.reset();

      } else {

        showAlert("Error creating blog");

      }

    } catch {

      showAlert("Server error");

    }

  });


  function showAlert(message, type = "danger") {

    alertBox.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show">
            ${message}
            <button type="button" class="btn-close"
                    data-bs-dismiss="alert"></button>
        </div>
    `;

  }


  function getCSRFToken() {

    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken"))
      ?.split("=")[1];

  }

});