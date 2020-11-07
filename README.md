# ZORBUM

Web application dor notes and todo

  - Todolist
  - Notebooks

# New Features!

  - Add UI and Authentication on mainpage

### Tech

Stack:

* Python, Django, DjangoRestFramework, PostgreSQL - Backend
* Javascript, ReactJS, Redux - Frontend

### Installation

Clone this repo
```sh
$ git clone https://github.com/sk8beemo/todo.git
```

Install the dependencies for python.

```sh
$ cd todolist
$ python3 -m venv env
$ source env/bin/activate
$ pip install -r requirements.txt
```

Setup the database in ```config/settings.py ```
```sh
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'DATABASE_NAME',
        'USER': 'YOUR_NAME',
        'PASSWORD': 'PASSWORD',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

Install the dependencies for node.
```sh
$ cd ui
$ npm init
$ npm run build
```

Run 
```sh
python manage.py migrate 
```
Run 
```sh
python manage.py collectstatic
```
Run 
```sh 
python manage.py createsuperuser 
```
Run 
```sh 
python manage.py runserver 
```

Open Browser at ```http://127.0.0.1:8000```