#!/bin/sh

IS_MERGING=""  # false
if [ -f "$(git rev-parse --git-dir)/MERGE_HEAD" ]
then
  IS_MERGING="x"  # true
fi

get_stash_count () {
  local count=$(git rev-list --walk-reflogs --count refs/stash 2> /dev/null)
  if [ "$count" = "" ]
  then
    echo "0"
  else
    echo $count
  fi
}
