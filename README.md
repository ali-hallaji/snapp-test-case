# Snapp's Test case
This is a test case of DevOps role from the Snappmarket.
I share it here with my answer.

### Tests:
1- Create a simple node.js application for printing current timestamp and dockerize it
(Dockerfile + docker compose).

2- Use nginx for web server behind the application (Dockerfile + docker compose)

3- Create ha proxy config file with these criteria:
star:
  1. one listen block to passing mysql connections to the desired ip/port
  2. one frontend block to receive http requests on port 80
  3. one backend block with 2 servers
  4. use basic http authentication for accessing the backend
  5. Dockerize ha proxy

4- Create a pipeline with Gitlab CI to running, validating and reloading ha proxy config file
automatically when merging to develop branch.

5- It's a bash script test case that asked you to understand it to solve some issue on its.


### Answers
1-4: I solved them into the files' code. (you can find it into this repo). Also, because I didn't have enough time, I forced to summarize something(Sorry for that).

5: All Answers of bash script test case(two purposes):

1- Purpose of this code: We have printed all regular files listed in `/tmp` directory that modified greater than 24 hours ago and contains `*.dophin.temp` pattern(extension), then this list sent to `adddate()` function, afterward this function add date $time to this list and print it.

2- All files in the `/` directory that they are modified greater than 24 hours ago and they have `*.dophin.temp` pattern(extension) sent to xargs for print in echo.

3- Problems of the Test:
  1. "For loops" over "find output" are fragile, it's better to use "find -exec" or a "while read" loop.(line: 9)
  2. We must use double quote to prevent globbing(Security issue) and word splitting.(lines: 11, 12)
  3. It's better to use -print0/-0 or -exec + to allow for non-alphanumeric filenames.(line: 15)
  4. It's better to use find instead of ls to handle non-alphanumeric filenames.(line: 12)

4- Rewrite code(another way):
```
#!/bin/bash
adddate() {
  while read -r line
  do
      echo "$(date) $line"
  done
}

while read -r file
 do
 echo "$file"
 find "$file" -mindepth 1 -maxdepth 1 -printf '%f\n' | adddate >> /tmp/clean.log
 done < "$( find /tmp -type f -mtime +0 -name '*.dolphin.temp' )"

find / -print0/-0 -type f -mtime +0 -name '*.dolphin.temp' | xargs echo
exit 0
```