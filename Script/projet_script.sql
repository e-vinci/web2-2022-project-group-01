drop table friends;
drop table games;
drop table levels;
drop table users

create table levels
(
    num_level  integer
        primary key autoincrement,
    xp_require integer not null,
    xp_limit   integer not null
);

create table users
(
    id_user  integer
        primary key autoincrement,
    username varchar(20) not null,
    password varchar(50) not null,
    level    integer
        references levels,
    xp       integer     not null
);

create table friends
(
    users1 integer not null,
    users2 integer not null,
    primary key (users1, users2)
);


create table games
(
    id_game integer
        primary key autoincrement,
    user    integer
        references users,
    score   integer not null
);

insert into levels ( xp_require, xp_limit) values (0,100);
insert into levels ( xp_require, xp_limit) values (101,200);
insert into levels ( xp_require, xp_limit) values (201,300);

insert into users ( username, password, level, xp)values ('bob le j1','password',1,50);
insert into users ( username, password, level, xp)values ('omar le j2','mdp2',2,150);
insert into users ( username, password, level, xp)values ('andrei j3','password3',1,0);
insert into games (user, score)values (1,200);
insert into games (user, score)values (1,30);
insert into games (user, score)values (1,22);
insert into games  (user, score)values (2,235);
insert into games  (user, score)values (2,74);

insert into friends (users1, users2) values (1,2);
insert into friends (users1, users2) values (1,3);
insert into friends (users1, users2) values (2,3);
