interface User {
  name: string,
  mail: string,
  hash: string,
}

interface Entry {
  id: string,
  title: string,
  author: string,
  updated: Date,
  tags: Tag[],
  content: string,
}

interface Tag {
  id: string,
  title: string,
}