/*
    1)  a, b = []
    2)  m = (somma di tutti i value / 2)
    3)  k = lunghezza list / 2
    4)  per i da 0 a k
    5)      se i è pari
    6)          aSum = somma dei value di a
    7)          accettableMaxes = {x app. list: x + aSum <= m}
    8)          max = max di accettableMaxes
    9)          aggiungi max ad a
    10)         rimuovi max da list
    11)     altrimenti
    12)         min = min di list
    13)         aggiungi min ad a
    14)         rimuovi min da list
    15) b = list
    16) return a, b
*/
export default function balanceTeams(list) {
    let a = [], b = []
    const m = list.map(item => item.value).reduce((prev, curr) => prev + curr, 0)
    const k = list.length / 2
    for(let i = 0; i < k; i=i+1){
      if(i%2 === 0){
        let aSum = a.map(item => item.value).reduce((prev, curr) => prev + curr, 0)
        let accettableMaxes = list.filter(x => x.value + aSum <= m)
        let max = list.filter(x => x.value == Math.max(...accettableMaxes.map(item => item.value)))[0]
        a.push(max)
        list = list.filter(item => item.name !== max.name)       
      } else {
          let min = list.filter(x => x.value === Math.min(...list.map(item => item.value)))[0]
          a.push(min)
          list = list.filter(item => item.name !== min.name)
      }
    }
    b = list
    return [a, b]
  }