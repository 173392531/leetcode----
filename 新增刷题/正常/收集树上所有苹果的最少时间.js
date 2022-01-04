// node 收集树上所有苹果的最少时间.js

// 给你一棵有 n 个节点的无向树，节点编号为 0 到 n-1 ，它们中有一些节点有苹果。通过树上的一条边，需要花费 1 秒钟。
// 你从 节点 0 出发，请你返回最少需要多少秒，可以收集到所有苹果，并回到节点 0 。

// 无向树的边由 edges 给出，其中 edges[i] = [fromi, toi] ，表示有一条边连接 from 和 toi 。
// 除此以外，还有一个布尔数组 hasApple ，其中 hasApple[i] = true 代表节点 i 有一个苹果，否则，节点 i 没有苹果。

// 示例 1：

// 输入：n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,true,false,true,true,false]
// 输出：8
// 解释：上图展示了给定的树，其中红色节点表示有苹果。一个能收集到所有苹果的最优方案由绿色箭头表示。

// 链接：https://leetcode-cn.com/problems/minimum-time-to-collect-all-apples-in-a-tree
var minTime = function (n, edges, hasApple) {
  let cnt = 0;
  let i = n - 1,
    j = n - 2; //i指向hasApple，j指向edges
  while (i > 0) {
    if (hasApple[i] == true) {
      //找到一个true，在edge从后向前找其父，将hasApple[父]=true
      cnt++;
      while (edges[j][1] != i && j > -1) j--; //j指向当前苹果在edges做终点的元素
      let parent = edges[j][0];
      if (parent > 0 && !hasApple[parent]) {
        hasApple[parent] = true; //此时cnt不必计数，因为后面还会遇到，避免重复
      }
    }
    i--;
  }
  console.log({ hasApple });
  return cnt * 2;
};
console.log(
  minTime(
    7,
    [
      [0, 1],
      [0, 2],
      [1, 4],
      [1, 5],
      [2, 3],
      [2, 6],
    ],
    [false, false, true, false, true, true, false]
  )
);
//   console.log(minTime(4,
//     [[0,2],[0,3],[1,2]],
//     [false,true,false,false]));

//   作者：zi-zi-27
//   链接：https://leetcode-cn.com/problems/minimum-time-to-collect-all-apples-in-a-tree/solution/yi-ci-bian-li-by-zi-zi-27/
