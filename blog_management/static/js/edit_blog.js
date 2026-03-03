const form = document.getElementById("editBlogForm");
const alertBox = document.getElementById("alertBox");

const blogId = document.getElementById("blogId").value;

const titleInput = document.getElementById("blogTitle");
const contentInput = document.getElementById("blogContent");
const thumbnailInput = document.getElementById("blogThumbnail");
const thumbnailPreview = document.getElementById("thumbnailPreview");

/* ========================
FETCH BLOG DATA
======================== */
const myBlogNav = document.getElementById("myBlogNav");

  if (myBlogNav) {
    myBlogNav.style.display = "none";
  }

window.onload = async function () {
  const response = await fetch(`/api/blogs/${blogId}/`);

  const data = await response.json();

  titleInput.value = data.blog_title;

  contentInput.value = data.blog_content;

  if (data.blog_thumbnail) {
    thumbnailPreview.src = data.blog_thumbnail;
  }
};

/* ========================
UPDATE BLOG
======================== */

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData();

  formData.append("blog_title", titleInput.value);

  formData.append("blog_content", contentInput.value);

  if (thumbnailInput.files[0]) {
    formData.append("blog_thumbnail", thumbnailInput.files[0]);
  }

  const response = await fetch(
    `/api/blogs/edit-blog/${blogId}/`,

    {
      method: "PUT",

      body: formData,
    },
  );

  if (response.ok) {
    alertBox.innerHTML = `
        <div class="alert alert-success">
        Blog Updated Successfully
        </div>
        `;
  } else {
    alertBox.innerHTML = `
        <div class="alert alert-danger">
        Error Updating Blog
        </div>
        `;
  }
});
