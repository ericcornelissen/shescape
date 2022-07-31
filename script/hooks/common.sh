#!/bin/sh

get_stash_count () {
  readonly count="$(git rev-list --walk-reflogs --count refs/stash 2> /dev/null)"
  if [ "$count" = "" ]; then
    echo "0"
  else
    echo "$count"
  fi
}

STASH_COUNT_BEFORE="$(get_stash_count)"
DID_STASH () {
  readonly STASH_COUNT_AFTER="$(get_stash_count)"
  if [ "$STASH_COUNT_BEFORE" != "$STASH_COUNT_AFTER" ]; then
    echo "x"  # true
  else
    echo ""  # false
  fi
}

IS_MERGING () {
  if [ -f "$(git rev-parse --git-dir)/MERGE_HEAD" ]; then
    echo "x"  # true
  else
    echo ""  # false
  fi
}
