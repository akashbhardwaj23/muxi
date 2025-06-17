
const lightModeColors = ["#a2d2ff", "#bde0fe", "#ffafcc", "#cdb4db"]

export const selectRandomColor = () => {
  const colorIndex = Math.floor(Math.random() * 4)
//   console.log("color Index", colorIndex)
  return lightModeColors[colorIndex]
}
