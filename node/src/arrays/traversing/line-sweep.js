// Given a list of time intervals, find if any of them overlap. Each interval has a start time and a stop time.
// For example,Intervals -> ​[5,7], [1,3], [6,9]​ -> Intervals ​[5,7]​ and ​[6,9]​ overlap, 
// so we return true

class Point {
  constructor(time, isStart){
    this.time = time;
    this.isStart = isStart;
  }

  getTime(){
    return this.time;
  }

  getIsStart(){
    return this.isStart;
  }
}

function hasOverlap(intervals){
  const points = [];
  intervals.foreach(([start, end]) => {
    points.push(new Point(start, true));
    points.push(new Point(end, false));
  });

  //sort intervals

  let count = 0;
  for (let index = 0; index < points.length - 1; index++) {
    if(points[index.start] == true) {
      count++;
    } else {
      count--;
    }

    if(count > 1){
      return true;
    }
  }

  return false;
}