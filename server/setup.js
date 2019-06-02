var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'example',
  database: 'bravado'
})

connection.connect()
connection.query(
  `
CREATE TABLE IF NOT EXISTS user (
    userId int NOT NULL AUTO_INCREMENT UNIQUE,
    role varchar(255) NOT NULL DEFAULT "user",
    name varchar(255) NOT NULL,
    surname varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    age int NOT NULL,
    gender varchar(255) NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY (userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`,
  function(error, results, fields) {
    if (error) throw error
    console.log('user ✔ ')
  }
)
connection.query(
  `
CREATE TABLE IF NOT EXISTS category (
    name varchar(255) NOT NULL UNIQUE,
    creationDate date NOT NULL,
    content varchar(255) NOT NULL,
    CONSTRAINT category_pk PRIMARY KEY (name)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
`,
  function(error, results, fields) {
    if (error) throw error
    console.log('category ✔ ')
  }
)
connection.query(
  `
CREATE TABLE IF NOT EXISTS challenge (
    challengeId int NOT NULL UNIQUE AUTO_INCREMENT,
    owner int NOT NULL,
    title varchar(255) NOT NULL,
    content varchar(255) NOT NULL,
    startDate date NOT NULL,
    finishDate date NOT NULL,
    reward json NOT NULL,
    goal int NOT NULL,
    CONSTRAINT challenge_pk PRIMARY KEY (challengeId),
    CONSTRAINT challenge_user FOREIGN KEY challenge_user (owner)
    REFERENCES user (userId)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
`,
  function(error, results, fields) {
    if (error) throw error
    console.log('challenge ✔ ')
  }
)
connection.query(
  `
CREATE TABLE IF NOT EXISTS challengecategory (
    challengeId int NOT NULL AUTO_INCREMENT UNIQUE,
    categoryName varchar(255) NOT NULL,
    CONSTRAINT category_challengecategory FOREIGN KEY category_challengecategory (categoryName)
    REFERENCES category (name),
    CONSTRAINT challenge_challengecategory FOREIGN KEY challenge_challengecategory (challengeId)
    REFERENCES challenge (challengeId)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
`,
  function(error, results, fields) {
    if (error) throw error
    console.log('challengecategory ✔ ')
  }
)
connection.query(
  `
CREATE TABLE IF NOT EXISTS comment (
    commentId int NOT NULL AUTO_INCREMENT UNIQUE,
    authorId int NOT NULL,
    relationId int NOT NULL,
    relationTableName varchar(255) NOT NULL,
    body varchar(255) NOT NULL,
    CONSTRAINT comment_pk PRIMARY KEY (commentId),
    CONSTRAINT comment_challenge FOREIGN KEY comment_challenge (relationId)
    REFERENCES challenge (challengeId),
    CONSTRAINT comment_comment FOREIGN KEY comment_comment (relationId)
    REFERENCES comment (commentId),
    CONSTRAINT user_comment FOREIGN KEY user_comment (authorId)
    REFERENCES user (userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`,
  function(error, results, fields) {
    if (error) throw error
    console.log('comment ✔ ')
  }
)
connection.query(
  `
CREATE TABLE IF NOT EXISTS progress (
    progressId int NOT NULL AUTO_INCREMENT UNIQUE,
    challengeId int NOT NULL,
    userId int NOT NULL,
    date date NOT NULL,
    status varchar(255) NOT NULL,
    CONSTRAINT progress_pk PRIMARY KEY (progressId),
    CONSTRAINT progress_challenge FOREIGN KEY progress_challenge (challengeId)
    REFERENCES challenge (challengeId),
    CONSTRAINT user_progress FOREIGN KEY user_progress (userId)
    REFERENCES user (userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`,
  function(error, results, fields) {
    if (error) throw error
    console.log('progress ✔ ')
  }
)
connection.query(
  `
CREATE TABLE IF NOT EXISTS submission (
    submissionId int NOT NULL AUTO_INCREMENT UNIQUE,
    progressId int NOT NULL,
    content varchar(255) NOT NULL,
    CONSTRAINT submission_pk PRIMARY KEY (submissionId),
    CONSTRAINT submission_progress FOREIGN KEY submission_progress (progressId) REFERENCES progress (progressId)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
`,
  function(error, results, fields) {
    if (error) throw error
    console.log('submission ✔ ')
  }
)
connection.query(
  `
CREATE TABLE IF NOT EXISTS rating (
    approvedByUserId int NOT NULL,
    submissionId int NOT NULL,
    rate int NOT NULL,
    CONSTRAINT rating_submission FOREIGN KEY rating_submission (submissionId)
    REFERENCES submission (submissionId),
    CONSTRAINT user_rating FOREIGN KEY user_rating (approvedByUserId)
    REFERENCES user (userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`,
  function(error, results, fields) {
    if (error) throw error
    console.log('rating ✔ ')
  }
)

connection.end()
