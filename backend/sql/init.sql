-- Version ??? ==> 1

-- general table
create table general
(
    version integer not null
);

insert into general
values (1);


-- user_info table
create table user_info
(
    uuid       uuid    not null
        primary key,
    email      text    not null,
    username   text    not null,
    permission integer not null default 0,
    created_at bigint  not null default extract(epoch from now()) * 1000
);


-- user_security table
create table user_security
(
    uuid            uuid    not null
        primary key,
    hashed_password text    not null,
    updated_at      bigint  not null default extract(epoch from now()) * 1000
);

-- user_token table
create table user_token
(
    token text not null
        primary key,
    uuid  uuid not null
);

-- user_version table
create table user_version
(
    uuid    uuid primary key not null,
    version text             not null
);

create table user_emails
(
    id         serial primary key,
    uuid       uuid    not null,
    email      text    not null unique,
    created_at bigint  not null default extract(epoch from now()) * 1000,
    verified   boolean not null default false
);

create table user_email_verify
(
    id         serial primary key,
    uuid       uuid   not null,
    email      text   not null,
    token      text   not null,
    created_at bigint not null default extract(epoch from now()) * 1000
);

create table consumption_history
(
    id         serial
        primary key,
    user_uuid  uuid    not null,
    product_id text    not null,
    price      integer not null,
    time       bigint  not null default extract(epoch from now()) * 1000
);

create table notification
(
    id     serial  not null
        primary key,
    uuid   uuid    not null,
    key    text    not null,
    option boolean not null default false
);

create table key_file
(
    name    text not null
        primary key,
    content text
);
insert into key_file (name, content)
values ('notice', '# This is a notice.');

create table user_notification
(
    user_uuid uuid not null
        primary key,
    email     text
);
