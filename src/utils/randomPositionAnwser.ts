export const randomPositionAnwser = (type: string) => {
  const index = type === 'boolean' ? 2 : 4;
  return Math.floor(Math.random() * index)
}