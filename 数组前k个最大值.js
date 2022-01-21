// 输入整型数组和K，返回数组中出现频次最高的前K个元素
// 例如输入[1,2,3,1,3,1] K=2 返回 [1,3]
// [1,1,2,2,3,3] K=2
const getKArr = (arr,K)=>{
    const map = {}
    const res = []
    for(let item of arr){
        map[item] = (map[item] | 0)+1
    }
    console.log('!map',map);
    
    for(let item in map){
        res.push(map[item])
    }
    const arrRes = []
    const valArr= res.sort((a,b)=>b-a).splice(0,K)
    for(let item in map){
        if(valArr.includes(map[item])){
            arrRes.push(Number(item))
        }
    }
    return arrRes
}
console.log(getKArr([1,2,3,1,3,1],2));
console.log(getKArr([1,1,2,2,3,3],2));

