document.addEventListener("DOMContentLoaded", function () {
  // Hide Create Blog button
  const myBlogNav = document.getElementById("myBlogNav");

  if (myBlogNav) {
    myBlogNav.style.display = "none";
  }
  let currentPage = 1;

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit-btn")) {
      const id = e.target.dataset.id;

      window.location.href = `/edit-blog/${id}/`;
    }
  });

  document.getElementById("nextBtn").onclick = () => {
    loadBlogs(currentPage + 1);
  };

  document.getElementById("prevBtn").onclick = () => {
    if (currentPage > 1) loadBlogs(currentPage - 1);
  };
  loadBlogs();
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

async function loadBlogs(page = 1) {
  const response = await fetch(`/api/blogs/my-blogs/?page=${page}`);
  const data = await response.json();

  const blogGrid = document.getElementById("blogGrid");

  blogGrid.innerHTML = "";

  // No Blogs Message
  if (data.results.length === 0) {
    blogGrid.innerHTML = `
        <div class="panel-box">
            <h2>No Blogs Found</h2>
            <p>Create your first blog</p>
        </div>
        `;

    return;
  }

  data.results.forEach((blog) => {
    const card = `
        <div class="blog-card">

            <div class="blog-author">
                ${blog.author}
            </div>

            <div class="blog-thumbnail">
                <img src="${blog.blog_thumbnail}">
            </div>

            <div class="blog-title">
                ${blog.blog_title}
            </div>

            <div class="blog-actions">

                <button class="edit-btn" data-id="${blog.id}">
                  Edit
                </button>

                <button class="delete-btn"
                 onclick="deleteBlog(${blog.id})">
                 Delete
                </button>

            </div>

        </div>
        `;

    blogGrid.innerHTML += card;
  });

  document.getElementById("pageInfo").innerHTML = `Page ${page}`;

  currentPage = page;
} 

function editBlog(id) {
  window.location.href = `/edit-blog/${id}/`;
}

async function deleteBlog(id) {
  if (!confirm("Delete this blog?")) return;

  await fetch(`/api/blogs/edit-blog/${id}/`, {
    method: "DELETE",
  });

  loadBlogs(currentPage);
}
