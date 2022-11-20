import request from 'superagent'

function randInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}

export function fetchRandomPlayer(fromRankings = true) {
  if (fromRankings) {
    let isWta = Math.random() < 0.5
    return fetchRankings(isWta).then((rankedPlayers) => {
      var playerRank = randInt(1, Math.min(rankedPlayers.rankings.length, 500))
      // The API is a bit funny here- for some reason the player id appears under `.team.id`, and
      // not`.id` (which is some kind of ranking id)
      return rankedPlayers.rankings[playerRank].team.id
    })
  } else {
    // Player ids seem to be "gappy"- a lot of player ids return an empty payload :(
    let playerId
    playerId = randInt(1000, 1500)
    return request
      .get(`/api/v1/tennis/id/${playerId}`)
      .then((res) => res.body.id)
  }
}

export function fetchRankings(wta = false) {
  var tour = wta ? 'wta' : 'atp'
  console.log(`/api/v1/tennis/rankings/${tour}`)
  return request.get(`/api/v1/tennis/rankings/${tour}`).then((res) => res.body)
}

export function fetchTennisPlayer(playername) {
  if (playername === '') {
    return fetchRandomPlayer()
  }
  console.log(`/api/v1/tennis/${playername}`)
  return request
    .get(`/api/v1/tennis/${playername}`)
    .then((res) => res.body.results[0].entity.id)
}

export function fetchTennisImage(id) {
  return request.get(`/api/v1/tennis/image/${id}`).then((res) => {
    const image = 'data:image/jpeg;base64, ' + res.body
    return image
  })
}

export async function fetchTennisImageByPlayer(playerName) {
  const playerIdResponse = await request.get(`/api/v1/tennis/${playerName}`)
  const firstPlayerId = playerIdResponse.body.results[0].entity.id
  const imageResponse = await request.get(
    `/api/v1/tennis/image/${firstPlayerId}`
  )
  const image = `data:image/jpeg;base64, ${imageResponse.body}`
  return image
}

// export function fetchTennisPlayer(playername) {
//   return request
//       .get(`/api/v1/tennis/${playername}`)
//       .then(res => res.body)
// }
