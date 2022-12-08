/*
m = (somma di tutti i value / 2)
k = lunghezza playersList / 2
combinations = tutte le combinazioni di di k = floor(n/2) elementi su una playersLista di n elementi
per ogni combinazione
  s = somma dei valori dei singoli giocatori
  d = |m - s|
ordino le combinations secondo d in ordine crescente
mi prendo solo i primi n risultati
*/

const teamValue = team => team.reduce((sum, player) => sum + player.value, 0)

const otherTeam = (team, playersList) => {
  const teamPlayersNames = new Set(team.map(p => p.name))
  const otherTeam = playersList.filter(p => !teamPlayersNames.has(p.name))
  return otherTeam
}

const formatTeam = team => {
  return {
    players: team,
    value: teamValue(team)
  }
}

export default function balanceTeamsSuggestions(playersList, nOfResults) {
  const m = playersList.reduce((sum, player) => sum + player.value, 0) / 2
  const k = Math.floor(playersList.length / 2)
  let possibleTeams = _.combinations(playersList, k)
  possibleTeams.forEach(team => {
    team.value = teamValue(team)
    team.delta = Math.abs(team.value - m)
  });
  possibleTeams = _.orderBy(possibleTeams, "delta").slice(0, nOfResults)
  const teamCouples = possibleTeams.map(team => [formatTeam(team), formatTeam(otherTeam(team, playersList))])
  return teamCouples
}