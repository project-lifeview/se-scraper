#!/bin/bash
total=0
for n in {1..100};  
  do
    start=`date +%s`; 
    node run.js
    end=`date +%s`
    echo $((end-start))
    this=$((end-start))
    total=$((total+this))
done
echo $total
