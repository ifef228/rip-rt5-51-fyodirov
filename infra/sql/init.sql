create table gas(
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR(32) not null,
	formula VARCHAR(16) not null,
	price_for_month decimal not null,
	detailed_description VARCHAR(512)
);

create table users(
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	password varchar(256),
	login varchar(256)
);

create table calc_order(
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INTEGER,
	price decimal,
	is_active bool default true,

	foreign key (user_id) references users(id)
);

create table gas_order(
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	gas_id INTEGER,
	calk_order_id INTEGER,
	concentration INTEGER not null check (concentration <= 100 and concentration >= 0),
	temperature INTEGER not null,

	foreign key (gas_id) references gas(id),
	foreign key (calk_order_id) references calc_order(id)
)
