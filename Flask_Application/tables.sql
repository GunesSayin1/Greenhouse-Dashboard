create table plant_dictionary
(
    dict_id           int auto_increment
        primary key,
    plant_name        varchar(120) null,
    gh_co2            float        null,
    gh_temperature    float        null,
    plant_temperature float        null,
    reoccur           bit          null
);

create table revoked_tokens
(
    id  int auto_increment
        primary key,
    jti varchar(120) null
);

create table sensor_entries
(
    entry_id                      int auto_increment
        primary key,
    greenhouse_id                 int         null,
    sensor_id                     int         null,
    plant_id                      int         null,
    sensor_status                 bit         null,
    measurement_name              varchar(60) null,
    measurement                   float       null,
    measurement_date              datetime    null,
    maintenance_date              date        null,
    remaining_days_to_maintenance int         null,
    life_expectancy               date        null,
    remaining_life                int         null,
    sensor_type                   bit         null
);

create table user_test
(
    user_id        varchar(36)  not null
        primary key,
    user_type      varchar(30)  null,
    name           varchar(20)  null,
    email          varchar(30)  null,
    password       varchar(120) null,
    phone_number   varchar(15)  null,
    address        varchar(50)  null,
    gender         varchar(10)  null,
    sub_newsletter bit          null,
    experience     varchar(5)   null,
    constraint user_email_uindex
        unique (email)
);

create table gh_test
(
    greenhouse_id   int auto_increment
        primary key,
    greenhouse_type varchar(155) null,
    user_id         varchar(36)  null,
    active          bit          not null,
    reoccurring     bit          not null,
    planting_date   date         null,
    constraint gh_test_user_test_user_id_fk
        foreign key (user_id) references user_test (user_id)
);

create table plant_table
(
    plant_id            int auto_increment
        primary key,
    plant_type          varchar(30) not null,
    plant_sensor_amount int         not null,
    planting_date       date        not null,
    greenhouse_id       int         null,
    active              bit         null,
    reoccurring         bit         null,
    constraint plant_table_gh_test_greenhouse_id_fk
        foreign key (greenhouse_id) references gh_test (greenhouse_id)
);

create table produce_table
(
    produce_id      int auto_increment
        primary key,
    greenhouse_id   int          null,
    produce_amount  int          not null,
    produce_type    varchar(120) not null,
    harvesting_date date         null,
    user_id         varchar(36)  null,
    planting_date   date         null,
    constraint produce_table_gh_test_greenhouse_id_fk
        foreign key (greenhouse_id) references gh_test (greenhouse_id),
    constraint produce_table_user_test_user_id_fk
        foreign key (user_id) references user_test (user_id)
);

create table sensor_table
(
    sensor_id     int auto_increment
        primary key,
    greenhouse_id int         not null,
    sensor_type   bit         null,
    model         varchar(50) null,
    user_id       varchar(36) null,
    constraint sensor_table_gh_test_greenhouse_id_fk
        foreign key (greenhouse_id) references gh_test (greenhouse_id),
    constraint sensor_table_user_test_user_id_fk
        foreign key (user_id) references user_test (user_id)
);

