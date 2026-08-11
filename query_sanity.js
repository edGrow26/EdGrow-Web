const { createClient } = require('@sanity/client')
const client = createClient({
  projectId: "gzgpw4vv",
  dataset: "production",
  useCdn: false,
  apiVersion: '2024-01-01'
})
client.fetch('*[_type == "project"]{title, projectLink}').then(res => console.log(JSON.stringify(res, null, 2)))
