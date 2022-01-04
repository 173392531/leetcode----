var quickSort = function (arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
};
const arr = [98, 42, 25, 54, 15, 3, 25, 72, 41, 10, 121];
console.log(quickSort(arr));  



var quickSort = (arr) =>{
    if(arr.length <=1)return arr
    var index = Math.floor(arr.length/2)
    var pivot = arr.splice(index,1)[0]
    var left = [],right = []
    for(let i=0;i<arr.length;i++){
        if(arr[i]<pivot){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([pivot],quickSort(right))
}