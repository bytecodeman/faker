import fs from "fs";
import { faker } from "@faker-js/faker";

const names = {};
for (let i = 0; i < 1000000; i++) {
  const fn = faker.name.firstName();
  const em = faker.internet.email();
  names[fn] = em;
}

const edb = fs.createWriteStream("emaildatabase.txt");
edb.on("finish", () => console.log("Emails Done"));

const keys = Object.keys(names);
keys.forEach((key, index) => {
  const line = `${key},${key}_${names[key]}\n`;
  edb.write(line);
});
edb.end();

const query = fs.createWriteStream("emailqueries.txt");
query.on("finish", () => console.log("Query Done"));

for (let i = 0; i < 100000; i++) {
  if (Math.random() >= 0.3) {
    const key = keys[Math.floor(Math.random() * keys.length)];
    query.write(key + "\n");
  } else {
    const fn = faker.random.alpha(Math.floor(Math.random() * 6) + 3);
    query.write(fn + "\n");
  }
}
query.end();
