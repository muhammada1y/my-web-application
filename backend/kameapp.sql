CREATE DATABASE kamiapp;


CREATE TABLE user_info (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);



CREATE TABLE mp3 (
    mp3_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    file_data BYTEA,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES public.user_info(user_id)
)
