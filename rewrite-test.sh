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