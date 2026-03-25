# Student Management System - Django Experiment

This is a mid-complexity Django application for managing students and courses.

## Features
- CRUD operations for Students
- Course management
- Django Admin interface

## Setup
1. Activate virtual environment: `.\venv\Scripts\activate`
2. Run migrations: `python manage.py migrate`
3. Create superuser: `python manage.py createsuperuser`
4. Run server: `python manage.py runserver`

## Usage
- Visit http://127.0.0.1:8000/ for student list
- Visit http://127.0.0.1:8000/admin/ for admin interface (username: admin, password: admin123)

## Models
- Course: name, description
- Student: name, email, age, course