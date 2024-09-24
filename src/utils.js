export const sort = (dominoes) => {
  const sortedDominoes = dominoes.sort((a,b)=>{
    const totalA = a[0] + a[1];
    const totalB = b[0] + b[1];
    if (totalA - totalB === 0) {
      return a[0] - b[0];
    }
    return totalA - totalB
  })
  return sortedDominoes;
};
export const sortDesc = (dominoes) =>{
  const sortedDominoes = dominoes.sort((a,b)=>{
    const totalA = a[0] + a[1];
    const totalB = b[0] + b[1];
    if (totalA - totalB === 0) {
      return b[0] - a[0];
    }
    return totalB - totalA
  })
  return sortedDominoes
}
export const flipDomino = (dominoes)=>{
  const flip = dominoes.map((domino) => [domino[1], domino[0]])
  return flip
}
export const removeDup = (dominoes) => {
  const result = [];

  for(let i = 0; i < dominoes.length; i++){
    const domino = dominoes[i];
    console.log(`domino : ${domino}`)
    const total = domino[0] + domino[1];
    let isDuplicate = false;

    for(let j = 0; j < result.length; j++){
      const nextDomino = result[j];
      console.log(`nextDomino : ${nextDomino}`)
      const nextTotal = nextDomino[0] + nextDomino[1];

      if(total === nextTotal){
        isDuplicate = true;
        break;
      }
    }
    if(!isDuplicate){
      result.push(domino);
    }
  }
  return result
}
export const removeDataByTotal = (dominoes, totalNumber) => {
  const result = dominoes.filter((domino)=>{
    const total = domino[0] + domino [1];
    return total !== totalNumber
  })
  return result
}
export const countDoubleNumber = (dominoes) => {
  const doubleNumber = dominoes.filter((num)=> num[0] === num[1])
  return doubleNumber.length;
};
