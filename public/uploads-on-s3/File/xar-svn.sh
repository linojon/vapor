#!/bin/sh
#
# Distributed in the Public Domain by Jonathan Linowes, 
# derived from rails-svn.sh by Francois Beausoleil.
# This script might destroy twenty years worth of work, and I cannot be held
# responsible.  You are your own master.  Read this file in detail before
# you use it.
#
# NO IMPLIED WARRANTY.
#
# Usage:
# xar-svn.sh PROJECT 
#
# Creates a Subversion repository in REPOS_ROOT/PROJECT.  
# Checks in PROJECT (a subdirectory of current) and one THEME.
# You'll need to add other files and themes manually.
#
# REPOS_ROOT defaults to ~/svn.

PROJECT=$1
VERSION=$2
rm -f tmp.ignore

if [ -z $PROJECT ]; then
  echo "Usage: $0 PROJECT [VERSION]"
  exit 1
fi

if [ -z $REPOS_ROOT ]; then
  REPOS_ROOT=$HOME/svn
fi

if [ -d $PROJECT ]; then
  echo "Setup repository for $PROJECT"
else
  echo "Project doesnt exist"
  exit 1
fi

if [ -d $REPOS_ROOT/$PROJECT ]; then
  echo "The repository already exists - this script will not overwrite the repository at '$REPOS_ROOT/$PROJECT'"
  # you can let it continue and update the repos by commenting out the next line, doenst cause damage (for me)
#  exit 1
else
  echo "Creating new repository '$REPOS_ROOT'"

  mkdir $REPOS_ROOT 2>/dev/null
  svnadmin create --fs-type=fsfs $REPOS_ROOT/$PROJECT
  REPOS=file://$REPOS_ROOT/$PROJECT

  svn mkdir --message="Initial project layout" $REPOS/trunk $REPOS/tags $REPOS/branches
fi

cd $PROJECT
svn checkout $REPOS/trunk .

# initially add everything
svn add --force .

# revert and ignore stuff we know we wont keep
svn revert .htaccess
svn revert favicon.ico
svn revert -R var/*
svn add var/config.system.php 
echo ".htaccess" >>tmp.ignore
echo "favicon.ico" >>tmp.ignore
svn propset svn:ignore "*" var

# (optionally) revert and ignore xaraya code itself
svn revert *.php
svn revert -R includes
svn revert -R xaradodb
svn revert -R modules/*
svn revert -R themes/Xaraya_Classic
echo "*.php" >>tmp.ignore
echo "includes" >>tmp.ignore
echo "xaradodb" >>tmp.ignore

# keep only the themes and templates we want
svn add --force var/messaging
# use following line if you reverted themes/* above
#svn add themes/$THEME

# keep custom code
#svn add --force modules/xarpages
#svn revert -R modules/xarpages/*
#svn add --force modules/xarpages/xarfuncapi
#svn add --force modules/xarpages/xarcustomapi
#svn add --force modules/xarpages/xarencodeapi
#svn add --force modules/xarpages/xardecodeapi

# other content directories not for repos
svn revert -R files
svn revert -R sql

# set the trunk ignores
svn propset svn:ignore -F tmp.ignore .
rm tmp.ignore

# commit it
svn commit --message="Initial add"

if [ $VERSION ]; then
svn propset xaraya $VERSION .
fi
# to get:  svn propget xaraya
