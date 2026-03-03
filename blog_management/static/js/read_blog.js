document.addEventListener("DOMContentLoaded", async function () {

    const blogId = document.getElementById("blogId").value;

    const response = await fetch(`/api/blogs/${blogId}/`);

    const data = await response.json();


    document.getElementById("blogTitle").innerText =
        data.blog_title;


    document.getElementById("blogContent").innerText =
        data.blog_content;


    document.getElementById("blogThumbnail").src =
        data.blog_thumbnail;

});