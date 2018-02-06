CREATE TABLE [IF NOT EXISTS] bill(
    billLogId INTEGER PRIMARY KEY NOT NULL,
    billNumber REAL NOT NULL,
    billDate INTEGER NOT NULL,
    billType TEXT,
    billCategory1 TEXT,
    billCategory2 TEXT,
    billPaymentType TEXT,
    billBy TEXT,
    billFor TEXT,
    billDescription TEXT
)[WITHOUT ROWID];
CREATE TABLE [IF NOT EXISTS] billtype (
	id INTEGER PRIMARY KEY NOT NULL,
	name TEXT NOT NULL
);
CREATE TABLE [IF NOT EXISTS] billcategory1 (
	id INTEGER PRIMARY KEY NOT NULL,
	categorytype TEXT NOT NULL, 
	name TEXT NOT NULL
);
CREATE TABLE [IF NOT EXISTS] billcategory2 (
	id INTEGER PRIMARY KEY NOT NULL,
	parentcategorytype TEXT NOT NULL,
	name TEXT NOT NULL
);
CREATE TABLE [IF NOT EXISTS] billpaymenttype (
	id INTEGER PRIMARY KEY NOT NULL,
	name TEXT NOT NULL
);
CREATE TABLE [IF NOT EXISTS] billpayby (
	id INTEGER PRIMARY KEY NOT NULL,
	name TEXT NOT NULL
);
CREATE TABLE [IF NOT EXISTS] billfor (
	id INTEGER PRIMARY KEY NOT NULL,
	name TEXT NOT NULL
);
INSERT INTO billtype (name)
VALUES
 ("消费"),
 ("收入");
INSERT INTO billpaymenttype (name)
VALUES
 ("现金"),
 ("信用卡"),
 ("花呗"),
 ("其他");
INSERT INTO billpayby (name)
VALUES
	("老婆"),
	("老公");
INSERT INTO billfor (name)
VALUES
	("家庭"),
	("老公"),
	("老婆"),
	("孩子"),
	("老公家人"),
	("老婆家人");
INSERT INTO billcategory1 (categorytype,name)
VALUES
	("a","衣"),
	("b","食"),
	("c","住"),
	("d","行"),
	("e","用"),
	("f","娱乐"),
	("g","医疗保健"),
	("h","人情"),	
	("i","保险");
INSERT INTO billcategory2 (parentcategorytype,name)
VALUES
	("a","衣物"),
	("a","鞋子"),
	("a","配饰"),
	("a","包包"),
	("b","食品"),
	("b","厨房用品"),
	("c","房贷"),
	("c","房租"),
	("c","物业"),
	("c","车位"),
	("c","装修"),
	("c","水电煤"),
	("c","网络宽带"),
	("d","交通卡"),
	("d","火车"),
	("d","出租车"),
	("d","飞机"),
	("d","租车"),
	("e","通讯"),
	("e","床品"),
	("e","洗护"),
	("e","文具"),
	("e","书籍"),
	("e","电子产品"),
	("e","软件"),
	("e","快递"),
	("f","电影"),
	("f","唱歌"),
	("g","医疗自费"),
	("g","药店买药"),
	("g","运动健身"),
	("g","保健护理"),
	("g","体检"),
	("h","红包"),
	("h","礼物"),
	("h","请吃饭");