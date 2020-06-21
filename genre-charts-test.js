
  fetch(`https://api.music.apple.com/v1/catalog/us/genres`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + appleDeveloperToken
    }
  })
    .then(response => response.json())
    .then(data => console.log(data))
