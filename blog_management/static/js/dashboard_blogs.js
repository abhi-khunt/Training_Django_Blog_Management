let currentPage = 1;
let blogsPerPage = 9;

async function loadBlogs(page = 1) {
  const response = await fetch(`/api/blogs/?page=${page}`);
  const data = await response.json();

  const blogGrid = document.getElementById("blogGrid");
  blogGrid.innerHTML = "";
  // If no blogs exist
  if (data.results.length === 0) {
    blogGrid.innerHTML = `
        <div class="panel-box">
            <h2>Welcome to Blog Dashboard</h2>
            <p>This content is dynamic.</p>
        </div>
        `;

    return;
  }

  data.results.forEach((blog) => {
    const card = `
        <a href="/blog/${blog.id}/" class="blog-link">
        <div class="blog-card" id="${blog.id}">

            <div class="blog-author">
                ${blog.author}
            </div>

            <div class="blog-thumbnail">
                <img src="${blog.blog_thumbnail}">
            </div>

            <div class="blog-title">
                ${blog.blog_title}
            </div>

        </div>
        </a>    
        `;

    blogGrid.innerHTML += card;
  });

  document.getElementById("pageInfo").innerHTML = `Page ${page}`;

  currentPage = page;
}

document.getElementById("nextBtn").onclick = () => {
  loadBlogs(currentPage + 1);
};

document.getElementById("prevBtn").onclick = () => {
  if (currentPage > 1) loadBlogs(currentPage - 1);
};

loadBlogs();
