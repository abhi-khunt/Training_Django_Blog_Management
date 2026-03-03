# Django Blog Management System

A full-featured blog management platform built with Django and Django REST Framework, allowing users to create, manage, and browse blogs with role-based access control.

---

## 🛠️ Tech Stack & Database

### Technology Stack

- **Backend**: Django 6.0.2
- **API**: Django REST Framework 3.16.1
- **Database**: PostgreSQL (with psycopg2)
- **Image Processing**: Pillow 12.1.1
- **Authentication**: JWT-based token system with cookies
- **Password Hashing**: Argon2, PBKDF2, BCrypt, and Scrypt

### Database

- **Database Engine**: PostgreSQL
- **Default Credentials** (for development):
  - Host: `localhost`
  - Port: `5432`
  - Database Name: `blog_management`
  - User: `postgres`
  - Password: `123456789`

---

## 📚 Project Overview

**Django Blog Management System** is a web application that enables users to:

- Register and authenticate with secure token-based authentication
- Create and manage blog posts with thumbnails
- View blogs from other users
- Manage their user profiles
- Administrators can manage users and assign roles

The system implements two distinct roles with different permission levels:

1. **Admin Users** - Can manage all users and their roles
2. **Regular Users** - Can create, read, and manage their own blogs

---

## 📊 Database Models

### 1. **User Model** (`users/models.py`)

Extends Django's `AbstractUser` with additional fields:

- `email` - Unique email address for authentication
- `profile_picture` - User's profile image (optional)
- `role` - User role type: `"admin"` or `"user"` (default: `"user"`)
- `updated_at` - Timestamp of last profile update

### 2. **Blog Model** (`blogs/models.py`)

Stores blog post information:

- `user` - Foreign key to User (blog author)
- `author` - Author name (CharField)
- `blog_title` - Title of the blog post
- `blog_thumbnail` - Blog cover image
- `blog_content` - Main blog content (max 1000 characters)
- `created_at` - Blog creation timestamp
- `updated_at` - Last modification timestamp

---

## 👥 User Roles & Permissions

### **Admin Role** (role = "admin")

**Permissions:**

- ✅ View all registered users (excluding other admins)
- ✅ Update user roles (promote/demote users)
- ✅ Delete user accounts

**API Endpoints:**

- `GET /admin/users/` - List all users
- `PUT /admin/users/<id>/` - Update user role
- `DELETE /admin/users/<id>/` - Delete a user

### **User Role** (role = "user") - Default

**Permissions:**

- ✅ Register and login
- ✅ Create new blog posts
- ✅ Read/View all blogs
- ✅ Update own blog posts
- ✅ Delete own blog posts
- ✅ View and update own profile
- ✅ Upload profile picture
- ✅ View/View other users' blogs

**API Endpoints:**

- `POST /users/register/` - Register new user
- `POST /users/login/` - Login user
- `GET /users/profile/` - Get user profile
- `PUT /users/profile/` - Update user profile
- `POST /blogs/create/` - Create a new blog
- `GET /blogs/` - List all blogs
- `GET /blogs/<id>/` - Get specific blog
- `PUT /blogs/<id>/` - Update blog
- `DELETE /blogs/<id>/` - Delete blog

---

## 🚀 Setup Instructions

### Prerequisites

- Python 3.8+ installed
- PostgreSQL database installed and running
- pip (Python package manager)

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd Training_Django_Blog_Management/blog_management
```

### Step 2: Create Virtual Environment

Create a Python virtual environment to isolate dependencies:

**On Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

Install all required Python packages from requirements.txt:

```bash
pip install -r ../requirements.txt
```

**Key Dependencies:**

- Django==6.0.2
- djangorestframework==3.16.1
- psycopg2==2.9.11
- pillow==12.1.1
- django-filter==25.2

### Step 4: Configure Database

#### Option A: Using PostgreSQL (Recommended)

1. **Install PostgreSQL** (if not already installed)

   - Download from: https://www.postgresql.org/download/
2. **Create Database**

   ```sql
   -- Open PostgreSQL terminal (psql)
   CREATE DATABASE blog_management;
   ```
3. **Configuration is already in** `blog_management/settings.py`:

   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql_psycopg2',
           'NAME': 'blog_management',
           'USER': 'postgres',
           'PASSWORD': '123456789',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

   **Change credentials if different:**

   - Update `USER`, `PASSWORD`, `HOST`, and `PORT` in `settings.py`

#### Option B: Using SQLite (for development only)

Uncomment the SQLite section in `blog_management/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

### Step 5: Run Database Migrations

Create the database tables and schema:

```bash
python manage.py migrate
```

This command:

- Creates all tables from models
- Applies initial migrations from apps (users, blogs, etc.)
- Sets up Django's default tables

### Step 6: Create a Superuser (Admin)

Create an admin user for the Django admin panel:

```bash
python manage.py createsuperuser
```

You'll be prompted to enter:

- Username
- Email
- Password (enter twice for confirmation)

This user will have admin access to `/admin/` dashboard.

### Step 7: Create Static Files

Collect static files (CSS, JavaScript) for production:

```bash
python manage.py collectstatic --noinput
```

### Step 8: Run Development Server

Start the Django development server:

