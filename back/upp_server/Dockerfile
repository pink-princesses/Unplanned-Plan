FROM python:3.9.6

WORKDIR /docker-workplace/upp-server

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

RUN python3 manage.py makemigrations
RUN python3 manage.py migrate
CMD ["python3", "manage.py", "runserver", "0:8000"]

EXPOSE 8000