```bash
python manage.py runserver
```

Server will be available at: `http://127.0.0.1:8000/`

---

## 📁 Project Structure

```
blog_management/
├── manage.py                    # Django management script
├── requirements.txt             # Python dependencies
│
├── blog_management/             # Main project settings
│   ├── settings.py             # Project settings & database config
│   ├── urls.py                 # Main URL router
│   ├── wsgi.py                 # WSGI configuration
│   └── asgi.py                 # ASGI configuration
│
├── users/                       # User app (authentication & profiles)
│   ├── models.py               # User model
│   ├── views.py                # Authentication views
│   ├── serializers.py          # User serializers
│   ├── urls.py                 # User URL routes
│   └── migrations/             # Database migrations
│
├── blogs/                       # Blog app (blog management)
│   ├── models.py               # Blog model
│   ├── views.py                # Blog API views
│   ├── serializers.py          # Blog serializers
│   ├── pagination.py           # Pagination config
│   ├── urls.py                 # Blog URL routes
│   └── migrations/             # Database migrations
│
├── admin_panel/                 # Admin management panel
│   ├── models.py               # Admin models
│   ├── views.py                # Admin views
│   ├── serializers.py          # Admin serializers
│   └── urls.py                 # Admin URL routes
│
├── frontend/                    # Frontend app
│   ├── views.py                # Template views
│   ├── urls.py                 # Frontend URL routes
│   └── models.py               # Frontend models
│
├── utils/                       # Utilities & helpers
│   ├── auth.py                 # Token authentication helpers
│   └── models.py               # Utility models
│
├── static/                      # Static files
│   ├── css/                    # Stylesheets
│   └── js/                     # JavaScript files
│
├── templates/                   # HTML templates
│   ├── login.html
│   ├── register.html
│   ├── create_blog.html
│   ├── edit_blog.html
│   ├── profile.html
│   ├── admin_dashboard.html
│   └── ...
│
└── media/                       # User-uploaded files
    ├── blog_thumbnail/         # Blog post images
    └── media/profile_pic/      # User profile pictures
```

---

## 💡 Usage Examples

### Register a New User

```bash
POST /users/register/
Content-Type: application/json

{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword123"
}
```

### Login User

```bash
POST /users/login/
Content-Type: application/json

{
    "username": "john_doe",
    "password": "securepassword123"
}
```

Response includes JWT token in HttpOnly cookie

### Create a Blog Post

```bash
POST /blogs/create/
Authorization: Token <access_token>
Content-Type: multipart/form-data

{
    "title": "My First Blog",
    "content": "This is the blog content...",
    "thumbnail": <image_file>
}
```

### Admin: List All Users

```bash
GET /admin/users/
Authorization: Token <admin_token>
```

### Admin: Update User Role

```bash
PUT /admin/users/<user_id>/
Authorization: Token <admin_token>
Content-Type: application/json

{
    "role": "admin"
}
```

---

## 🔒 Security Features

- ✅ **Password Hashing**: Argon2, PBKDF2, BCrypt algorithms
- ✅ **JWT Tokens**: Secure token-based authentication
- ✅ **HttpOnly Cookies**: Prevents XSS attacks
- ✅ **CSRF Protection**: Built-in Django CSRF middleware
- ✅ **Role-Based Access Control**: Admin vs User permissions
- ✅ **Email Validation**: Unique email requirement
- ✅ **Token Verification**: Validates token before allowing API access

---

## 🐛 Common Issues & Solutions

### Issue: PostgreSQL Connection Failed

**Solution:**

- Ensure PostgreSQL is running
- Check database credentials in `settings.py`
- Verify the database exists: `CREATE DATABASE blog_management;`

### Issue: "No module named 'psycopg2'"

**Solution:**

```bash
pip install psycopg2-binary
```

### Issue: Port 5432 Already in Use

**Solution:**

- Change the PORT in `settings.py` to a different port (e.g., 5433)
- Or stop the process using port 5432

### Issue: Images Not Uploading

**Solution:**

- Ensure `media/` folder exists
- Check folder permissions (must be writable)
- Verify `MEDIA_ROOT` and `MEDIA_URL` in `settings.py`

### Issue: Static Files Not Loading

**Solution:**

```bash
# Delete old static files
rm -rf static/*

# Recollect static files
python manage.py collectstatic --noinput
```

---

## 📚 API Documentation

### Authentication Endpoints

- `POST /users/register/` - User registration
- `POST /users/login/` - User login
- `GET /users/profile/` - Get user profile
- `PUT /users/profile/` - Update user profile

### Blog Endpoints

- `POST /blogs/create/` - Create new blog
- `GET /blogs/` - List all blogs (with pagination)
- `GET /blogs/<id>/` - Get specific blog
- `PUT /blogs/<id>/` - Update blog
- `DELETE /blogs/<id>/` - Delete blog

### Admin Endpoints

- `GET /admin/users/` - List all users
- `PUT /admin/users/<id>/` - Update user role
- `DELETE /admin/users/<id>/` - Delete user

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Submit a pull request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Support

For issues or questions:

- Create an issue in the repository
- Contact the project maintainer

---

**Last Updated**: March 2026
**Version**: 1.0.0
**Django Version**: 6.0.2
